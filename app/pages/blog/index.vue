<script setup lang="ts">
  import {
    THOUGHT_CATEGORIES,
    type ThoughtCategory,
    normalizeObsidianPost,
    postMonth,
    postYear,
    useNativePosts,
  } from "~/composables/useBlogPosts";

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

  const categories = Object.entries(THOUGHT_CATEGORIES) as Array<
    [ThoughtCategory, (typeof THOUGHT_CATEGORIES)[ThoughtCategory]]
  >;
  const activeCategory = computed<ThoughtCategory | "">(() => {
    const value = route.query.category;
    return typeof value === "string" && value in THOUGHT_CATEGORIES
      ? (value as ThoughtCategory)
      : "";
  });
  const activeCategoryDetails = computed(() =>
    activeCategory.value ? THOUGHT_CATEGORIES[activeCategory.value] : null,
  );
  const categoryCounts = computed(() =>
    Object.fromEntries(
      categories.map(([category]) => [
        category,
        allPosts.value.filter((post) => post.category === category).length,
      ]),
    ) as Record<ThoughtCategory, number>,
  );
  const posts = computed(() =>
    allPosts.value.filter(
      (post) => !activeCategory.value || post.category === activeCategory.value,
    ),
  );

  // Posts arrive date-DESC and Map keeps insertion order, so years and months need no re-sort.
  const archive = computed(() => {
    const years = new Map<string, Map<string, typeof posts.value>>();

    for (const post of posts.value) {
      const year = postYear(post.date) || "Undated";
      const month = postMonth(post.date) || "Undated";
      if (!years.has(year)) years.set(year, new Map());
      const months = years.get(year)!;
      if (!months.has(month)) months.set(month, []);
      months.get(month)!.push(post);
    }

    return [...years].map(([year, months]) => ({
      year,
      count: [...months.values()].reduce((total, list) => total + list.length, 0),
      months: [...months].map(([month, monthPosts]) => ({
        month,
        count: monthPosts.length,
        posts: monthPosts,
      })),
    }));
  });

  function setCategory(category: ThoughtCategory | "") {
    const query = { ...route.query };
    if (category) query.category = category;
    else delete query.category;
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
          <div>
            <p
              v-if="activeCategoryDetails"
              class="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400"
            >
              Thoughts
            </p>
            <h1 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              {{ activeCategoryDetails?.label ?? "Thoughts" }}
            </h1>
            <p
              v-if="activeCategoryDetails"
              class="mt-1 text-xs text-zinc-500 dark:text-zinc-400"
            >
              {{ activeCategoryDetails.description }}
            </p>
          </div>

          <span class="text-xs text-zinc-500 dark:text-zinc-400">
            {{ posts.length }} of {{ allPosts.length }} published
          </span>
        </div>

        <div class="grid gap-2 sm:grid-cols-3" aria-label="Browse writing by category">
          <button
            v-for="[category, details] in categories"
            :key="category"
            class="rounded-lg border p-3 text-left transition-colors"
            :class="activeCategory === category ? 'border-zinc-900 bg-zinc-900 text-white dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-900' : 'border-zinc-200 text-zinc-700 hover:border-zinc-400 dark:border-zinc-700 dark:text-zinc-200 dark:hover:border-zinc-500'"
            @click="setCategory(activeCategory === category ? '' : category)"
          >
            <span class="flex items-center justify-between gap-2 text-sm font-medium">
              {{ details.label }}
              <span class="text-xs opacity-70">{{ categoryCounts[category] }}</span>
            </span>
            <span class="mt-1 block text-xs leading-relaxed opacity-75">
              {{ details.description }}
            </span>
          </button>
        </div>
      </header>

      <p v-if="posts.length === 0" class="text-sm text-zinc-500 dark:text-zinc-400">
        No published posts match these filters.
      </p>

      <section
        v-for="group in archive"
        :key="group.year"
        class="border-b border-zinc-200 pb-4 last:border-0 last:pb-0 dark:border-zinc-800"
      >
        <h2
          class="sticky top-0 z-20 -mx-4 flex items-baseline gap-1.5 bg-white/90 px-4 py-2 backdrop-blur dark:bg-zinc-950/90"
        >
          <span class="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            {{ group.year }}
          </span>
          <sup class="text-xs font-normal text-zinc-500 dark:text-zinc-400">
            {{ group.count }}
          </sup>
        </h2>

        <div
          v-for="entry in group.months"
          :key="entry.month"
          class="flex flex-col border-b border-zinc-100 py-2 last:border-0 last:pb-0 md:flex-row md:items-start dark:border-zinc-800/60"
        >
          <h3
            class="mb-1 flex shrink-0 items-baseline gap-1.5 md:mb-0 md:w-24 md:pt-3.5"
          >
            <span class="text-sm text-zinc-600 dark:text-zinc-300">{{ entry.month }}</span>
            <sup class="text-[11px] text-zinc-400 dark:text-zinc-500">{{ entry.count }}</sup>
          </h3>

          <div class="w-full min-w-0">
            <NavsBlogPostItem v-for="post in entry.posts" :key="post.id" :post="post" />
          </div>
        </div>
      </section>
    </section>
  </main>
</template>
