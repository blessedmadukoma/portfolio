const CONTACT_ADDRESS = "blessedmadukoma@gmail.com";
const MAX_FIELD_LENGTH = 300;
const FIELDS = ["name", "org", "site", "purpose", "ref"] as const;

type Field = (typeof FIELDS)[number];

function clip(value: unknown): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, MAX_FIELD_LENGTH);
}

export default defineEventHandler(async (event) => {
  setResponseHeader(event, "Cache-Control", "private, no-store, max-age=0");

  if (event.method !== "GET" && event.method !== "POST") {
    throw createError({ statusCode: 405, statusMessage: "Method not allowed" });
  }

  const query = getQuery(event);
  let body: Record<string, unknown> = {};
  if (event.method === "POST") {
    body = (await readBody(event).catch(() => ({}))) ?? {};
  }

  const supplied = Object.fromEntries(
    FIELDS.map((field) => [field, clip(body[field] ?? query[field])]),
  ) as Record<Field, string>;

  // Bare probes carry no sender details and are not worth a write.
  if (FIELDS.some((field) => supplied[field])) {
    await recordCanaryHit({
      at: new Date().toISOString(),
      ip: getRequestIP(event, { xForwardedFor: true }) ?? "",
      userAgent: clip(getHeader(event, "user-agent")),
      referer: clip(getHeader(event, "referer")),
      fetchSite: clip(getHeader(event, "sec-fetch-site")),
      method: event.method,
      ...supplied,
    });
  }

  return {
    status: "ok",
    contact: CONTACT_ADDRESS,
    verified: new Date().toISOString().slice(0, 10),
  };
});
