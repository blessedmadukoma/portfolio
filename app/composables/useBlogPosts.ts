export type PostType = "hashnode" | "native" | "x-article" | "medium";

export interface PostNode {
  id: string;
  title: string;
  slug: string;
  coverImage: { url: string };
  publishedAt: string;
  views: number;
  readTimeInMinutes: number;
  tags: Array<{ name: string; slug: string; id?: string }>;
}

export interface NativePost {
  stem: string;
  title: string;
  description?: string;
  date?: string;
  slug?: string;
  tags?: string[];
  image?: string;
  readingTime?: number;
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

interface GraphQLResponse {
  data?: {
    publication?: {
      posts?: {
        edges: { node: PostNode }[];
      };
    };
  };
  errors?: any[];
}

const BLOG_QUERY = `
  query FetchAllPosts($host: String!) {
    publication(host: $host) {
      posts(first: 10) {
        edges {
          node {
            id
            title
            slug
            coverImage {
              url
            }
            publishedAt
            views
            readTimeInMinutes
            tags {
              name
              slug
            }
          }
        }
      }
    }
  }
`;

const BLOG_VARIABLES = { host: "mblessed.hashnode.dev" };

export function formatDate(dateString: string): string {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function normalizeHashnodePost(post: PostNode): NormalizedPost {
  return {
    id: post.id,
    title: post.title,
    slug: post.slug,
    date: post.publishedAt,
    image: post.coverImage?.url,
    tags: post.tags.map((t) => t.name),
    type: "hashnode",
    href: `https://mblessed.hashnode.dev/${post.slug}`,
    isExternal: true,
    readTimeInMinutes: post.readTimeInMinutes,
    views: post.views,
  };
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
    type: "native",
    href: `/blog/${encodeURIComponent(identifier)}`,
    isExternal: false,
    readTimeInMinutes: post.readingTime,
  };
}

export function useBlogPosts() {
  const { data, pending, error } = useAsyncData(
    "blog-posts",
    async () => {
      let response: GraphQLResponse;
      try {
        response = await $fetch<GraphQLResponse>(
          useRuntimeConfig().public.apiHashnodeUrl,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: { query: BLOG_QUERY, variables: BLOG_VARIABLES },
          },
        );
      } catch {
        throw new Error(
          "Hashnode posts are temporarily unavailable. Check back soon.",
        );
      }

      if (response.errors?.length || !response?.data?.publication) {
        throw new Error(
          "Hashnode posts are temporarily unavailable. Check back soon.",
        );
      }

      return response;
    },
    {
      default: () => ({ data: { publication: { posts: { edges: [] } } } }),
    },
  );

  const posts = computed(
    () => data.value?.data?.publication?.posts?.edges ?? [],
  );

  return { posts, pending, error, data };
}

export function useNativePosts() {
  return useAsyncData("obsidian-posts", async () => {
    const posts = await queryCollection("blog").order("date", "DESC").all();
    return posts.filter((post) => !post.draft);
  });
}
