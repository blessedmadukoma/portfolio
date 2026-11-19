<script setup lang="ts">
  import { PAGE_WIDTHS, type PageWidth } from "~/data/site-nav";

  const route = useRoute();
  const widthClass = computed(
    () => PAGE_WIDTHS[(route.meta.width as PageWidth | undefined) ?? "6xl"],
  );

  // From md up, the header and the footer stay on screen and only the area
  // between them scrolls. The router resets the window scroll, not this area,
  // so the layout does that itself on each new page.
  const scroller = ref<HTMLElement | null>(null);
  watch(
    () => route.path,
    async () => {
      await nextTick();
      const target = route.hash
        ? document.getElementById(decodeURIComponent(route.hash.slice(1)))
        : null;
      if (target) target.scrollIntoView();
      else scroller.value?.scrollTo({ top: 0, behavior: "instant" });
    },
  );
</script>

<template>
  <div
    class="flex min-h-dvh flex-col bg-white text-zinc-900 theme-transition dark:bg-zinc-950 dark:text-zinc-100 md:h-dvh md:overflow-hidden"
  >
    <ui-site-header class="shrink-0" />
    <div
      ref="scroller"
      class="flex-1 scroll-smooth md:min-h-0 md:overflow-y-auto"
    >
      <main class="mx-auto w-full px-4" :class="widthClass">
        <!-- The home page places the mobile tabs below the greeting. -->
        <ui-mobile-tabs v-if="route.meta.mobileTabs !== 'inline'" />
        <slot />
      </main>
    </div>
    <div class="mx-auto w-full max-w-6xl shrink-0 px-4 pb-2">
      <ui-footer />
    </div>
  </div>
</template>
