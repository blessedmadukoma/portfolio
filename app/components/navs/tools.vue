<script lang="ts" setup>
  import { TOOLS, TOOL_CATEGORIES } from "~/data/tools";

  // Remove duplicates by name
  const uniqueTools = TOOLS.filter(
    (tool, index, self) =>
      index === self.findIndex((t) => t.name === tool.name),
  );

  const groupedTools = computed(() =>
    TOOL_CATEGORIES.map((category) => ({
      ...category,
      tools: uniqueTools.filter((tool) => tool.category === category.key),
    })).filter((group) => group.tools.length > 0),
  );
</script>

<template>
  <section class="mt-3 grid grid-cols-1 gap-7 md:mt-2 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
    <section v-for="group in groupedTools" :key="group.key" class="space-y-3 md:space-y-1">
      <h2 class="text-[15px] font-semibold text-zinc-900 dark:text-zinc-100 md:text-base md:font-bold">{{ group.label }}</h2>
      <div class="flex flex-wrap gap-x-5 gap-y-3 md:-ml-2 md:gap-2">
        <a
          v-for="tool in group.tools"
          :key="tool.name"
          :href="tool.URL"
          target="_blank"
          rel="noopener"
          class="group flex items-center gap-2 rounded-lg transition-colors hover:bg-gray-100 dark:hover:bg-gray-800 md:py-2 md:pl-2 md:pr-3"
        >
          <img
            :src="tool.image"
            :alt="tool.name"
            class="h-[18px] w-[18px] shrink-0 object-contain md:h-5 md:w-5"
            :class="{ 'dark:brightness-0 dark:invert': tool.darkInvert }"
            loading="lazy"
          />
          <span
            class="text-[15px] leading-6 text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100 md:text-sm md:leading-5"
          >
            {{ tool.name }}
          </span>
        </a>
      </div>
    </section>
  </section>
</template>
