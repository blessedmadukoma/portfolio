/**
 * Fetches the Obsidian notes marked `portfolio: true` and `draft: false`, from
 * any folder of the vault, through the GitLab API (no full git clone). Writes
 * each one to content/blog/<slug>.md and writes the list of images they use
 * for the image route. Run before `nuxt dev` / `nuxt build`.
 */

import { mkdir, writeFile, rm, readFile, readdir } from "node:fs/promises";
import { join, dirname, posix } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "content", "blog");
// server/api/blog-image.get.ts serves only the paths in this list.
const IMAGE_LIST = join(ROOT, "server", "assets", "blog-images.json");

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
// Older notes keep their images in this folder and link to them relative to
// it. Keep resolving those links.
const LEGACY_IMAGE_ROOT = "Blogs - Published";
// Search for the key only, so "portfolio:true" and "portfolio: true" both match.
const PUBLISH_FLAG = "portfolio:";
const GITLAB_PROJECT_API = `https://gitlab.com/api/v4/projects/${PROJECT_ID}`;
const GITLAB_API = `${GITLAB_PROJECT_API}/repository`;

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

// Excludes already-escaped brackets, images, links, reference links and
// definitions, and MDC spans that carry attributes.
const BARE_SPAN = /(^|[^\\!\]])\[([^[\]\n]+)\](?![([:{])/g;

// GitLab.com allows a Free-plan user 100 API requests a minute
// (RateLimit-Name: burst_traffic_per_user_free_plan). Each response carries
// GitLab's own count for the current window (RateLimit-Remaining) and the time
// the window ends (RateLimit-Reset). When the count reaches 0, wait for the
// next window. If a request still gets HTTP 429, wait for Retry-After and send
// it again.
const MAX_RETRIES = 3;
const MAX_WAIT_SECONDS = 120;
const rateLimit = { remaining: Infinity, resetAt: 0 };

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function gitlabFetch(url) {
  for (let attempt = 0; ; attempt += 1) {
    const wait = rateLimit.resetAt - Date.now();
    if (rateLimit.remaining <= 0 && wait > 0) {
      console.log(`  ⏳  GitLab rate limit reached; waiting ${Math.ceil(wait / 1000)}s for the next window…`);
      await sleep(wait + 1000);
    }
    const res = await fetch(url, { headers: HEADERS });
    const remaining = res.headers.get("RateLimit-Remaining");
    const reset = res.headers.get("RateLimit-Reset");
    if (remaining !== null && reset !== null) {
      rateLimit.remaining = Number(remaining);
      rateLimit.resetAt = Number(reset) * 1000;
    }
    const seconds = Number(res.headers.get("Retry-After")) || 60;
    if (res.status !== 429 || attempt === MAX_RETRIES || seconds > MAX_WAIT_SECONDS) return res;
    await res.body?.cancel();
    console.log(`  ⏳  GitLab rate limit reached; retrying in ${seconds}s…`);
    await sleep((seconds + 1) * 1000);
  }
}

// One recursive listing of the whole vault, used to resolve image links.
async function listVault() {
  const items = [];
  let page = "1";
  while (page) {
    const url = `${GITLAB_API}/tree?recursive=true&ref=${BRANCH}&per_page=100&page=${page}`;
    const res = await gitlabFetch(url);
    if (!res.ok) {
      throw new Error(`GitLab API ${res.status} for the vault tree`);
    }
    items.push(...await res.json());
    page = res.headers.get("X-Next-Page");
  }
  return items.filter((item) => item.type === "blob").map((item) => item.path);
}

// Ask GitLab which notes contain the flag key, so the sync reads only those
// notes. isPublished() still checks the frontmatter, because the search also
// matches the key in body text and the value can be false.
async function listFlaggedNotes() {
  const items = [];
  let page = "1";
  while (page) {
    const url = `${GITLAB_PROJECT_API}/search?scope=blobs&search=${encodeURIComponent(PUBLISH_FLAG)}&ref=${BRANCH}&per_page=100&page=${page}`;
    const res = await gitlabFetch(url);
    if (!res.ok) {
      throw new Error(`GitLab API ${res.status} for search "${PUBLISH_FLAG}"`);
    }
    items.push(...await res.json());
    page = res.headers.get("X-Next-Page");
  }
  // The search returns one result for each matching part of a file.
  return [...new Set(items.map((item) => item.path).filter((path) => path.endsWith(".md")))];
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
  const res = await gitlabFetch(url);
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`GitLab API ${res.status} for "${path}": ${body}`);
  }
  return res.text();
}

// Index the vault for image links. Obsidian links give a bare filename
// ("cover.png"), a path relative to the note, or a path from the vault root.
function buildVaultIndex(paths) {
  const images = paths.filter((path) => IMAGE_EXT.test(path));
  // Prefer the old blog image folder, so existing bare filenames resolve as before.
  const preferred = images.filter((path) => path.startsWith(`${LEGACY_IMAGE_ROOT}/images/`));
  const byName = new Map();
  for (const path of [...preferred, ...images]) {
    const name = posix.basename(path);
    if (!byName.has(name)) byName.set(name, path);
  }
  return { paths: new Set(paths), byName };
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

// Step 2: point image links at the image route. The route serves only the
// paths that published posts use (see writeImageList()).
function safeDecode(text, decode = decodeURI) {
  try {
    return decode(text);
  } catch {
    return text;
  }
}

function resolveImagePath(ref, notePath, vault) {
  for (const variant of new Set([ref, safeDecode(ref)])) {
    const candidates = [
      posix.join(posix.dirname(notePath), variant),
      posix.normalize(variant),
      posix.join(LEGACY_IMAGE_ROOT, variant),
      posix.join(LEGACY_IMAGE_ROOT, "images", variant),
    ];
    const found = candidates.find((candidate) => vault.paths.has(candidate))
      ?? (variant.includes("/") ? undefined : vault.byName.get(variant));
    if (found) return found;
  }
  // Not in the vault: keep the old rule, so the link fails as it did before.
  if (ref.startsWith(`${LEGACY_IMAGE_ROOT}/`)) return ref;
  return ref.startsWith("images/") ? `${LEGACY_IMAGE_ROOT}/${ref}` : `${LEGACY_IMAGE_ROOT}/images/${ref}`;
}

// Returns the image route URL for an image link, or null to keep the link.
function imageUrl(src, notePath, vault, { cover = false } = {}) {
  if (/^(https?:)?\/\//.test(src) || src.startsWith("/api/blog-image")) return null;
  // A body link that starts with "/" points to the site itself (public/).
  // A cover image that starts with "/" is a path from the vault root.
  if (src.startsWith("/") && !cover) return null;
  const path = resolveImagePath(src.replace(/^\.?\//, ""), notePath, vault);
  return `/api/blog-image?path=${encodeURIComponent(path)}`;
}

function rewriteImageUrls(markdown, notePath, vault) {
  return markdown.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (match, alt, src) => {
    const url = imageUrl(src, notePath, vault);
    return url ? `![${alt}](${url})` : match;
  });
}

// The frontmatter `image` is the cover. Resolve it here, so the site does not
// have to guess its folder.
function rewriteCoverImage(markdown, notePath, vault) {
  const block = markdown.match(/^---\r?\n[\s\S]*?\r?\n---(?=\r?\n|$)/);
  if (!block) return markdown;
  const rewritten = block[0].replace(/^image:[ \t]*(\S.*)$/m, (line, value) => {
    const src = value.trim().replace(/^["']|["']$/g, "").replace(/^\[\[|\]\]$/g, "").split("|")[0].trim();
    const url = imageUrl(src, notePath, vault, { cover: true });
    return url ? `image: "${url}"` : line;
  });
  return rewritten + markdown.slice(block[0].length);
}

// Step 3: escape bare [text], which remark-mdc parses as inline-span syntax and
// renders as <span>text</span>, silently dropping the brackets from IEEE citations.
function escapeBracketSpans(markdown) {
  const lines = markdown.split("\n");
  let inFence = false;
  let inFrontmatter = lines[0] === "---";

  return lines
    .map((line, index) => {
      if (inFrontmatter) {
        if (index > 0 && line === "---") inFrontmatter = false;
        return line;
      }
      if (/^\s*(```|~~~)/.test(line)) {
        inFence = !inFence;
        return line;
      }
      if (inFence) return line;

      return line
        .split(/(`[^`\n]*`)/)
        .map((segment, i) => (i % 2 ? segment : segment.replace(BARE_SPAN, "$1\\[$2\\]")))
        .join("");
    })
    .join("\n");
}

function frontmatter(raw) {
  const match = raw.trimStart().match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  return match ? parse(match[1]) ?? {} : {};
}

function isPublished(metadata) {
  return metadata.portfolio === true
    && metadata.draft === false
    && metadata.status !== "draft"
    && metadata.status !== "archived";
}

function renderMarkdown(raw, notePath, vault) {
  const withImages = rewriteCoverImage(
    rewriteImageUrls(transformObsidianImages(raw.trimStart()), notePath, vault),
    notePath,
    vault,
  );
  return injectReadingTime(escapeBracketSpans(withImages));
}

// ── sync ─────────────────────────────────────────────────────────────────────
const SLUG = /^[A-Za-z0-9][A-Za-z0-9._-]*$/;

// Name each post by its slug, so moving or renaming the note in Obsidian does
// not change its URL or its view count.
function outputPathFor(notePath, metadata) {
  if (metadata.slug === undefined || metadata.slug === null) {
    console.warn(`  ⚠️  "${notePath}" has no slug; its URL will change if you rename the note`);
    return posix.basename(notePath);
  }
  const slug = String(metadata.slug);
  if (!SLUG.test(slug)) throw new Error(`Invalid slug "${slug}" in "${notePath}"`);
  return `${slug}.md`;
}

const IMAGE_ROUTE_PATH = /\/api\/blog-image\?path=([^)\s"'&]+)/g;

// Write every vault image that the published posts link to, including links
// written by hand in a note. Text that only looks like a link (for example in
// a code block) and links to missing files are left out.
async function writeImageList(posts, vault) {
  const paths = new Set();
  for (const { content } of posts) {
    for (const match of content.matchAll(IMAGE_ROUTE_PATH)) {
      const path = safeDecode(match[1], decodeURIComponent);
      if (vault.paths.has(path) && IMAGE_EXT.test(path)) paths.add(path);
    }
  }
  const list = `${JSON.stringify([...paths].sort(), null, 2)}\n`;
  const current = await readFile(IMAGE_LIST, "utf8").catch(() => null);
  if (current !== list) {
    await mkdir(dirname(IMAGE_LIST), { recursive: true });
    await writeFile(IMAGE_LIST, list, "utf8");
  }
  return paths.size;
}

async function syncBlog() {
  console.log("🔄  Syncing blog posts from GitLab Repository API…");

  const [vaultPaths, notePaths] = await Promise.all([listVault(), listFlaggedNotes()]);
  const vault = buildVaultIndex(vaultPaths);

  // Read and select everything before changing the local cache.
  const renderedFiles = [];
  // Limit concurrent reads to avoid overwhelming the repository API.
  for (let offset = 0; offset < notePaths.length; offset += 8) {
    const batch = await Promise.all(
      notePaths.slice(offset, offset + 8).map(async (notePath) => {
        const raw = await getRawFile(notePath);
        const metadata = frontmatter(raw);
        if (!isPublished(metadata)) return null;
        return {
          notePath,
          relativePath: outputPathFor(notePath, metadata),
          content: renderMarkdown(raw, notePath, vault),
        };
      }),
    );
    renderedFiles.push(...batch.filter(Boolean));
  }
  const sources = new Map();
  for (const { notePath, relativePath } of renderedFiles) {
    if (sources.has(relativePath)) {
      throw new Error(`"${sources.get(relativePath)}" and "${notePath}" both publish to ${relativePath}`);
    }
    sources.set(relativePath, notePath);
  }
  const remoteNames = new Set(sources.keys());
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

  const imageCount = await writeImageList(renderedFiles, vault);
  console.log(`  📷  ${imageCount} image(s) allowed for the image route`);
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
  if (process.env.VERCEL && cachedFiles.length === 0) process.exit(1);
}
