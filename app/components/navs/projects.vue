<script lang="ts" setup>
  import { PROJECTS } from "~/data/projects";
  import { TOOLS } from "~/data/tools";

  const projects = ref(PROJECTS);
  const tools = ref(TOOLS);
</script>
<template>
  <section class="space-y-3 mt-4">
    <!-- <h2 class="text-sm tracking-wide">
      <span class="font-bold">Why I build: </span>
      <span
        >I build because... For more projects, visit my
        <a
          class="underline"
          target="_blank"
          href="https://github.com/blessemadukoma"
          >GitHub</a
        ></span
      >
    </h2> -->

    <div
      v-for="(project, id) in projects"
      :key="id"
      class="space-y-1 flex items-start space-x-3 py-2 rounded-lg"
    >
      <ui-img :img-url="project.imageURL" />

      <div class="px-2 space-y-2">
        <div class="flex justify-between items-center">
          <h3 class="text-[15px] font-semibold">
            {{ project.title }}
          </h3>

          <p class="text-xs text-gray-500 dark:text-gray-400 space-x-2">
            <span v-if="project.github">
              <a
                :href="project.github"
                target="_blank"
                rel="noopener"
                class="underline hover:text-gray-600 dark:hover:text-gray-300"
                >GitHub</a
              >
            </span>
            <span v-if="project.live">
              <a
                :href="project.live"
                target="_blank"
                rel="noopener"
                class="underline hover:text-gray-600 dark:hover:text-gray-300"
                >Live</a
              >
            </span>
          </p>
        </div>

        <p class="text-sm text-gray-600 dark:text-gray-400">
          {{ project.description }}
        </p>

        <p class="text-xs text-gray-600 dark:text-gray-300">
          <span v-for="(tech, idx) in project.technologies" :key="tech">
            <template
              v-if="
                tools.find((t) => t.name.toLowerCase() === tech.toLowerCase())
              "
            >
              <img
                :src="
                  tools.find((t) => t.name.toLowerCase() === tech.toLowerCase())
                    ?.image
                "
                alt="Tool Image"
                class="inline-block w-4 h-4"
              />
              {{ tech }}
            </template>
            <template v-else>
              {{ tech }}
            </template>
            <span v-if="idx < project.technologies.length - 1">, </span>
          </span>
        </p>
      </div>
    </div>
  </section>
</template>
Projects
