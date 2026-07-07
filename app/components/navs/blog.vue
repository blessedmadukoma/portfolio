<script lang="ts" setup>
  import {
    normalizeHashnodePost,
    normalizeObsidianPost,
    useBlogPosts,
    useNativePosts,
  } from "~/composables/useBlogPosts";

  const { posts, pending, error, data } = useBlogPosts();
  // Not awaited: Nuxt still resolves this before finishing the SSR render
  // (see normalizedObsidian's `?? []` below), but not awaiting here avoids
  // making this component an async-setup component, which sidesteps a
  // documented Vue/Nuxt hydration fragility with nested Suspense boundaries.
  const { data: nativePosts } = useNativePosts();
  // Non-blocking: view counts populate reactively after posts render
  const { data: viewCounts } = useFetch<Record<string, number>>("/api/views");

  const normalizedObsidian = computed(() =>
    (nativePosts.value ?? []).map((post) => {
      const normalized = normalizeObsidianPost(post);
      return { ...normalized, views: viewCounts.value?.[normalized.slug] };
    }),
  );
  const normalizedHashnode = computed(() =>
    posts.value.map((e) => normalizeHashnodePost(e.node)),
  );
</script>

<template>
  <section class="space-y-3 mr-6">
    <section class="space-y-2">
      <h2 class="flex justify-between items-center">
        <span
          class="hidden md:block py-2 text-sm text-zinc-600 dark:text-zinc-400"
        >
          I write about software engineering, production AI systems, research,
          and startups.
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
          Writing helps me learn deeply and share what I discover.
        </span>

        <a
          class="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 underline transition-colors py-2"
          target="_blank"
          href="https://mblessed.hashnode.dev"
        >
          View All Posts ({{
            data?.data?.publication?.posts?.edges.length || 0
          }})
        </a>
      </h2>

      <!-- Obsidian/native posts -->
      <NavsBlogPostItem
        v-for="post in normalizedObsidian"
        :key="post.id"
        :post="post"
      />

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
          />
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          />
        </svg>
        <p class="text-zinc-500 dark:text-zinc-400">
          Loading Hashnode posts...
        </p>
      </div>

      <div v-else-if="error" class="py-6 text-center space-y-2">
        <p class="text-sm text-zinc-500 dark:text-zinc-400">
          {{ error.message }}
        </p>
        <a
          href="https://mblessed.hashnode.dev"
          target="_blank"
          class="text-xs underline text-zinc-400 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300 transition-colors"
        >
          View Hashnode posts →
        </a>
      </div>

      <template v-else>
        <NavsBlogPostItem
          v-for="post in normalizedHashnode"
          :key="post.id"
          :post="post"
        />
      </template>
    </section>
  </section>
</template>
