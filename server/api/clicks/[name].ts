// Counts clicks on the home page's email and resume links.
// POST /api/clicks/<name> adds one; GET /api/clicks/<name> returns the count.
// Stores one number per link (key "click:<name>"); no visitor data.
const LINKS = new Set(["email", "resume", "academic-cv"]);
const BOT_PATTERN =
  /bot|crawler|spider|slurp|preview|facebookexternalhit|whatsapp|telegram|discordbot|linkedinbot/i;

function clickKey(name: string) {
  return `click:${name}`;
}

export default defineEventHandler(async (event) => {
  setResponseHeader(event, "Cache-Control", "private, no-store, max-age=0");

  if (event.method !== "GET" && event.method !== "POST") {
    throw createError({ statusCode: 405, statusMessage: "Method not allowed" });
  }

  const name = getRouterParam(event, "name") ?? "";
  if (!LINKS.has(name)) {
    throw createError({ statusCode: 404, statusMessage: "Unknown link" });
  }

  assertDurableStorageInProduction();
  const isBot = BOT_PATTERN.test(getHeader(event, "user-agent") ?? "");
  const crossSite = getHeader(event, "sec-fetch-site") === "cross-site";
  const count = event.method === "POST" && !isBot && !crossSite;

  if (hasKvConfiguration()) {
    const value = count
      ? await kvCommand<number>("INCR", clickKey(name))
      : await kvCommand<string | number | null>("GET", clickKey(name));
    return { name, clicks: Number(value) || 0 };
  }

  const storage = useStorage("views");
  const current = (await storage.getItem<number>(clickKey(name))) ?? 0;
  if (!count) return { name, clicks: current };
  await storage.setItem(clickKey(name), current + 1);
  return { name, clicks: current + 1 };
});
