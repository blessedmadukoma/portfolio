const COUNT_KEY_PREFIX = "view:";
const SEEN_KEY_PREFIX = "view-seen:";
const VIEW_WINDOW_SECONDS = 60 * 60 * 24;

const INCREMENT_ONCE_SCRIPT = `
  if redis.call("SET", KEYS[1], "1", "NX", "EX", ARGV[1]) then
    return redis.call("INCR", KEYS[2])
  end

  local current = redis.call("GET", KEYS[2])
  if current then
    return tonumber(current)
  end

  return 0
`;

function hasKvConfiguration() {
  return Boolean(
    process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN,
  );
}

async function kvCommand<T>(command: string, ...args: Array<string | number>) {
  const url = process.env.KV_REST_API_URL?.replace(/\/+$/, "");
  const token = process.env.KV_REST_API_TOKEN;
  if (!url || !token) return null;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify([command, ...args]),
  });
  const payload = (await response.json()) as { result?: T; error?: string };
  if (!response.ok || payload.error) {
    throw createError({
      statusCode: 502,
      statusMessage: payload.error || "KV request failed",
    });
  }
  return payload.result ?? null;
}

function countKey(slug: string) {
  return `${COUNT_KEY_PREFIX}${slug}`;
}

function seenKey(slug: string, visitorId: string) {
  return `${SEEN_KEY_PREFIX}${slug}:${visitorId}`;
}

function assertDurableStorageInProduction() {
  if (process.env.VERCEL && !hasKvConfiguration()) {
    throw createError({
      statusCode: 503,
      statusMessage: "View storage is not configured",
    });
  }
}

export async function getLocalViewCount(slug: string): Promise<number> {
  assertDurableStorageInProduction();
  if (hasKvConfiguration()) {
    return Number(await kvCommand<string | number | null>("GET", countKey(slug))) || 0;
  }

  const storage = useStorage("views");
  return (await storage.getItem<number>(countKey(slug))) ?? 0;
}

export async function getAllLocalViewCounts(): Promise<Record<string, number>> {
  assertDurableStorageInProduction();
  if (hasKvConfiguration()) {
    const keys =
      (await kvCommand<string[]>("KEYS", `${COUNT_KEY_PREFIX}*`)) ?? [];
    if (keys.length === 0) return {};
    const values =
      (await kvCommand<Array<string | number | null>>("MGET", ...keys)) ?? [];
    return Object.fromEntries(
      keys.map((key, index) => [
        key.slice(COUNT_KEY_PREFIX.length),
        Number(values[index]) || 0,
      ]),
    );
  }

  const storage = useStorage("views");
  const keys = (await storage.getKeys()).filter((key) =>
    key.startsWith(COUNT_KEY_PREFIX),
  );
  const entries = await Promise.all(
    keys.map(async (key) => [
      key.slice(COUNT_KEY_PREFIX.length),
      (await storage.getItem<number>(key)) ?? 0,
    ] as const),
  );
  return Object.fromEntries(entries);
}

export async function incrementLocalViewOnce(
  slug: string,
  visitorId: string,
): Promise<number> {
  assertDurableStorageInProduction();
  if (hasKvConfiguration()) {
    return (
      Number(
        await kvCommand<string | number | null>(
          "EVAL",
          INCREMENT_ONCE_SCRIPT,
          2,
          seenKey(slug, visitorId),
          countKey(slug),
          VIEW_WINDOW_SECONDS,
        ),
      ) || 0
    );
  }

  // This branch is for a single local development server. Production must use
  // KV so concurrent increments remain atomic and survive deployments.
  const storage = useStorage("views");
  const deduplicationKey = seenKey(slug, visitorId);
  if (await storage.hasItem(deduplicationKey)) {
    return (await storage.getItem<number>(countKey(slug))) ?? 0;
  }

  const current = (await storage.getItem<number>(countKey(slug))) ?? 0;
  await storage.setItem(countKey(slug), current + 1);
  await storage.setItem(deduplicationKey, Date.now());
  return current + 1;
}
