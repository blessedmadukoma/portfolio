export default defineEventHandler(async (event) => {
  setResponseHeader(event, "Cache-Control", "private, no-store, max-age=0");

  const [posts, localViews] = await Promise.all([
    queryCollection(event, "blog").select("stem", "slug", "views").all(),
    getAllLocalViewCounts(),
  ]);

  return Object.fromEntries(
    posts.map((post) => {
      const slug = postSlug(post);
      return [slug, baselineViews(post) + (localViews[slug] ?? 0)];
    }),
  );
});
