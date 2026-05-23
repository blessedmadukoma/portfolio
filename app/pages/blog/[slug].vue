<script setup lang="ts">
  import { formatDate } from "~/composables/useBlogPosts";

  const route = useRoute();
  const slug = route.params.slug as string;

  const { data: post } = await useAsyncData(`blog-${slug}`, async () => {
    const bySlug = await queryCollection("blog")
      .where("slug", "=", slug)
      .first();
    if (bySlug) return bySlug;
    return queryCollection("blog")
      .where("stem", "LIKE", `%/${slug}`)
      .first();
  });

  if (!post.value) {
    throw createError({ statusCode: 404, statusMessage: "Post not found" });
  }

  const { views, recordView } = usePostViews(slug);
  onMounted(recordView);

  useHead({
    title: post.value ? `${post.value.title} | BM` : "Post | BM",
  });
</script>

<template>
  <section class="min-h-screen py-8">
    <div class="max-w-2xl mx-auto w-full px-4 py-6 space-y-6">
      <!-- Back link -->
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

      <!-- Post header -->
      <div v-if="post" class="space-y-2">
        <div
          class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500"
        >
          <icons-obsidian />
          Obsidian
        </div>
        <h1 class="text-2xl font-semibold text-zinc-900 dark:text-zinc-100">
          {{ post.title }}
        </h1>
        <div class="flex items-center gap-1.5 text-sm text-zinc-500 dark:text-zinc-400">
          <span v-if="post.date">{{ formatDate(post.date as string) }}</span>
          <span v-if="post.date && (post.readingTime || views)">·</span>
          <span v-if="post.readingTime">{{ post.readingTime }} min read</span>
          <span v-if="post.readingTime && views">·</span>
          <span v-if="views">{{ views }} {{ views === 1 ? 'view' : 'views' }}</span>
        </div>
      </div>

      <!-- Post content -->
      <article
        v-if="post"
        class="prose prose-zinc dark:prose-invert max-w-none"
      >
        <ContentRenderer :value="post" />
      </article>
    </div>
  </section>
</template>
