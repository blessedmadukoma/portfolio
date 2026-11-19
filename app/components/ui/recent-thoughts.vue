<script setup lang="ts">
  import {
    normalizeObsidianPost,
    useNativePosts,
  } from "~/composables/useBlogPosts";

  // Not awaited, for the same hydration reason as the blog pages.
  const { data: nativePosts } = useNativePosts();
  const recent = computed(() =>
    (nativePosts.value ?? []).slice(0, 4).map(normalizeObsidianPost),
  );

  const formatShort = (value: string) => {
    if (!value) return "";
    const date = new Date(
      /^\d{4}-\d{2}-\d{2}$/.test(value) ? `${value}T00:00:00` : value,
    );
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };
</script>

<template>
  <section aria-labelledby="recent-thoughts" class="space-y-3">
    <h2
      id="recent-thoughts"
      class="font-mono text-xs uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
    >
      Recent thoughts
    </h2>
    <ul class="divide-y divide-zinc-200 dark:divide-zinc-800">
      <li v-for="post in recent" :key="post.id">
        <NuxtLink
          :to="post.href"
          class="group flex items-baseline justify-between gap-4 py-3"
        >
          <span
            class="text-[15px] text-zinc-800 underline decoration-zinc-300 underline-offset-4 group-hover:decoration-current dark:text-zinc-200 dark:decoration-zinc-700 md:text-sm"
          >
            {{ post.title }}
          </span>
          <time
            :datetime="post.date"
            class="shrink-0 font-mono text-xs text-zinc-500 dark:text-zinc-400"
          >
            {{ formatShort(post.date) }}
          </time>
        </NuxtLink>
      </li>
    </ul>
    <NuxtLink
      to="/blog"
      class="inline-block font-mono text-xs text-zinc-600 underline underline-offset-4 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
    >
      All thoughts
    </NuxtLink>
  </section>
</template>
