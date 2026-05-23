import { useStorage } from "#imports";

export default defineEventHandler(async () => {
  const storage = useStorage("views");
  const keys = await storage.getKeys();
  const result: Record<string, number> = {};
  await Promise.all(
    keys.map(async (key) => {
      const slug = key.replace("view:", "");
      result[slug] = (await storage.getItem<number>(key)) ?? 0;
    }),
  );
  return result;
});
