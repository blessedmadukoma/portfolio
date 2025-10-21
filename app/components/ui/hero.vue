<script setup>
  import { ref, watch } from "vue";

  const colorMode = useColorMode();

  const toggleTheme = () => {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  };

  const showModal = ref(false);

  watch(
    () => colorMode.value,
    (newVal, oldVal) => {},
    { deep: true }
  );
</script>

<template>
  <section>
    <h1
      class="my-4 text-lg font-medium tracking-tight flex items-baseline justify-between"
    >
      <span>Hi👋🏿, I'm Blessed</span>
      <button
        @click="toggleTheme"
        class="rounded-lg transition-colors cursor-pointer"
        :aria-label="`Switch to ${
          colorMode.value === 'dark' ? 'light' : 'dark'
        } mode`"
      >
        <div v-if="colorMode.value === 'dark'">
          <icons-sun />
        </div>
        <div v-else>
          <icons-moon />
        </div>
      </button>
    </h1>

    <p
      class="text-sm tracking-wide text-gray-700 dark:text-gray-400 leading-relaxed"
    >
      <span>
        I'm a product engineer with 3+ years building enterprise-scale systems,
        predictive models, and statistical solutions that improve operational
        efficiency. Currently building
        <a
          href="https://sedge.app"
          target="_blank"
          class="underline text-gray-900 dark:text-gray-100 hover:text-gray-600 dark:hover:text-gray-400"
          >Sedge</a
        >
        and BudgetSmart.
      </span>
      <br />
      <span>
        Interested in my research philosophy?
        <button
          @click="showModal = true"
          class="ml-2 underline text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 font-medium"
        >
          View my research statement
        </button>
      </span>
    </p>

    <div>
      <ui-research-statement v-if="showModal" @close="showModal = false" />
    </div>
  </section>
</template>
