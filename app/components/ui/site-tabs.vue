<script setup lang="ts">
  import { SITE_NAV } from "~/data/site-nav";

  const route = useRoute();
  const isActive = (to: string) =>
    route.path === to || route.path.startsWith(`${to}/`);

  // The tabs scroll sideways when they do not fit (small screens). A fade on
  // the right shows that more tabs are hidden.
  const strip = ref<HTMLElement | null>(null);
  const moreRight = ref(false);
  const updateFade = () => {
    const el = strip.value;
    // 8 px: ignore the padding after the last tab.
    moreRight.value = !!el && el.scrollLeft + el.clientWidth < el.scrollWidth - 8;
  };
  // On small screens, scroll the strip so the current page's tab is in view.
  const showActive = () => {
    const el = strip.value;
    const active = el?.querySelector<HTMLElement>('[aria-current="page"]');
    if (el && active) {
      el.scrollLeft = Math.max(0, active.offsetLeft - (el.clientWidth - active.offsetWidth) / 2);
    }
    updateFade();
  };
  onMounted(() => {
    showActive();
    window.addEventListener("resize", updateFade);
  });
  watch(() => route.path, () => nextTick(showActive));
  onBeforeUnmount(() => window.removeEventListener("resize", updateFade));
</script>

<template>
  <nav aria-label="Site sections" class="relative">
    <div
      ref="strip"
      class="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      @scroll.passive="updateFade"
    >
      <ul
        class="inline-flex h-10 w-fit gap-1 rounded-lg border border-zinc-200 bg-zinc-50 p-1 dark:border-zinc-800 dark:bg-zinc-900/50"
      >
        <li v-for="item in SITE_NAV" :key="item.to">
          <NuxtLink
            :to="item.to"
            :aria-current="isActive(item.to) ? 'page' : undefined"
            :class="[
              'block whitespace-nowrap rounded-md px-2.5 py-1 text-sm transition-[background-color,color,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100 sm:px-3',
              isActive(item.to)
                ? 'bg-white font-medium text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100'
                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100',
            ]"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div
      v-show="moreRight"
      class="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white dark:from-zinc-950"
      aria-hidden="true"
    ></div>
  </nav>
</template>
