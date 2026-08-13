<script lang="ts" setup>
  import { normalizeObsidianPost, useNativePosts } from "~/composables/useBlogPosts";

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
</script>

<template>
  <section id="writing" class="space-y-3 mr-6">
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

        <NuxtLink
          to="/blog"
          class="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 underline transition-colors py-2"
        >
          All Posts ({{ normalizedObsidian.length }})
        </NuxtLink>
      </h2>

      <!-- Hashnode is decommissioned; every post is served from Obsidian. -->
      <NavsBlogPostItem
        v-for="post in normalizedObsidian"
        :key="post.id"
        :post="post"
      />
    </section>
  </section>
</template>
