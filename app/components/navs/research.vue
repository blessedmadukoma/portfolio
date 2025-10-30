<script lang="ts" setup>
  import { RESEARCH_PAPERS } from "~/data/research";

  const papers = ref(RESEARCH_PAPERS);

  // Sort papers: in-progress first, then published
  const sortedPapers = computed(() => {
    return [...papers.value].sort((a, b) => {
      if (a.status === "in-progress" && b.status === "published") return -1;
      if (a.status === "published" && b.status === "in-progress") return 1;
      return 0;
    });
  });
</script>

<template>
  <section class="space-y-3 mt-4">
    <div
      v-for="(paper, id) in sortedPapers"
      :key="id"
      class="space-y-2 py-3 px-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 transition-colors"
    >
      <div class="space-y-2">
        <div class="flex justify-between items-start">
          <h3 class="text-[15px] font-semibold flex-1">
            {{ paper.title }}
            <span v-if="paper.arxivUrl">
              [<a
                :href="paper.arxivUrl"
                target="_blank"
                rel="noopener"
                class="text-blue-600 dark:text-blue-400 hover:underline"
                >ArXiv</a
              >]</span
            >
          </h3>

          <span
            v-if="paper.status === 'in-progress'"
            class="ml-3 px-2 py-1 text-xs font-medium rounded-full bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400 whitespace-nowrap"
          >
            In Progress
          </span>
          <span
            v-else
            class="ml-3 px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 whitespace-nowrap"
          >
            Published
          </span>
        </div>

        <p class="text-xs text-gray-600 dark:text-gray-400 italic">
          {{ paper.authors.join(", ") }}
        </p>

        <div
          v-if="paper.status === 'published'"
          class="text-xs text-gray-500 dark:text-gray-400"
        >
          <p>
            <span class="font-medium">{{ paper.venue }}</span>
            <span v-if="paper.location"> · {{ paper.location }}</span>
          </p>
          <p v-if="paper.date">{{ paper.date }}</p>
        </div>

        <p class="text-sm text-gray-600 dark:text-gray-400">
          {{ paper.abstract }}
        </p>

        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="tag in paper.tags"
            :key="tag"
            class="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          >
            {{ tag }}
          </span>
        </div>

        <div v-if="paper.pdfUrl" class="text-xs space-x-10">
          <a
            :href="paper.pdfUrl"
            target="_blank"
            rel="noopener"
            class="text-blue-600 dark:text-blue-400 hover:underline"
          >
            View Paper →
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
