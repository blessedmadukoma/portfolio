<template>
  <section class="space-y-6 mt-2">
    <!-- Languages Section -->
    <section class="space-y-3">
      <h2 class="font-bold text-lg">Languages</h2>
      <div class="flex flex-wrap gap-4">
        <a
          v-for="tool in languageTools"
          :key="tool.name"
          :href="tool.URL"
          target="_blank"
          rel="noopener"
          class="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
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

    <!-- Frameworks & Libraries Section -->
    <section class="space-y-3">
      <h2 class="font-bold text-lg">Frameworks & Libraries</h2>
      <div class="flex flex-wrap gap-4">
        <a
          v-for="tool in frameworkTools"
          :key="tool.name"
          :href="tool.URL"
          target="_blank"
          rel="noopener"
          class="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
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

    <!-- Cloud & Infrastructure Section -->
    <section class="space-y-3">
      <h2 class="font-bold text-lg">Cloud & Infrastructure</h2>
      <div class="flex flex-wrap gap-4">
        <a
          v-for="tool in cloudTools"
          :key="tool.name"
          :href="tool.URL"
          target="_blank"
          rel="noopener"
          class="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
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

    <!-- Databases Section -->
    <section class="space-y-3">
      <h2 class="font-bold text-lg">Databases</h2>
      <div class="flex flex-wrap gap-4">
        <a
          v-for="tool in databaseTools"
          :key="tool.name"
          :href="tool.URL"
          target="_blank"
          rel="noopener"
          class="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
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

    <!-- Data Science & ML Section -->
    <section class="space-y-3">
      <h2 class="font-bold text-lg">Data Science & ML</h2>
      <div class="flex flex-wrap gap-4">
        <a
          v-for="tool in dataTools"
          :key="tool.name"
          :href="tool.URL"
          target="_blank"
          rel="noopener"
          class="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
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

    <!-- Development Tools Section -->
    <section class="space-y-3">
      <h2 class="font-bold text-lg">Development Tools</h2>
      <div class="flex flex-wrap gap-4">
        <a
          v-for="tool in devTools"
          :key="tool.name"
          :href="tool.URL"
          target="_blank"
          rel="noopener"
          class="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
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

<script lang="ts" setup>
  import { TOOLS } from "~/data/tools";

  // Remove duplicates by name
  const uniqueTools = TOOLS.filter(
    (tool, index, self) => index === self.findIndex((t) => t.name === tool.name)
  );

  // Categorize tools
  const languageTools = computed(() =>
    uniqueTools.filter((tool) =>
      ["Go", "Python", "Javascript", "Typescript", "PHP"].includes(tool.name)
    )
  );

  const frameworkTools = computed(() =>
    uniqueTools.filter((tool) =>
      [
        "VueJS",
        "Nuxt",
        "React",
        "NextJS",
        "NestJS",
        "TailwindCSS",
        "ExpressJS",
        "Laravel",
        // "Svelte",
      ].includes(tool.name)
    )
  );

  const cloudTools = computed(() =>
    uniqueTools.filter((tool) =>
      ["Docker", "Firebase", "GitHub Actions"].includes(tool.name)
    )
  );

  const databaseTools = computed(() =>
    uniqueTools.filter((tool) =>
      ["PostgreSQL", "MySQL", "MongoDB", "Redis"].includes(tool.name)
    )
  );

  const dataTools = computed(() =>
    uniqueTools.filter((tool) =>
      ["Airflow", "Pandas", "Streamlit", "scikit-learn", "Plotly"].includes(
        tool.name
      )
    )
  );

  const devTools = computed(() =>
    uniqueTools.filter((tool) => ["Git", "NodeJS"].includes(tool.name))
  );
</script>
