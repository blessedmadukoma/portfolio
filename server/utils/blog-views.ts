import type { H3Event } from "h3";

export interface BlogViewPost {
  stem: string;
  slug?: string;
  views?: number | string;
}

export function postSlug(post: BlogViewPost) {
  return post.slug ?? post.stem.split("/").pop() ?? post.stem;
}

export function baselineViews(post: BlogViewPost) {
  const views = Number(post.views ?? 0);
  return Number.isFinite(views) && views > 0 ? Math.floor(views) : 0;
}

export async function findBlogPost(event: H3Event, slug: string) {
  const bySlug = await queryCollection(event, "blog")
    .where("slug", "=", slug)
    .select("stem", "slug", "views")
    .first();
  if (bySlug) return bySlug;

  return queryCollection(event, "blog")
    .where("stem", "LIKE", `%/${slug}`)
    .select("stem", "slug", "views")
    .first();
}
