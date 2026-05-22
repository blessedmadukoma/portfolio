/**
 * Fetches only the blog posts from the private Obsidian vault via the
 * GitHub Contents API (no full git clone). Run before `nuxt dev` / `nuxt build`.
 */

import { mkdir, writeFile, rm, readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

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

const REPO_URL = process.env.OBSIDIAN_VAULT_REPO_URL ?? "";
const patMatch = REPO_URL.match(/https?:\/\/([^@]+)@/);
const TOKEN = patMatch?.[1] ?? "";
const OWNER = "blessedmadukoma";
const REPO = "obsidian-vault";
const BRANCH = "main";
const SOURCE_PATH = "Blogs - Published";

if (!TOKEN) {
  console.error("❌  No GitHub token found in OBSIDIAN_VAULT_REPO_URL");
  process.exit(1);
}

// ── GitHub API helpers ────────────────────────────────────────────────────────
const HEADERS = {
  Authorization: `Bearer ${TOKEN}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "nuxt-blog-sync",
};

function encodePath(p) {
  return p.split("/").map(encodeURIComponent).join("/");
}

async function githubRequest(path) {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/contents/${encodePath(path)}?ref=${BRANCH}`;
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitHub API ${res.status} for "${path}": ${body}`);
  }
  return res.json();
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
const IMAGE_EXT = /\.(png|jpe?g|gif|webp|svg|bmp|tiff?)$/i;

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
  const minutes = estimateReadingTime(markdown.slice(closeIdx + 4));
  return `${markdown.slice(0, closeIdx)}\nreadingTime: ${minutes}${markdown.slice(closeIdx)}`;
}

// Build a filename → full repo path index from the git tree.
// Obsidian wiki-links store only the bare filename; the tree API lets us
// resolve "cover.png" → "Blogs - Published/images/obsidian-blog/cover.png".
async function buildImageIndex() {
  const url = `https://api.github.com/repos/${OWNER}/${REPO}/git/trees/${BRANCH}?recursive=1`;
  const res = await fetch(url, { headers: HEADERS });
  if (!res.ok) {
    console.warn("⚠️  Could not fetch git tree — bare image filenames may not resolve correctly");
    return new Map();
  }
  const { tree } = await res.json();
  const index = new Map();
  const prefix = `${SOURCE_PATH}/images/`;
  for (const item of tree) {
    if (item.type === "blob" && item.path.startsWith(prefix) && IMAGE_EXT.test(item.path)) {
      const filename = item.path.split("/").pop();
      if (!index.has(filename)) index.set(filename, item.path); // first match wins
    }
  }
  return index;
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
      fullPath = imageIndex.get(clean) ?? `${SOURCE_PATH}/images/${clean}`;
    } else {
      // Has a subfolder — root under SOURCE_PATH/images/ if not already there
      fullPath = clean.startsWith("images/")
        ? `${SOURCE_PATH}/${clean}`
        : `${SOURCE_PATH}/images/${clean}`;
    }

    return `![${alt}](/api/blog-image?path=${encodeURIComponent(fullPath)})`;
  });
}

async function downloadMarkdown(githubPath, localPath, imageIndex) {
  const meta = await githubRequest(githubPath);

  let raw;
  if (meta.size > 1_000_000) {
    const r = await fetch(meta.download_url, { headers: { Authorization: `Bearer ${TOKEN}` } });
    if (!r.ok) throw new Error(`Failed to download ${githubPath}`);
    raw = await r.text();
  } else {
    raw = Buffer.from(meta.content.replace(/\n/g, ""), "base64").toString("utf8");
  }

  const transformed = injectReadingTime(rewriteImageUrls(transformObsidianImages(raw.trimStart()), imageIndex));
  await mkdir(dirname(localPath), { recursive: true });
  await writeFile(localPath, transformed, "utf8");
}

// ── sync ─────────────────────────────────────────────────────────────────────
console.log("🔄  Syncing blog posts from GitHub Contents API…");

const [items, imageIndex] = await Promise.all([
  githubRequest(SOURCE_PATH),
  buildImageIndex(),
]);

if (!Array.isArray(items)) {
  console.error("❌  Expected a directory listing from GitHub, got a single file.");
  process.exit(1);
}

console.log(`  📷  Indexed ${imageIndex.size} image(s)`);

await rm(OUT_DIR, { recursive: true, force: true });
await mkdir(OUT_DIR, { recursive: true });

const mdFiles = items.filter((i) => i.type === "file" && i.name.endsWith(".md"));

await Promise.all(
  mdFiles.map(async (item) => {
    const localPath = join(OUT_DIR, item.name);
    await downloadMarkdown(item.path, localPath, imageIndex);
    console.log(`  ✓  ${item.name}`);
  })
);

console.log(`✅  Synced ${mdFiles.length} blog post(s) to content/blog/`);
