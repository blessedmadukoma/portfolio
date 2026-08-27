<script setup lang="ts">
  import { normalizeObsidianPost, useNativePosts } from "~/composables/useBlogPosts";

  const { data: nativePosts } = useNativePosts();
  const { data: viewCounts } = useFetch<Record<string, number>>("/api/views");
  const route = useRoute();
  const router = useRouter();

  const allPosts = computed(() =>
    (nativePosts.value ?? []).map((post) => {
      const normalized = normalizeObsidianPost(post);
      return { ...normalized, views: viewCounts.value?.[normalized.slug] };
    }),
  );

  const tags = computed(() =>
    [...new Set(allPosts.value.flatMap((post) => post.tags))].sort((a, b) =>
      a.localeCompare(b),
    ),
  );
  const types = computed(() =>
    [
      ...new Set(
        allPosts.value.flatMap((post) =>
          post.contentType ? [post.contentType] : [],
        ),
      ),
    ].sort(),
  );
  const activeTag = computed(() =>
    typeof route.query.tag === "string" ? route.query.tag : "",
  );
  const activeType = computed(() =>
    typeof route.query.type === "string" ? route.query.type : "",
  );
  const posts = computed(() =>
    allPosts.value.filter(
      (post) =>
        (!activeTag.value || post.tags.includes(activeTag.value)) &&
        (!activeType.value || post.contentType === activeType.value),
    ),
  );

  function setFilter(key: "tag" | "type", value: string) {
    const query = { ...route.query };
    if (value) query[key] = value;
    else delete query[key];
    router.replace({ query });
  }

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
            {{ posts.length }} of {{ allPosts.length }} published
          </span>
        </div>

        <div class="space-y-2">
          <div class="flex flex-wrap gap-2" aria-label="Filter by type">
            <button
              class="rounded-full border px-2.5 py-1 text-xs transition-colors"
              :class="!activeType ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900' : 'border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300'"
              @click="setFilter('type', '')"
            >
              All types
            </button>
            <button
              v-for="type in types"
              :key="type"
              class="rounded-full border px-2.5 py-1 text-xs transition-colors"
              :class="activeType === type ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900' : 'border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300'"
              @click="setFilter('type', activeType === type ? '' : type)"
            >
              {{ type }}
            </button>
          </div>
          <div class="flex flex-wrap gap-2" aria-label="Filter by tag">
            <button
              class="rounded-full border px-2.5 py-1 text-xs transition-colors"
              :class="!activeTag ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900' : 'border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300'"
              @click="setFilter('tag', '')"
            >
              All tags
            </button>
            <button
              v-for="tag in tags"
              :key="tag"
              class="rounded-full border px-2.5 py-1 text-xs transition-colors"
              :class="activeTag === tag ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900' : 'border-zinc-200 text-zinc-600 dark:border-zinc-700 dark:text-zinc-300'"
              @click="setFilter('tag', activeTag === tag ? '' : tag)"
            >
              #{{ tag }}
            </button>
          </div>
        </div>
      </header>

      <p v-if="posts.length === 0" class="text-sm text-zinc-500 dark:text-zinc-400">
        No published posts match these filters.
      </p>

      <NavsBlogPostItem
        v-for="post in posts"
        :key="post.id"
        :post="post"
      />
    </section>
  </main>
</template>
