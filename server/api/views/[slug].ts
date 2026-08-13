import { randomUUID } from "node:crypto";

const VISITOR_COOKIE = "portfolio-viewer";
const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;
const UUID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const BOT_PATTERN =
  /bot|crawler|spider|slurp|preview|facebookexternalhit|whatsapp|telegram|discordbot|linkedinbot/i;

function getVisitorId(event: Parameters<typeof getCookie>[0]) {
  const existing = getCookie(event, VISITOR_COOKIE);
  if (existing && UUID_PATTERN.test(existing)) return existing;

  const visitorId = randomUUID();
  setCookie(event, VISITOR_COOKIE, visitorId, {
    httpOnly: true,
    maxAge: ONE_YEAR_SECONDS,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return visitorId;
}

function isLikelyBot(event: Parameters<typeof getHeader>[0]) {
  return BOT_PATTERN.test(getHeader(event, "user-agent") ?? "");
}

function isCrossSiteRequest(event: Parameters<typeof getHeader>[0]) {
  return getHeader(event, "sec-fetch-site") === "cross-site";
}

export default defineEventHandler(async (event) => {
  setResponseHeader(event, "Cache-Control", "private, no-store, max-age=0");

  if (event.method !== "GET" && event.method !== "POST") {
    throw createError({ statusCode: 405, statusMessage: "Method not allowed" });
  }

  const slug = getRouterParam(event, "slug");
  if (!slug) {
    throw createError({ statusCode: 400, statusMessage: "Missing post slug" });
  }

  const post = await findBlogPost(event, slug);
  if (!post) {
    throw createError({ statusCode: 404, statusMessage: "Post not found" });
  }

  const baseline = baselineViews(post);

  if (
    event.method === "POST" &&
    !isLikelyBot(event) &&
    !isCrossSiteRequest(event)
  ) {
    const localViews = await incrementLocalViewOnce(slug, getVisitorId(event));
    return { views: baseline + localViews };
  }

  const localViews = await getLocalViewCount(slug);
  return { views: baseline + localViews };
});
