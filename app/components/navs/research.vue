<script lang="ts" setup>
  import { RESEARCH_PAPERS } from "~/data/research";

  const papers = ref(RESEARCH_PAPERS);

  const sortedPapers = computed(() => {
    return [...papers.value].sort((a, b) => {
      if (a.status === "in-progress" && b.status === "published") return -1;
      if (a.status === "published" && b.status === "in-progress") return 1;
      return 0;
    });
  });
</script>

<template>
  <section class="space-y-4 mt-4">
    <div
      v-for="(paper, id) in sortedPapers"
      :key="id"
      class="space-y-3 py-4 px-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all duration-300 ease-out"
    >
      <!-- Title + status badge -->
      <div class="flex justify-between items-start gap-3">
        <h3 class="text-sm font-medium text-zinc-900 dark:text-zinc-100 flex-1 leading-snug">
          {{ paper.title }}
          <span v-if="paper.arxivUrl">
            [<a
              :href="paper.arxivUrl"
              target="_blank"
              rel="noopener"
              class="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline transition-colors"
              >ArXiv</a
            >]
          </span>
        </h3>

        <span
          v-if="paper.status === 'in-progress'"
          class="flex-shrink-0 px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 whitespace-nowrap"
        >
          In Progress
        </span>
        <span
          v-else
          class="flex-shrink-0 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 whitespace-nowrap"
        >
          Published
        </span>
      </div>

      <!-- Authors -->
      <p class="text-xs text-zinc-500 dark:text-zinc-400 italic">
        {{ paper.authors.join(", ") }}
      </p>

      <!-- Venue (published only) -->
      <div v-if="paper.status === 'published'" class="text-xs text-zinc-500 dark:text-zinc-400">
        <p>
          <span class="font-medium">{{ paper.venue }}</span>
          <span v-if="paper.location"> · {{ paper.location }}</span>
        </p>
        <p v-if="paper.date">{{ paper.date }}</p>
      </div>

      <!-- Abstract -->
      <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed" v-html="paper.abstract"></p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-1.5">
        <span
          v-for="tag in paper.tags"
          :key="tag"
          class="text-xs px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
        >
          {{ tag }}
        </span>
      </div>

      <!-- PDF link -->
      <div v-if="paper.pdfUrl" class="text-xs">
        <a
          :href="paper.pdfUrl"
          target="_blank"
          rel="noopener"
          class="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 hover:underline transition-colors"
        >
          View Paper →
        </a>
      </div>
    </div>
  </section>
</template>
