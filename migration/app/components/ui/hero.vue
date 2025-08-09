<script setup>
  const colorMode = useColorMode();

  const toggleTheme = () => {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  };
</script>

<template>
  <section>
    <h1
      class="my-4 text-lg font-medium tracking-tight flex items-baseline justify-between"
    >
      <span class="">Hi👋🏿, I'm Blessed</span>

      <button
        @click="toggleTheme"
        class="rounded-lg transition-colors cursor-pointer"
        :aria-label="`Switch to ${
          colorMode.value === 'dark' ? 'light' : 'dark'
        } mode`"
      >
        <!-- Sun icon -->
        <div v-if="colorMode.value === 'dark'">
          <icons-sun />
        </div>
        <div v-else><icons-moon /></div>
      </button>
    </h1>

    <p class="text-sm text-gray-700 dark:text-gray-400">
      A product engineer with 3+ years building enterprise scalable systems,
      predictive models and statistical solutions that improve operational
      efficiency. Currently building
      <a
        href="https://sedge.app"
        target="_blank"
        class="underline text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400"
        >Sedge</a
      >

      and BudgetSmart.
    </p>
  </section>
</template>
