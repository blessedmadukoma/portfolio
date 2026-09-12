import { createHash, timingSafeEqual } from "node:crypto";

function matchesSecret(provided: string, expected: string) {
  return timingSafeEqual(
    createHash("sha256").update(provided).digest(),
    createHash("sha256").update(expected).digest(),
  );
}

export default defineEventHandler(async (event) => {
  setResponseHeader(event, "Cache-Control", "private, no-store, max-age=0");
  setResponseHeader(event, "X-Robots-Tag", "noindex, nofollow");

  const secret = process.env.CANARY_SECRET;
  const key = getQuery(event).key;

  // 404 rather than 401 so a wrong key does not confirm the route exists.
  if (!secret || typeof key !== "string" || !matchesSecret(key, secret)) {
    throw createError({ statusCode: 404, statusMessage: "Not found" });
  }

  return { hits: await getCanaryHits() };
});
