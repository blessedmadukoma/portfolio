export default defineEventHandler(async (event) => {
  const { path } = getQuery(event) as { path?: string };

  if (!path) {
    throw createError({ statusCode: 400, statusMessage: "Missing path" });
  }

  const token = process.env.GITLAB_TOKEN ?? "";
  const projectId = process.env.GITLAB_PROJECT_ID ?? "";

  if (!token || !projectId) {
    throw createError({ statusCode: 500, statusMessage: "GitLab token not configured" });
  }

  const encodedPath = encodeURIComponent(path);
  const apiUrl = `https://gitlab.com/api/v4/projects/${projectId}/repository/files/${encodedPath}/raw?ref=main`;

  let response: Response;
  try {
    response = await fetch(apiUrl, {
      headers: {
        "PRIVATE-TOKEN": token,
      },
    });
  } catch {
    throw createError({ statusCode: 502, statusMessage: "Failed to reach GitLab API" });
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
