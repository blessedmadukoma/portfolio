<script setup lang="ts">
  import { normalizeObsidianPost, useNativePosts } from "~/composables/useBlogPosts";

  const { data: nativePosts } = useNativePosts();
  const { data: viewCounts } = useFetch<Record<string, number>>("/api/views");

  const posts = computed(() =>
    (nativePosts.value ?? []).map((post) => {
      const normalized = normalizeObsidianPost(post);
      return { ...normalized, views: viewCounts.value?.[normalized.slug] };
    }),
  );

  useHead({
    title: "Thoughts | Blessed Madukoma",
    meta: [
      {
        name: "description",
        content: "Articles by Blessed Madukoma.",
      },
    ],
  });
</script>

<template>
  <main class="min-h-screen py-8">
    <section class="max-w-3xl mx-auto w-full px-4 py-6">
      <header class="mb-6 space-y-4">
        <NuxtLink
          to="/"
          class="inline-flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M19 12H5" />
            <path d="m12 5-7 7 7 7" />
          </svg>
          Back
        </NuxtLink>

        <div class="flex items-center justify-between gap-4">
          <h1 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
            Thoughts
          </h1>

          <span class="text-xs text-zinc-500 dark:text-zinc-400">
            {{ posts.length }} published
          </span>
        </div>
      </header>

      <NavsBlogPostItem
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </section>
  </main>
</template>
