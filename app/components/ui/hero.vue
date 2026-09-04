<script setup lang="ts">
  const colorMode = useColorMode();

  const isDark = computed(() => colorMode.value === "dark");

  const toggleTheme = () => {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  };

  const showModal = ref(false);
  const showMap = ref(false);
</script>

<template>
  <section>
    <h1
      class="text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center justify-between mb-4"
    >
      <span>Hi👋🏿, I'm Blessed</span>
      <button
        @click="toggleTheme"
        class="w-8 h-8 flex items-center justify-center rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-300 dark:border-zinc-600 focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500 transition-colors duration-200 cursor-pointer"
        :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
      >
        <icons-sun class="hidden dark:block" />
        <icons-moon class="block dark:hidden" />
      </button>
    </h1>

    <div
      class="space-y-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed"
    >
      <p>
        I’m a software engineer and systems researcher exploring
        <strong>infrastructure for AI agents</strong> that operate over real
        data, tools, and services. My aim is to enable people to delegate
        data-intensive work while keeping execution controlled and results
        supported as the system changes.
      </p>
      <p>
        My research on
        <a
          class="underline text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400"
          href="https://athletics-performance.mblessed.space"
          target="_blank"
          rel="noopener noreferrer"
        >
          athletics performance anomaly detection</a
        >
        shaped this interest in evidence and reliability. Alongside my research,
        I’m building
        <a
          href="https://sedge.app"
          target="_blank"
          rel="noopener noreferrer"
          class="underline text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400"
          >Sedge</a
        >, a platform for building reliable, data-driven applications.
      </p>
      <p>
        <button
          @click="showModal = true"
          class="underline text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 font-medium"
        >
          Read my research statement
        </button>
        or see
        <button
          @click="showMap = true"
          class="underline text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 font-medium"
        >
          how I think about my work</button
        >.
      </p>
    </div>

    <ui-research-statement v-if="showModal" @close="showModal = false" />
    <ui-research-map v-if="showMap" @close="showMap = false" />
  </section>
</template>
