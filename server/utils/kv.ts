export function hasKvConfiguration() {
  return Boolean(
    process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN,
  );
}

export async function kvCommand<T>(
  command: string,
  ...args: Array<string | number>
) {
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

export function assertDurableStorageInProduction() {
  if (process.env.VERCEL && !hasKvConfiguration()) {
    throw createError({
      statusCode: 503,
      statusMessage: "Storage is not configured",
    });
  }
}
