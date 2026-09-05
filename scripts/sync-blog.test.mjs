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

test("sync discovers opted-in notes, respects publication flags, pagination and removal", async () => {
  const fixture = await mkdtemp(join(tmpdir(), "portfolio-sync-"));
  try {
    await mkdir(join(fixture, "scripts"));
    await cp(join(root, "scripts/sync-blog.mjs"), join(fixture, "scripts/sync-blog.mjs"));
    await symlink(join(root, "node_modules"), join(fixture, "node_modules"));
    const mockPath = join(fixture, "mock.mjs");
    await writeFile(mockPath, `
      import { readFile } from "node:fs/promises";
      const files = JSON.parse(await readFile(new URL("./files.json", import.meta.url), "utf8"));
      globalThis.fetch = async (input) => {
        const url = new URL(input);
        if (url.pathname.endsWith("/tree")) {
          if (url.searchParams.get("recursive")) return Response.json([]);
          const path = url.searchParams.get("path");
          if (path === "Research") return Response.json([{ type: "tree", path: "Research/Nested" }]);
          const items = Object.keys(files).filter((name) => name.startsWith(path + "/"))
            .map((name) => ({ type: "blob", path: name, name: name.split("/").pop() }));
          const page = Number(url.searchParams.get("page"));
          return Response.json(items.slice(page - 1, page), {
            headers: page < items.length ? { "X-Next-Page": String(page + 1) } : {},
          });
        }
        const path = decodeURIComponent(url.pathname.split("/files/")[1].replace(/\\/raw$/, ""));
        if (files[path] === null) return new Response("unavailable", { status: 503 });
        return new Response(files[path]);
      };
    `);
    const note = (fields) => `---\ntitle: Test\n${fields}\n---\nPublic content\n`;
    const files = {
      "Blogs - Published/legacy.md": note("slug: legacy"),
      "Blogs - Published/draft.md": note("status: draft"),
      "Research/Nested/new.md": note("portfolio: true # opt in\ndraft: false\nstatus: completed empirical pilot"),
      "Research/Nested/private.md": note("draft: false"),
      "Research/Nested/unfinished.md": note("portfolio: true\ndraft: true"),
      "Research/Nested/implicit.md": note("portfolio: true"),
      "Research/Nested/archived.md": note("portfolio: true\ndraft: false\nstatus: archived"),
      "Research/Nested/quoted.md": note('portfolio: "true"\ndraft: false'),
    };
    const run = async () => {
      await writeFile(join(fixture, "files.json"), JSON.stringify(files));
      return exec(process.execPath, ["--import", mockPath, join(fixture, "scripts/sync-blog.mjs")], {
        env: { ...process.env, GITLAB_TOKEN: "test", GITLAB_PROJECT_ID: "test" },
      });
    };
    const output = join(fixture, "content/blog");
    await mkdir(join(output, "research"), { recursive: true });
    await writeFile(join(output, "research/old-fixed-path.md"), "stale");
    await run();
    assert.match(await readFile(join(output, "research/Nested/new.md"), "utf8"), /completed empirical pilot/);
    await access(join(output, "legacy.md"));
    for (const name of ["private", "unfinished", "implicit", "archived", "quoted"]) {
      await assert.rejects(access(join(output, `research/Nested/${name}.md`)));
    }
    await assert.rejects(access(join(output, "draft.md")));
    await assert.rejects(access(join(output, "research/old-fixed-path.md")));

    files["Research/Nested/new.md"] = null;
    assert.match((await run()).stderr, /Blog sync failed/);
    await access(join(output, "research/Nested/new.md"));

    files["Research/Nested/renamed.md"] = note("portfolio: true\ndraft: false");
    delete files["Research/Nested/new.md"];
    await run();
    await access(join(output, "research/Nested/renamed.md"));
    await assert.rejects(access(join(output, "research/Nested/new.md")));

    files["Research/Nested/renamed.md"] = note("portfolio: false\ndraft: false");
    await run();
    await assert.rejects(access(join(output, "research/Nested/renamed.md")));
  } finally {
    await rm(fixture, { recursive: true, force: true });
  }
});
