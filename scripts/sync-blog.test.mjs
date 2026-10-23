import { test } from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, readFile, cp, symlink, rm, access } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";
import { execFile } from "node:child_process";

const exec = promisify(execFile);
const root = fileURLToPath(new URL("../", import.meta.url));

// A fake GitLab API that serves files.json as the vault. Pages hold one item.
const mock = `
  import { readFile } from "node:fs/promises";
  import { appendFileSync } from "node:fs";
  const files = JSON.parse(await readFile(new URL("./files.json", import.meta.url), "utf8"));
  const paged = (url, items, headers = {}) => {
    const page = Number(url.searchParams.get("page"));
    if (page < items.length) headers["X-Next-Page"] = String(page + 1);
    return Response.json(items.slice(page - 1, page), { headers });
  };
  globalThis.fetch = async (input) => {
    const url = new URL(input);
    if (url.pathname.endsWith("/tree")) {
      if (url.searchParams.get("recursive") !== "true" || url.searchParams.has("path")) {
        return new Response("expected one recursive listing of the vault", { status: 400 });
      }
      const items = [{ type: "tree", path: "Notes" }, ...Object.keys(files).map((path) => ({ type: "blob", path }))];
      const headers = {};
      if (process.env.MOCK_EXHAUST_ONCE && !globalThis.exhausted) {
        globalThis.exhausted = true;
        headers["RateLimit-Remaining"] = "0";
        headers["RateLimit-Reset"] = String(Math.floor(Date.now() / 1000) + 1);
      }
      return paged(url, items, headers);
    }
    if (url.pathname.endsWith("/search")) {
      if (url.searchParams.get("scope") !== "blobs") return new Response("bad scope", { status: 400 });
      const term = url.searchParams.get("search");
      // Two results per matching file, as GitLab returns one per matching part.
      const items = Object.keys(files)
        .filter((path) => files[path] === null || files[path].includes(term))
        .flatMap((path) => [{ path, startline: 1 }, { path, startline: 9 }]);
      return paged(url, items);
    }
    if (process.env.MOCK_THROTTLE_ONCE && !globalThis.throttled) {
      globalThis.throttled = true;
      return new Response("Rate limit exceeded", { status: 429, headers: { "Retry-After": "1" } });
    }
    const path = decodeURIComponent(url.pathname.split("/files/")[1].replace(/\\/raw$/, ""));
    appendFileSync(new URL("./reads.log", import.meta.url), path + "\\n");
    if (files[path] === null) return new Response("unavailable", { status: 503 });
    return new Response(files[path]);
  };
`;

test("sync publishes flagged notes from any folder by slug, resolves images and limits the image route", async () => {
  const fixture = await mkdtemp(join(tmpdir(), "portfolio-sync-"));
  try {
    await mkdir(join(fixture, "scripts"));
    await cp(join(root, "scripts/sync-blog.mjs"), join(fixture, "scripts/sync-blog.mjs"));
    await symlink(join(root, "node_modules"), join(fixture, "node_modules"));
    const mockPath = join(fixture, "mock.mjs");
    await writeFile(mockPath, mock);

    const note = (fields, body = "Public content") => `---\ntitle: Test\n${fields}\n---\n${body}\n`;
    const publish = (slug, extra = "") => `slug: ${slug}\nportfolio: true\ndraft: false${extra}`;
    const citations = [
      "---",
      "title: Citations",
      "slug: citations",
      "portfolio: true",
      "draft: false",
      'tags: ["a","b"]',
      "---",
      "Inline [6] and [Online] markers, already-escaped \\[1\\], a `arr[0]` span,",
      "a [link](https://example.com) and a reference [2][3].",
      "",
      "```js",
      'const re = /```[\\s\\S]*?```/g; // [not-a-citation]',
      "```",
      "",
      "[6] A. Gallant, \"ripgrep.\"",
      "",
    ].join("\n");
    const files = {
      "Blogs - Published/citations.md": citations,
      "Blogs - Published/legacy.md": note(
        publish("legacy", "\nimage: images/covers/legacy.png"),
        "![](images/covers/legacy.png) and ![[shared.png|300]]",
      ),
      "Blogs - Published/images/covers/legacy.png": "png",
      "Blogs - Published/images/x/shared.png": "png",
      "Blogs - Published/old-unflagged.md": note("slug: old-unflagged\ndraft: false"),
      "Notes/Anywhere/new.md": note(
        publish("new-post", "\nstatus: completed empirical pilot"),
        "![[figure.png]] ![](./local.png) ![](/site.png) ![](https://example.com/a.png) ![](/api/blog-image?path=Pinned%2Fhard.png) ![](/api/blog-image?path=Pinned%2Fmissing.png) `/api/blog-image?path=${x}`",
      ),
      "Notes/Anywhere/local.png": "png",
      // Same name in the old image folder: "./local.png" must still mean the note's folder.
      "Blogs - Published/images/local.png": "png",
      "Attachments/figure.png": "png",
      "Pinned/hard.png": "png",
      "Private/secret.md": note("slug: secret\ndraft: false", "Do not publish"),
      "Private/secret.png": "png",
      "Notes/body-mention.md": note("slug: body-mention\ndraft: false", "portfolio: true appears only in the body"),
      "Research/unfinished.md": note("slug: unfinished\nportfolio: true\ndraft: true"),
      "Research/implicit.md": note("slug: implicit\nportfolio: true"),
      "Research/archived.md": note(publish("archived", "\nstatus: archived")),
      "Research/quoted.md": note('slug: quoted\nportfolio: "true"\ndraft: false'),
      "Research/no-slug.md": note("portfolio: true\ndraft: false"),
    };
    const run = async (extraEnv = {}) => {
      await writeFile(join(fixture, "files.json"), JSON.stringify(files));
      return exec(process.execPath, ["--import", mockPath, join(fixture, "scripts/sync-blog.mjs")], {
        env: { ...process.env, GITLAB_TOKEN: "test", GITLAB_PROJECT_ID: "test", ...extraEnv },
      });
    };
    const output = join(fixture, "content/blog");
    const read = (name) => readFile(join(output, name), "utf8");
    await mkdir(join(output, "research"), { recursive: true });
    await writeFile(join(output, "research/old-fixed-path.md"), "stale");

    // First run: one request gets 429, and one response says the window is used up.
    const first = await run({ MOCK_THROTTLE_ONCE: "1", MOCK_EXHAUST_ONCE: "1" });
    assert.match(first.stdout, /rate limit reached; retrying in 1s/);
    assert.match(first.stdout, /rate limit reached; waiting \d+s for the next window/);
    assert.match(first.stderr, /"Research\/no-slug\.md" has no slug/);

    // Only notes that contain the flag key are read.
    const reads = (await readFile(join(fixture, "reads.log"), "utf8")).split("\n");
    assert.ok(!reads.includes("Private/secret.md"), "read a note without the flag");
    assert.ok(!reads.includes("Blogs - Published/old-unflagged.md"), "read a note without the flag");

    // Published notes are named by slug, wherever they are in the vault.
    for (const name of ["citations.md", "legacy.md", "new-post.md", "no-slug.md"]) {
      await access(join(output, name));
    }
    for (const name of ["old-unflagged", "secret", "body-mention", "unfinished", "implicit", "archived", "quoted"]) {
      await assert.rejects(access(join(output, `${name}.md`)));
    }
    await assert.rejects(access(join(output, "research/old-fixed-path.md")));

    const post = await read("new-post.md");
    assert.match(post, /completed empirical pilot/);
    assert.ok(post.includes("![](/api/blog-image?path=Attachments%2Ffigure.png)"), "bare filename from another folder");
    assert.ok(post.includes("![](/api/blog-image?path=Notes%2FAnywhere%2Flocal.png)"), "path relative to the note");
    assert.ok(post.includes("![](/site.png)"), "site path kept");
    assert.ok(post.includes("![](https://example.com/a.png)"), "external URL kept");

    const legacy = await read("legacy.md");
    const cover = "/api/blog-image?path=Blogs%20-%20Published%2Fimages%2Fcovers%2Flegacy.png";
    assert.ok(legacy.includes(`image: "${cover}"`), "cover image resolved in the frontmatter");
    assert.ok(legacy.includes(`![](${cover})`), "old relative image path");
    assert.ok(legacy.includes("![](/api/blog-image?path=Blogs%20-%20Published%2Fimages%2Fx%2Fshared.png)"));

    // The image route may serve only the images that published posts use.
    const allowed = JSON.parse(await readFile(join(fixture, "server/assets/blog-images.json"), "utf8"));
    assert.deepEqual(allowed, [
      "Attachments/figure.png",
      "Blogs - Published/images/covers/legacy.png",
      "Blogs - Published/images/x/shared.png",
      "Notes/Anywhere/local.png",
      "Pinned/hard.png",
    ]);

    const synced = await read("citations.md");
    assert.match(synced, /Inline \\\[6\\\] and \\\[Online\\\] markers/);
    assert.match(synced, /already-escaped \\\[1\\\],/);
    assert.match(synced, /a `arr\[0\]` span,/);
    assert.match(synced, /a \[link\]\(https:\/\/example\.com\) and a reference \[2\]\[3\]\./);
    assert.match(synced, /const re = \/```\[\\s\\S\]\*\?```\/g; \/\/ \[not-a-citation\]/);
    assert.match(synced, /^\\\[6\\\] A\. Gallant/m);
    assert.match(synced, /^tags: \["a","b"\]$/m);

    // A failed read keeps the cached posts.
    const moved = files["Notes/Anywhere/new.md"];
    files["Notes/Anywhere/new.md"] = null;
    assert.match((await run()).stderr, /Blog sync failed/);
    await access(join(output, "new-post.md"));

    // Moving a note to another folder keeps its slug, so its URL.
    delete files["Notes/Anywhere/new.md"];
    files["Elsewhere/new.md"] = moved;
    await run();
    await access(join(output, "new-post.md"));

    // Two notes with one slug stop the sync.
    files["Notes/copy.md"] = note(publish("legacy"));
    assert.match((await run()).stderr, /both publish to legacy\.md/);
    delete files["Notes/copy.md"];

    // Setting the flag to false removes the post.
    files["Elsewhere/new.md"] = note("slug: new-post\nportfolio: false\ndraft: false");
    await run();
    await assert.rejects(access(join(output, "new-post.md")));
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
});
