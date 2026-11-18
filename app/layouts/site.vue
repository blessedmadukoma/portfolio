<script setup lang="ts">
  import { PAGE_WIDTHS, type PageWidth } from "~/data/site-nav";

  const route = useRoute();
  const widthClass = computed(
    () => PAGE_WIDTHS[(route.meta.width as PageWidth | undefined) ?? "6xl"],
  );
</script>

<template>
  <div
    class="flex min-h-dvh flex-col bg-white text-zinc-900 theme-transition dark:bg-zinc-950 dark:text-zinc-100"
  >
    <ui-site-header :width-class="widthClass" />
    <main class="mx-auto w-full flex-1 px-4" :class="widthClass">
      <slot />
    </main>
    <div class="mx-auto w-full px-4 pb-4 pt-8" :class="widthClass">
      <ui-footer />
    </div>
  </div>
</template>
