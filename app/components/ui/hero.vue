<script setup lang="ts">
  const colorMode = useColorMode();

  const isDark = computed(() => {
    if (import.meta.client) {
      return colorMode.value === "dark";
    }
    return true; // Default to dark on server to match client initial render
  });

  const toggleTheme = () => {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  };

  const showModal = ref(false);
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
        <icons-sun v-if="isDark" />
        <icons-moon v-else />
      </button>
    </h1>

    <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
      <span>
        Systems-focused software engineer
        <b>building reliable and observable data systems</b>. I work across Go
        (systems) and Python (modeling), designing pipelines and infrastructure
        that make complex data measurable, trustworthy, and operational in
        production environments. My current work focuses on athletics
        performance
        <a
          class="underline text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400"
          href="https://athletics-performance.mblessed.space"
          target="_blank"
        >
          anomaly detection</a
        >
        (research) and
        <a
          href="https://sedge.app"
          target="_blank"
          class="underline text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400"
          >Sedge</a
        >
        (data-intelligence platform) for building observable data products.
      </span>
      <br />
      <span>
        Interested in how systems behave after deployment?
        <button
          @click="showModal = true"
          class="ml-1 underline text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 font-medium"
        >
          View my research statement
        </button>
      </span>
    </p>

    <!-- <p class="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
      <span>
        Product engineer focused on intelligent data systems: combining data
        systems, ML, and statistical modeling to solve high-stakes analytical
        problems. I work across Go (systems) and Python (modeling); my current
        work focuses on sports performance
        <a
          class="underline text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400"
          href="https://athletics-performance.mblessed.space"
          target="_blank"
        >
          anomaly detection</a
        >
        (research) and
        <a
          href="https://sedge.app"
          target="_blank"
          class="underline text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400"
          >Sedge</a
        >, a data intelligence platform.
      </span>
      <br />
      <span>
        Interested in my research philosophy?
        <button
          @click="showModal = true"
          class="ml-1 underline text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 font-medium"
        >
          View my research statement
        </button>
      </span>
    </p> -->

    <ui-research-statement v-if="showModal" @close="showModal = false" />
  </section>
</template>
