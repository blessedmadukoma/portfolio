<script setup lang="ts">
  const colorMode = useColorMode();

  function toggleTheme() {
    colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
  }
</script>

<template>
  <button
    type="button"
    class="relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-zinc-200 text-zinc-600 transition-colors before:absolute before:-inset-1 before:content-[''] hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-950"
    :aria-label="`Switch to ${colorMode.value === 'dark' ? 'light' : 'dark'} mode`"
    :title="`Switch to ${colorMode.value === 'dark' ? 'light' : 'dark'} mode`"
    @click="toggleTheme"
  >
    <icons-sun class="hidden dark:block" aria-hidden="true" />
    <icons-moon class="block dark:hidden" aria-hidden="true" />
  </button>
</template>
