import { useStorage } from "#imports";

export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, "slug")!;
  const storage = useStorage("views");
  const key = `view:${slug}`;

  if (event.method === "POST") {
    const current = (await storage.getItem<number>(key)) ?? 0;
    await storage.setItem(key, current + 1);
    return { views: current + 1 };
  }

  const views = (await storage.getItem<number>(key)) ?? 0;
  return { views };
});
