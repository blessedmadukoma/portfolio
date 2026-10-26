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
  const recentWriting = computed(() => normalizedObsidian.value.slice(0, 5));
  const categoryCounts = computed(() =>
    Object.fromEntries(
      (Object.keys(THOUGHT_CATEGORIES) as ThoughtCategory[]).map((category) => [
        category,
        normalizedObsidian.value.filter((post) => post.category === category)
          .length,
      ]),
    ) as Record<ThoughtCategory, number>,
  );

  const collections = (Object.entries(THOUGHT_CATEGORIES) as Array<
    [ThoughtCategory, (typeof THOUGHT_CATEGORIES)[ThoughtCategory]]
  >).map(([category, details]) => ({
    category,
    ...details,
    to: `/blog?category=${category}`,
  }));
</script>

<template>
  <section id="writing" class="space-y-4">
    <section class="space-y-2">
      <header class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="min-w-0 space-y-1">
          <h2 class="text-base font-semibold text-zinc-900 dark:text-zinc-100">
            Writing
          </h2>
          <p class="max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Notes on research, software engineering and data systems.
          </p>
        </div>

        <NuxtLink
          to="/blog"
          class="link-out inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-sm py-1 text-sm font-medium text-blue-600 underline decoration-blue-600/30 underline-offset-4 transition-colors hover:text-blue-700 hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-blue-400 dark:decoration-blue-400/30 dark:hover:text-blue-300 dark:focus-visible:ring-offset-zinc-950 self-start sm:self-center"
        >
          All posts
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </NuxtLink>
      </header>

      <div class="grid gap-2 md:grid-cols-3">
        <NuxtLink
          v-for="collection in collections"
          :key="collection.category"
          :to="collection.to"
          class="rounded-lg border border-zinc-200 p-3 transition-colors hover:border-zinc-400 dark:border-zinc-800 dark:hover:border-zinc-600"
        >
          <h3
            class="flex items-center justify-between gap-2 text-sm font-medium text-zinc-800 dark:text-zinc-200"
          >
            {{ collection.label }}
            <span class="text-xs font-normal text-zinc-500 dark:text-zinc-400">
              {{ categoryCounts[collection.category] }}
            </span>
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
