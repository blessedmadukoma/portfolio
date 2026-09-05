/**
 * Fetches published blog posts and opted-in research notes from Obsidian via the
 * GitLab Repository API (no full git clone). Run before `nuxt dev` / `nuxt build`.
 */

import { mkdir, writeFile, rm, readFile, readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "content", "blog");

// ── env ──────────────────────────────────────────────────────────────────────
// Use process.env (Vercel / CI) first, fall back to .env file for local dev
async function loadEnv() {
  try {
    const raw = await readFile(join(ROOT, ".env"), "utf8");
    for (const line of raw.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq).trim();
      const val = trimmed.slice(eq + 1).trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    // no .env file — rely purely on process.env (CI/CD)
  }
}

await loadEnv();

const TOKEN = process.env.GITLAB_TOKEN ?? "";
const PROJECT_ID = process.env.GITLAB_PROJECT_ID ?? "";
const BRANCH = "main";
const BLOG_SOURCE_PATH = "Blogs - Published";
const RESEARCH_SOURCE_PATH = "Research";
const GITLAB_API = `https://gitlab.com/api/v4/projects/${PROJECT_ID}/repository`;

if (!TOKEN || !PROJECT_ID) {
  console.error("❌  GITLAB_TOKEN and GITLAB_PROJECT_ID must be set");
  process.exit(1);
}

// ── GitLab API helpers ────────────────────────────────────────────────────────
const HEADERS = {
  "PRIVATE-TOKEN": TOKEN,
  "User-Agent": "nuxt-blog-sync",
};

const IMAGE_EXT = /\.(png|jpe?g|gif|webp|svg|bmp|tiff?)$/i;

async function listDirectory(path) {
  const items = [];
  let page = "1";
  while (page) {
    const url = `${GITLAB_API}/tree?path=${encodeURIComponent(path)}&ref=${BRANCH}&per_page=100&page=${page}`;
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) {
      throw new Error(`GitLab API ${res.status} for "${path}"`);
    }
    items.push(...await res.json());
    page = res.headers.get("X-Next-Page");
  }
  return items;
}

async function listMarkdownFiles(path = BLOG_SOURCE_PATH) {
  const items = await listDirectory(path);
  const nested = await Promise.all(
    items
      .filter((item) => item.type === "tree")
      .map((item) => listMarkdownFiles(item.path)),
  );

  return [
    ...items.filter((item) => item.type === "blob" && item.name.endsWith(".md")),
    ...nested.flat(),
  ];
}

async function listLocalMarkdownFiles(path = OUT_DIR, prefix = "") {
  const entries = await readdir(path, { withFileTypes: true }).catch(() => []);
  const nested = await Promise.all(
    entries
      .filter((entry) => entry.isDirectory())
      .map((entry) => listLocalMarkdownFiles(join(path, entry.name), join(prefix, entry.name))),
  );

  return [
    ...entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".md"))
      .map((entry) => join(prefix, entry.name)),
    ...nested.flat(),
  ];
}

async function getRawFile(path) {
  const encodedPath = encodeURIComponent(path);
  const url = `${GITLAB_API}/files/${encodedPath}/raw?ref=${BRANCH}`;
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitLab API ${res.status} for "${path}": ${body}`);
  }
  return res.text();
}

// Build a filename → full repo path index from the git tree.
// Obsidian wiki-links store only the bare filename; the tree API lets us
// resolve "cover.png" → "Blogs - Published/images/obsidian-blog/cover.png".
async function buildImageIndex() {
  const index = new Map();
  const prefix = `${BLOG_SOURCE_PATH}/images/`;
  let page = 1;

  while (true) {
    const url = `${GITLAB_API}/tree?recursive=true&ref=${BRANCH}&per_page=100&page=${page}`;
    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) {
      console.warn("⚠️  Could not fetch git tree — bare image filenames may not resolve correctly");
      return index;
    }
    const items = await res.json();
    for (const item of items) {
      if (item.type === "blob" && item.path.startsWith(prefix) && IMAGE_EXT.test(item.path)) {
        const filename = item.path.split("/").pop();
        if (!index.has(filename)) index.set(filename, item.path);
      }
    }
    const nextPage = res.headers.get("X-Next-Page");
    if (!nextPage) break;
    page = parseInt(nextPage, 10);
  }

  return index;
}

/**
 * Obsidian uses ![[filename.png|width]] for image embeds — standard remark
 * doesn't understand this and mangles surrounding content. Convert to plain
 * markdown before Nuxt Content indexes the file.
 *
 *   ![[image.png]]          → ![](image.png)
 *   ![[image.png|527]]      → ![](image.png)
 *   ![[image.png|alt|527]]  → ![alt](image.png)
 */

// Estimate reading time (minutes) from the post body (post-frontmatter text).
// Strips code blocks, images, and markdown syntax before counting words at 200 wpm.
function estimateReadingTime(body) {
  const text = body
    .replace(/```[\s\S]*?```/g, "")
    .replace(/`[^`]+`/g, "")
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/[#*_>~|[\]]/g, "")
    .trim();
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

// Inject a key: value line into the frontmatter block before the closing ---.
function injectReadingTime(markdown) {
  if (!markdown.startsWith("---")) return markdown;
  const closeIdx = markdown.indexOf("\n---", 3);
  if (closeIdx === -1) return markdown;
  const frontmatter = markdown.slice(0, closeIdx);
  if (/^readingTime\s*:/m.test(frontmatter)) return markdown;
  const minutes = estimateReadingTime(markdown.slice(closeIdx + 4));
  return `${frontmatter}\nreadingTime: ${minutes}${markdown.slice(closeIdx)}`;
}

// Step 1: convert Obsidian ![[file.png|width]] embeds to standard markdown
function transformObsidianImages(markdown) {
  return markdown.replace(/!\[\[([^\]|]+?)(?:\|([^\]|]*))?(?:\|[^\]]*)?\]\]/g, (match, file, maybeAlt) => {
    const filename = file.trim();
    if (!IMAGE_EXT.test(filename)) {
      // Page/note embed — not renderable on web, drop silently
      return "";
    }
    const alt = maybeAlt && !/^\d+$/.test(maybeAlt.trim()) ? maybeAlt.trim() : "";
    return `![${alt}](${filename})`;
  });
}

// Step 2: rewrite relative image paths to absolute proxy URLs.
// Uses imageIndex (filename → full repo path) to resolve bare Obsidian filenames
// to their actual subfolder location under SOURCE_PATH/images/.
function rewriteImageUrls(markdown, imageIndex) {
  return markdown.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
    if (/^(https?:)?\/\//.test(src) || src.startsWith("/")) return match;
    const clean = src.replace(/^\.\//, "");

    let fullPath;
    if (!clean.includes("/")) {
      // Bare filename — resolve via the git tree index
      fullPath = imageIndex.get(clean) ?? `${BLOG_SOURCE_PATH}/images/${clean}`;
    } else if (clean.startsWith(`${BLOG_SOURCE_PATH}/`)) {
      // Obsidian sometimes emits the full vault-relative path — already correct
      fullPath = clean;
    } else {
      // Has a subfolder — root under SOURCE_PATH/images/ if not already there
      fullPath = clean.startsWith("images/")
        ? `${BLOG_SOURCE_PATH}/${clean}`
        : `${BLOG_SOURCE_PATH}/images/${clean}`;
    }

    return `![${alt}](/api/blog-image?path=${encodeURIComponent(fullPath)})`;
  });
}

function frontmatter(raw) {
  const match = raw.trimStart().match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  return match ? parse(match[1]) ?? {} : {};
}

function isPublished(metadata) {
  return metadata.draft !== true && metadata.status !== "draft" && metadata.status !== "archived";
}

function renderMarkdown(raw, imageIndex) {
  return injectReadingTime(
    rewriteImageUrls(transformObsidianImages(raw.trimStart()), imageIndex),
  );
}

// ── sync ─────────────────────────────────────────────────────────────────────
function outputPathFor(gitlabPath) {
  if (gitlabPath.startsWith(`${BLOG_SOURCE_PATH}/`)) {
    return gitlabPath.slice(`${BLOG_SOURCE_PATH}/`.length);
  }
  return join("research", gitlabPath.slice(`${RESEARCH_SOURCE_PATH}/`.length));
}

async function syncBlog() {
  console.log("🔄  Syncing blog posts from GitLab Repository API…");

  const [publishedFiles, researchFiles, imageIndex] = await Promise.all([
    listMarkdownFiles(),
    listMarkdownFiles(RESEARCH_SOURCE_PATH),
    buildImageIndex(),
  ]);

  console.log(`  📷  Indexed ${imageIndex.size} image(s)`);

  // Read and select everything before changing the local cache.
  const renderedFiles = [];
  const candidates = [...publishedFiles, ...researchFiles];
  // Limit concurrent reads to avoid overwhelming the repository API.
  for (let offset = 0; offset < candidates.length; offset += 8) {
    const batch = await Promise.all(
      candidates.slice(offset, offset + 8).map(async (item) => {
        const raw = await getRawFile(item.path);
        const metadata = frontmatter(raw);
        const isResearch = item.path.startsWith(`${RESEARCH_SOURCE_PATH}/`);
        if (!isPublished(metadata)) return null;
        if (isResearch && (metadata.portfolio !== true || metadata.draft !== false)) return null;
        return {
          relativePath: outputPathFor(item.path),
          content: renderMarkdown(raw, imageIndex),
        };
      }),
    );
    renderedFiles.push(...batch.filter(Boolean));
  }
  const remoteNames = new Set(renderedFiles.map((item) => item.relativePath));
  if (remoteNames.size !== renderedFiles.length) {
    throw new Error("Multiple source notes resolve to the same output path");
  }
  await mkdir(OUT_DIR, { recursive: true });
  const existingNames = await listLocalMarkdownFiles();

  await Promise.all(
    renderedFiles.map(async ({ relativePath, content }) => {
      const localPath = join(OUT_DIR, relativePath);
      const current = await readFile(localPath, "utf8").catch(() => null);
      if (current === content) {
        console.log(`  =  ${relativePath}`);
        return;
      }
      await mkdir(dirname(localPath), { recursive: true });
      await writeFile(localPath, content, "utf8");
      console.log(`  ✓  ${relativePath}`);
    })
  );

  const staleNames = existingNames.filter((name) => !remoteNames.has(name));
  await Promise.all(
    staleNames.map(async (relativePath) => {
      await rm(join(OUT_DIR, relativePath), { force: true });
      console.log(`  −  ${relativePath}`);
    }),
  );

  console.log(`✅  Synced ${renderedFiles.length} blog post(s) to content/blog/`);
}

try {
  await syncBlog();
} catch (error) {
  const cachedFiles = await listLocalMarkdownFiles();
  const message = error instanceof Error ? error.message : String(error);
  console.warn(`⚠️  Blog sync failed: ${message}`);
  console.warn(
    `   Starting with ${cachedFiles.length} cached blog post(s). Run \`yarn sync\` later to retry.`,
  );
}
