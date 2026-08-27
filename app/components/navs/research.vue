<script lang="ts" setup>
  import { RESEARCH_PAPERS, RESEARCH_PROJECTS } from "~/data/research";

  const papers = ref(RESEARCH_PAPERS);
  const projects = ref(RESEARCH_PROJECTS);
  const activeSection = ref<"projects" | "publications">("projects");

  const sortedPapers = computed(() => {
    return [...papers.value].sort((a, b) => {
      if (a.status === "in-progress" && b.status === "published") return -1;
      if (a.status === "published" && b.status === "in-progress") return 1;
      return 0;
    });
  });
</script>

<template>
  <section class="space-y-4 mt-0">
    <section class="space-y-3">
      <div class="inline-flex rounded-lg border border-zinc-200 bg-zinc-50 p-1 dark:border-zinc-800 dark:bg-zinc-900/50">
        <button
          class="rounded-md px-3 py-1.5 text-xs transition-colors"
          :class="activeSection === 'projects' ? 'bg-white font-medium text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100' : 'text-zinc-500 dark:text-zinc-400'"
          @click="activeSection = 'projects'"
        >
          Projects ({{ projects.length }})
        </button>
        <button
          class="rounded-md px-3 py-1.5 text-xs transition-colors"
          :class="activeSection === 'publications' ? 'bg-white font-medium text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100' : 'text-zinc-500 dark:text-zinc-400'"
          @click="activeSection = 'publications'"
        >
          Publications ({{ papers.length }})
        </button>
      </div>

      <template v-if="activeSection === 'projects'">
      <div>
        <h2 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Research projects
        </h2>
        <p class="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          Completed empirical work, including findings that did not justify a method claim.
        </p>
      </div>

      <div
        v-for="project in projects"
        :key="project.title"
        class="space-y-3 rounded-lg border border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/50"
      >
        <div class="flex items-start justify-between gap-3">
          <h3 class="text-sm font-medium leading-snug text-zinc-900 dark:text-zinc-100">
            {{ project.title }}
          </h3>
          <span class="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/30 dark:text-amber-400">
            {{ project.status }}
          </span>
        </div>
        <p class="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {{ project.summary }}
        </p>
        <p class="border-l-2 border-zinc-300 pl-3 text-sm leading-relaxed text-zinc-700 dark:border-zinc-600 dark:text-zinc-300">
          <strong>Finding:</strong> {{ project.finding }}
        </p>
        <div class="flex flex-wrap gap-1.5">
          <span
            v-for="tag in project.tags"
            :key="tag"
            class="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
          >
            {{ tag }}
          </span>
        </div>
      </div>
      </template>
    </section>

    <template v-if="activeSection === 'publications'">
      <div>
        <h2 class="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Publications
        </h2>
        <p class="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
          Peer-reviewed work and formal research outputs.
        </p>
      </div>
    <div
      v-for="(paper, id) in sortedPapers"
      :key="id"
      class="space-y-3 py-4 px-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm transition-all duration-300 ease-out"
    >
      <!-- Title + status badge -->
      <div class="flex justify-between items-start gap-3">
        <h3
          class="text-sm font-medium text-zinc-900 dark:text-zinc-100 flex-1 leading-snug"
        >
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
          class="flex-shrink-0 px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 whitespace-nowrap"
        >
          Published
        </span>
      </div>

      <!-- Authors -->
      <p class="text-xs text-zinc-500 dark:text-zinc-400 italic !mt-0.5">
        <template v-for="(author, idx) in paper.authors" :key="idx">
          <strong
            v-if="author === 'Blessed Madukoma'"
            class="font-semibold text-zinc-700 dark:text-zinc-300"
            >*{{ author }}</strong
          >
          <span v-else>{{ author }}</span>
          <span v-if="idx < paper.authors.length - 1">, </span>
        </template>
      </p>

      <!-- Venue (published only) -->
      <div
        v-if="paper.status === 'published'"
        class="text-xs text-zinc-500 dark:text-zinc-400 !mt-1"
      >
        <p>
          <span class="font-medium">{{ paper.conference }}</span>
          <span v-if="paper.location"> · {{ paper.location }}</span>
          <span v-if="paper.date"> · {{ paper.date }}.</span>
        </p>
      </div>

      <!-- Abstract -->
      <p
        class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed !mt-0.5"
        v-html="paper.abstract"
      ></p>

      <!-- Tags -->
      <div class="flex flex-wrap gap-1.5 !mt-1">
        <span
          v-for="tag in paper.tags"
          :key="tag"
          class="text-xs px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
        >
          {{ tag }}
        </span>
      </div>

      <!-- PDF link -->
      <div v-if="paper.pdfUrl">
        <a
          :href="paper.pdfUrl"
          target="_blank"
          rel="noopener"
          class="inline-flex items-center gap-1 text-xs font-medium px-3 py-1.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          View Paper →
        </a>
      </div>
    </div>
    </template>
  </section>
</template>
