<script setup lang="ts">
  import { formatDate, obsidianImageToProxy } from "~/composables/useBlogPosts";

  definePageMeta({
    validate: async (route) => {
      const slug = route.params.slug as string;
      const bySlug = await queryCollection("blog")
        .where("slug", "=", slug)
        .first();
      if (bySlug) return true;
      const byStem = await queryCollection("blog")
        .where("stem", "LIKE", `%/${slug}`)
        .first();
      if (byStem) return true;
      return { statusCode: 404, statusMessage: "Post not found" };
    },
  });

  const route = useRoute();
  const slug = route.params.slug as string;
  const isCoverImageFocused = ref(false);

  // Not awaited: Vue's SSR renderer still resolves this via onServerPrefetch
  // before calling this component's render function (same pattern as
  // navs/blog.vue), keeping this component's setup() synchronous and
  // avoiding the async-setup-component + implicit <Suspense> hydration
  // fragility. Existence is already guaranteed by `validate` above.
  const { data: post } = useAsyncData(`blog-${slug}`, async () => {
    const bySlug = await queryCollection("blog")
      .where("slug", "=", slug)
      .first();
    if (bySlug) return bySlug;
    return queryCollection("blog")
      .where("stem", "LIKE", `%/${slug}`)
      .first();
  });

  const { views, recordView } = usePostViews(slug);
  let viewTimer: ReturnType<typeof setTimeout> | undefined;
  onNuxtReady(() => {
    viewTimer = window.setTimeout(recordView, 5_000);
  });
  onBeforeUnmount(() => {
    if (viewTimer) window.clearTimeout(viewTimer);
  });

  useHead({
    title: () => (post.value ? `${post.value.title} | BM` : "Post | BM"),
  });
</script>

<template>
  <section class="min-h-screen">
    <ui-blog-navigation back-to="/blog" back-label="All posts" wide />
    <div class="max-w-5xl mx-auto w-full px-4 py-8">
      <div class="md:grid md:grid-cols-[200px_1fr] md:gap-10">
        <!-- The reading controls stay in the top bar; the sidebar holds the TOC. -->
        <div class="hidden md:block md:sticky md:top-24 md:self-start">
          <ui-table-of-contents :links="post?.body?.toc?.links ?? []" />
        </div>

        <div class="max-w-2xl space-y-6">
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
              <span v-if="post.date">·</span>
              <span v-if="post.readingTime">{{ post.readingTime }} min read</span>
              <!-- <span>{{ views ?? 0 }} {{ (views ?? 0) === 1 ? 'view' : 'views' }}</span> -->
            </div>
          </div>

          <!-- Cover image -->
          <button
            v-if="post?.image"
            type="button"
            class="block w-full cursor-zoom-in"
            :aria-label="`Focus image: ${post.title}`"
            @click="isCoverImageFocused = true"
          >
            <img
              :src="obsidianImageToProxy(post.image as string)"
              :alt="post.title"
              class="block h-auto w-full rounded-lg border border-zinc-200 dark:border-zinc-700"
            />
          </button>

          <!-- Post content -->
          <article
            v-if="post"
            class="prose prose-zinc dark:prose-invert max-w-none prose-headings:scroll-mt-24 prose-a:[overflow-wrap:anywhere]"
          >
            <ContentRenderer :value="post" />
          </article>
        </div>
      </div>
    </div>

    <ui-image-modal
      v-if="post?.image && isCoverImageFocused"
      :src="obsidianImageToProxy(post.image as string)"
      :alt="post.title"
      @close="isCoverImageFocused = false"
    />
  </section>
</template>
