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
  <section class="mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <section v-for="group in groupedTools" :key="group.key" class="space-y-1">
      <h2 class="font-bold">{{ group.label }}</h2>
      <div class="flex flex-wrap gap-2">
        <a
          v-for="tool in group.tools"
          :key="tool.name"
          :href="tool.URL"
          target="_blank"
          rel="noopener"
          class="flex items-center space-x-2 pr-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
        >
          <img
            :src="tool.image"
            :alt="tool.name"
            class="w-5 h-5 object-contain"
            loading="lazy"
          />
          <span
            class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-gray-900 dark:group-hover:text-gray-100"
          >
            {{ tool.name }}
          </span>
        </a>
      </div>
    </section>
  </section>
</template>
