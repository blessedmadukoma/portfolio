const HITS_KEY = "canary:hits";
const MAX_HITS = 500;

export interface CanaryHit {
  at: string;
  ip: string;
  userAgent: string;
  referer: string;
  fetchSite: string;
  method: string;
  ref: string;
  name: string;
  org: string;
  site: string;
  purpose: string;
}

export async function recordCanaryHit(hit: CanaryHit): Promise<void> {
  assertDurableStorageInProduction();
  const encoded = JSON.stringify(hit);

  if (hasKvConfiguration()) {
    await kvCommand("LPUSH", HITS_KEY, encoded);
    await kvCommand("LTRIM", HITS_KEY, 0, MAX_HITS - 1);
    return;
  }

  const storage = useStorage("canary");
  const existing = (await storage.getItem<CanaryHit[]>(HITS_KEY)) ?? [];
  await storage.setItem(HITS_KEY, [hit, ...existing].slice(0, MAX_HITS));
}

export async function getCanaryHits(): Promise<CanaryHit[]> {
  assertDurableStorageInProduction();

  if (hasKvConfiguration()) {
    const raw = (await kvCommand<string[]>("LRANGE", HITS_KEY, 0, -1)) ?? [];
    return raw.flatMap((entry) => {
      try {
        return [JSON.parse(entry) as CanaryHit];
      } catch {
        return [];
      }
    });
  }

  const storage = useStorage("canary");
  return (await storage.getItem<CanaryHit[]>(HITS_KEY)) ?? [];
}
