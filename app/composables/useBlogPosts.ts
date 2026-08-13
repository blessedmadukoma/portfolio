export type PostType = "native" | "x-article" | "medium";

export interface NativePost {
  stem: string;
  title: string;
  description?: string;
  date?: string;
  slug?: string;
  tags?: string[];
  image?: string;
  readingTime?: number;
  views?: number;
  source?: "hashnode";
  hashnodeId?: string;
  draft?: boolean;
}

export interface NormalizedPost {
  id: string;
  title: string;
  slug: string;
  description?: string;
  date: string;
  image?: string;
  tags: string[];
  type: PostType;
  href: string;
  isExternal: boolean;
  readTimeInMinutes?: number;
  views?: number;
}

export function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function obsidianImageToProxy(src?: string) {
  if (!src) return undefined;
  if (/^https?:\/\//.test(src)) return src;
  if (src.startsWith("/api/blog-image")) return src;
  // Strip leading slash or "./"
  const clean = src.replace(/^\//, "").replace(/^\.\//, "");
  const repoPath = clean.startsWith("images/") ? clean : `images/${clean}`;
  return `/api/blog-image?path=${encodeURIComponent(`Blogs - Published/${repoPath}`)}`;
}

export function normalizeObsidianPost(post: NativePost): NormalizedPost {
  // stem may be "Blogs - Published/post-title"; extract only the filename part
  const stemFile = post.stem.split("/").pop() ?? post.stem;
  const identifier = post.slug ?? stemFile;
  return {
    id: post.stem,
    title: post.title,
    slug: identifier,
    description: post.description,
    date: post.date ?? "",
    image: obsidianImageToProxy(post.image),
    tags: post.tags ?? [],
    // Hashnode is decommissioned. Imported posts now render from Obsidian like
    // every other native post; `source` only preserves migration metadata.
    type: "native",
    href: `/blog/${encodeURIComponent(identifier)}`,
    isExternal: false,
    readTimeInMinutes: post.readingTime,
    views: post.views,
  };
}

export function useNativePosts() {
  return useAsyncData("obsidian-posts", async () => {
    const posts = await queryCollection("blog").order("date", "DESC").all();
    return posts.filter((post) => !post.draft);
  });
}
