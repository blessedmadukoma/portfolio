<script lang="ts" setup>
  import {
    THOUGHT_CATEGORIES,
    type ThoughtCategory,
    normalizeObsidianPost,
    useNativePosts,
  } from "~/composables/useBlogPosts";

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
  const recentWriting = computed(() => normalizedObsidian.value.slice(0, 3));

  const collections = (Object.entries(THOUGHT_CATEGORIES) as Array<
    [ThoughtCategory, (typeof THOUGHT_CATEGORIES)[ThoughtCategory]]
  >).map(([category, details]) => ({
    category,
    ...details,
    to: `/blog?category=${category}`,
  }));
</script>

<template>
  <section id="writing" class="space-y-3 mr-6">
    <section class="space-y-2">
      <h2 class="flex justify-between items-center">
        <span
          class="hidden md:block py-2 text-sm text-zinc-600 dark:text-zinc-400"
        >
          Selected writing on research, agent systems, software engineering,
          and data systems.
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
          Browse by topic or open the complete archive.
        </span>

        <NuxtLink
          to="/blog"
          class="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 underline transition-colors py-2"
        >
          All Posts ({{ normalizedObsidian.length }})
        </NuxtLink>
      </h2>

      <div class="grid gap-2 md:grid-cols-3">
        <NuxtLink
          v-for="collection in collections"
          :key="collection.category"
          :to="collection.to"
          class="rounded-lg border border-zinc-200 p-3 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
        >
          <h3 class="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            {{ collection.label }}
          </h3>
          <p class="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            {{ collection.description }}
          </p>
        </NuxtLink>
      </div>

      <h3 class="pt-2 text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        Recent writing
      </h3>
      <NavsBlogPostItem
        v-for="post in recentWriting"
        :key="post.id"
        :post="post"
      />
    </section>
  </section>
</template>
