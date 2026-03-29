<script lang="ts" setup>
  const query = gql`
    query FetchAllPosts($host: String!) {
      publication(host: $host) {
        posts(first: 0) {
          edges {
            node {
              id
              title
              slug
              subtitle
              coverImage {
                url
              }
              publishedAt
              views
              brief
            }
          }
        }
      }
    }
  `;

  function truncateText(text: string, maxLength: number) {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  }

  function formatDate(dateString: string) {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  }

  const variables = { host: "mblessed.hashnode.dev" };

  interface PostNode {
    id: string;
    title: string;
    slug: string;
    subtitle: string;
    coverImage: { url: string };
    publishedAt: string;
    views: number;
    brief: string;
  }
  interface PostsData {
    publication?: {
      posts?: {
        edges: { node: PostNode }[];
      };
    };
  }

  const { data, pending, error } = useAsyncQuery<PostsData>(query, variables);

  const posts = computed(() => data.value?.publication?.posts?.edges || []);

  const openPostDropdown = ref<number | null>(null);
  const togglePostDropdown = (id: number) => {
    openPostDropdown.value = openPostDropdown.value === id ? null : id;
  };
</script>

<template>
  <section class="space-y-3 mr-6">
    <section class="space-y-2">
      <h2 class="flex justify-between items-start">
        <span
          class="hidden md:block w-2/3 py-2 text-sm text-zinc-600 dark:text-zinc-400"
        >
          I write about software, data, ML &amp; AI systems, academia, and
          startups.
          <span class="relative inline-block font-bold">
            <svg
              class="rough-annotation"
              viewBox="0 0 48 29"
              style="
                position: absolute;
                top: 0;
                left: 0;
                overflow: visible;
                pointer-events: none;
                width: 100%;
                height: 100%;
              "
            >
              <path
                d="M2 12 Q10 10, 18 12 T34 11 T42 13"
                fill="none"
                stroke="#F2D5C4"
                stroke-width="30"
                stroke-linecap="round"
                style="
                  stroke-dashoffset: 50px;
                  stroke-dasharray: 50px;
                  animation: 800ms ease-out forwards rough-notation-dash;
                "
              ></path>
            </svg>
            <span style="position: relative; z-index: 1">Why:</span>
          </span>
          to deeply understand what I'm learning and make it easier for others
          on the same path.
        </span>

        <a
          class="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 underline transition-colors py-2"
          target="_blank"
          href="https://mblessed.hashnode.dev"
        >
          View All Posts ({{ data?.publication?.posts?.edges.length || 0 }})
        </a>
      </h2>

      <!-- Loading -->
      <div
        v-if="pending"
        class="text-center py-8 flex flex-col items-center justify-center"
      >
        <svg
          class="animate-spin h-6 w-6 text-zinc-500 mb-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          ></path>
        </svg>
        <p class="text-zinc-500 dark:text-zinc-400">Loading posts...</p>
      </div>

      <!-- Error -->
      <div v-else-if="error" class="text-center py-8">
        <p class="text-red-500">Error loading posts: {{ error.message }}</p>
      </div>

      <!-- Posts list -->
      <div v-else>
        <div
          v-for="(post, id) in posts"
          :key="post.node.id"
          class="border-b border-zinc-200 last:border-b-0 dark:border-zinc-700"
          @click="togglePostDropdown(id)"
        >
          <div
            class="flex flex-1 justify-between items-start space-x-3 py-2 tracking-wide group cursor-pointer"
          >
            <div class="px-2 flex space-x-4">
              <div
                class="w-16 h-16 rounded-md overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex-shrink-0"
              >
                <img
                  v-if="post.node.coverImage?.url"
                  :src="post.node.coverImage.url"
                  :alt="post.node.title"
                  class="w-full h-full object-cover"
                />
                <div
                  v-else
                  class="w-full h-full flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6 text-zinc-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
              </div>

              <div class="space-y-1 flex-1">
                <h3 class="font-medium text-sm">
                  <span
                    class="group-hover:underline text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 flex items-center space-x-2"
                  >
                    <a
                      :href="`https://mblessed.hashnode.dev/${post.node.slug}`"
                      target="_blank"
                      rel="noopener"
                      class="line-clamp-1"
                      @click.stop
                    >
                      {{ post.node.title }}
                    </a>
                    <span
                      class="transition-transform duration-200 group-hover:rotate-90 flex-shrink-0"
                    >
                      <svg
                        class="inline w-4 h-4 text-zinc-400"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        viewBox="0 0 16 16"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M6 4l4 4-4 4"
                        />
                      </svg>
                    </span>
                  </span>
                </h3>
                <p
                  class="block text-sm text-zinc-500 dark:text-zinc-400 line-clamp-1"
                >
                  <span v-if="post.node.subtitle">{{
                    post.node.subtitle
                  }}</span>
                  <span v-else-if="post.node.brief">{{
                    truncateText(post.node.brief, 80)
                  }}</span>
                </p>
                <p class="block text-xs text-zinc-400 dark:text-zinc-500">
                  {{ post.node.views.toLocaleString() }} reads
                </p>
              </div>
            </div>

            <div class="text-right flex-shrink-0">
              <p class="block text-xs text-zinc-500 dark:text-zinc-400">
                {{ formatDate(post.node.publishedAt) }}
              </p>
            </div>
          </div>

          <!-- Dropdown -->
          <Transition name="expand">
            <div
              v-if="openPostDropdown === id"
              class="w-full my-2 bg-zinc-100 dark:bg-zinc-800 rounded-md p-3"
            >
              <div class="space-y-3">
                <div v-if="post.node.coverImage?.url" class="w-full">
                  <img
                    :src="post.node.coverImage.url"
                    :alt="post.node.title"
                    class="w-full h-48 object-cover rounded-md"
                  />
                </div>
                <div
                  v-if="post.node.brief"
                  class="text-sm text-zinc-600 dark:text-zinc-300"
                >
                  {{ post.node.brief }}
                </div>
                <div
                  class="flex justify-between items-center text-xs text-zinc-500 dark:text-zinc-400"
                >
                  <span
                    >Published: {{ formatDate(post.node.publishedAt) }}</span
                  >
                  <span>{{ post.node.views }} views</span>
                </div>
                <a
                  :href="`https://mblessed.hashnode.dev/${post.node.slug}`"
                  target="_blank"
                  rel="noopener"
                  class="inline-flex items-center text-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline transition-colors"
                >
                  Read full article
                  <svg
                    class="w-3 h-3 ml-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </section>
  </section>
</template>

<style>
  @keyframes rough-notation-dash {
    to {
      stroke-dashoffset: 0;
    }
  }
</style>
