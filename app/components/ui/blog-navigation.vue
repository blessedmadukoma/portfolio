<script setup lang="ts">
  withDefaults(
    defineProps<{
      backTo: string;
      backLabel: string;
      wide?: boolean;
    }>(),
    { wide: false },
  );
</script>

<template>
  <header
    class="sticky top-0 z-30 border-b border-zinc-200 bg-white/95 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/95"
  >
    <nav
      aria-label="Blog navigation"
      class="mx-auto flex h-16 w-full items-center justify-between gap-3 px-4"
      :class="wide ? 'max-w-5xl' : 'max-w-3xl'"
    >
      <NuxtLink
        :to="backTo"
        class="link-out inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-sm py-1 text-sm font-medium text-blue-600 underline decoration-blue-600/30 underline-offset-4 transition-colors hover:text-blue-700 hover:decoration-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:text-blue-400 dark:decoration-blue-400/30 dark:hover:text-blue-300 dark:focus-visible:ring-offset-zinc-950"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.8"
          stroke-linecap="round"
          stroke-linejoin="round"
          aria-hidden="true"
        >
          <path d="M19 12H5" />
          <path d="m12 5-7 7 7 7" />
        </svg>
        {{ backLabel }}
      </NuxtLink>

      <ui-theme-toggle />
    </nav>
  </header>
</template>
