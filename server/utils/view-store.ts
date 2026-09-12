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

function countKey(slug: string) {
  return `${COUNT_KEY_PREFIX}${slug}`;
}

function seenKey(slug: string, visitorId: string) {
  return `${SEEN_KEY_PREFIX}${slug}:${visitorId}`;
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
