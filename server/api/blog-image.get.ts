// Serves images from the Obsidian vault on GitLab. The vault is private, so
// this route serves only the images that published posts use: the blog sync
// (scripts/sync-blog.mjs) writes their paths to server/assets/blog-images.json.
// Any other path gets 404 and is never requested from GitLab.
const MIME_TYPES: Record<string, string> = {
  png: "image/png", jpg: "image/jpeg", jpeg: "image/jpeg",
  gif: "image/gif", webp: "image/webp", svg: "image/svg+xml",
  bmp: "image/bmp", tiff: "image/tiff", tif: "image/tiff",
};

async function allowedImages(): Promise<string[]> {
  const list = await useStorage("assets:server").getItem("blog-images.json");
  const parsed = typeof list === "string" ? JSON.parse(list) : list;
  return Array.isArray(parsed) ? parsed : [];
}

export default defineEventHandler(async (event) => {
  const { path } = getQuery(event);

  if (typeof path !== "string" || !path) {
    throw createError({ statusCode: 400, statusMessage: "Missing path" });
  }

  const contentType = MIME_TYPES[path.split(".").pop()?.toLowerCase() ?? ""];
  if (!contentType || !(await allowedImages()).includes(path)) {
    throw createError({ statusCode: 404, statusMessage: "Image not found" });
  }

  const token = process.env.GITLAB_TOKEN ?? "";
  const projectId = process.env.GITLAB_PROJECT_ID ?? "";

  if (!token || !projectId) {
    throw createError({ statusCode: 500, statusMessage: "GitLab token not configured" });
  }

  const apiUrl = `https://gitlab.com/api/v4/projects/${projectId}/repository/files/${encodeURIComponent(path)}/raw?ref=main`;

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

  setHeader(event, "Content-Type", contentType);
  setHeader(event, "Cache-Control", "public, max-age=86400");

  return Buffer.from(await response.arrayBuffer());
});
