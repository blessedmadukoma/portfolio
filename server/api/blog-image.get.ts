export default defineEventHandler(async (event) => {
  const { path } = getQuery(event) as { path?: string };

  if (!path) {
    throw createError({ statusCode: 400, statusMessage: "Missing path" });
  }

  const repoUrl = process.env.OBSIDIAN_VAULT_REPO_URL ?? "";
  const patMatch = repoUrl.match(/https?:\/\/([^@]+)@/);
  const pat = patMatch?.[1] ?? "";

  if (!pat) {
    throw createError({ statusCode: 500, statusMessage: "GitHub token not configured" });
  }

  // Use the GitHub Contents API with Accept: application/vnd.github.v3.raw
  // This returns raw binary content and works correctly with private repos.
  // raw.githubusercontent.com only works unauthenticated for public repos.
  const encodedPath = path.split("/").map(encodeURIComponent).join("/");
  const apiUrl = `https://api.github.com/repos/blessedmadukoma/obsidian-vault/contents/${encodedPath}?ref=main`;

  let response: Response;
  try {
    response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${pat}`,
        Accept: "application/vnd.github.v3.raw",
        "X-GitHub-Api-Version": "2022-11-28",
        "User-Agent": "portfolio-image-proxy",
      },
    });
  } catch {
    throw createError({ statusCode: 502, statusMessage: "Failed to reach GitHub API" });
  }

  if (!response.ok) {
    throw createError({ statusCode: response.status });
  }

  // GitHub API may return application/octet-stream — derive from extension instead
  const ext = path.split(".").pop()?.toLowerCase() ?? "";
  const mimeMap: Record<string, string> = {
    png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg",
    gif: "image/gif", webp: "image/webp", svg: "image/svg+xml",
    bmp: "image/bmp", tiff: "image/tiff", tif: "image/tiff",
  };
  const contentType = mimeMap[ext] ?? response.headers.get("content-type") ?? "image/png";
  setHeader(event, "Content-Type", contentType);
  setHeader(event, "Cache-Control", "public, max-age=86400");

  return Buffer.from(await response.arrayBuffer());
});
