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

interface PostsData {
  publication?: {
    posts?: {
      edges: { node: PostNode }[];
    };
  };
}

const BLOG_QUERY = gql`
  query FetchAllPosts($host: String!) {
    publication(host: $host) {
      posts(first: 0) {
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
  const { data, pending, error } = useAsyncQuery<PostsData>({
    key: "blog-posts",
    query: BLOG_QUERY,
    variables: BLOG_VARIABLES,
  });

  const posts = computed(() => data.value?.publication?.posts?.edges ?? []);

  return { posts, pending, error, data };
}
