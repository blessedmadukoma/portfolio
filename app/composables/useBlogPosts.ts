// export type PostType = "hashnode" | "native" | "x-article" | "medium";
export type PostType = "hashnode" | "x-article" | "medium";

export function getPostType(_post: PostNode): PostType {
  return "hashnode";
}

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

export function useBlogPosts() {
  const { data, pending, error } = useAsyncData(
    "blog-posts",
    async () => {
      let response: GraphQLResponse;
      try {
        response = await $fetch<GraphQLResponse>(
          "https://gql-beta.hashnode.com",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: { query: BLOG_QUERY, variables: BLOG_VARIABLES },
          },
        );
      } catch {
        throw new Error("Posts are temporarily unavailable. Check back soon.");
      }

      if (response.errors?.length || !response?.data?.publication) {
        throw new Error("Posts are temporarily unavailable. Check back soon.");
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
