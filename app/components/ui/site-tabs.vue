<script setup lang="ts">
  import { SITE_NAV } from "~/data/site-nav";

  // bare: no box around the tabs, and the row runs to the screen edges.
  // The mobile tabs use it, so a row that does not fit is cut at the screen
  // edge and not in the middle of a box.
  const props = defineProps<{ bare?: boolean }>();

  const route = useRoute();
  const isActive = (to: string) =>
    route.path === to || route.path.startsWith(`${to}/`);

  // The tabs scroll sideways when they do not fit. A fade on each side shows
  // that more tabs are hidden there.
  const strip = ref<HTMLElement | null>(null);
  const moreLeft = ref(false);
  const moreRight = ref(false);
  const updateFade = () => {
    const el = strip.value;
    // 8 px: ignore the padding before the first and after the last tab.
    moreLeft.value = !!el && el.scrollLeft > 8;
    moreRight.value = !!el && el.scrollLeft + el.clientWidth < el.scrollWidth - 8;
  };
  // Scroll the row so the current page's tab is in the middle.
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

  const fadeFrom = props.bare
    ? "from-white/95 dark:from-zinc-950/95"
    : "from-white dark:from-zinc-950";
</script>

<template>
  <nav aria-label="Site sections" class="relative">
    <div
      ref="strip"
      class="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      @scroll.passive="updateFade"
    >
      <ul
        :class="
          bare
            ? 'inline-flex gap-1 px-4'
            : 'inline-flex h-10 w-fit gap-1 rounded-lg border border-zinc-200 bg-zinc-50 p-1 dark:border-zinc-800 dark:bg-zinc-900/50'
        "
      >
        <li v-for="item in SITE_NAV" :key="item.to">
          <NuxtLink
            :to="item.to"
            :aria-current="isActive(item.to) ? 'page' : undefined"
            :class="[
              'block whitespace-nowrap rounded-md text-sm transition-[background-color,color,box-shadow] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100',
              bare ? 'px-3 py-1.5' : 'px-2.5 py-1 sm:px-3',
              isActive(item.to)
                ? bare
                  ? 'bg-zinc-100 font-medium text-zinc-900 dark:bg-zinc-800 dark:text-zinc-100'
                  : 'bg-white font-medium text-zinc-900 shadow-sm dark:bg-zinc-800 dark:text-zinc-100'
                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100',
            ]"
          >
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>
    <div
      v-show="moreLeft"
      class="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r"
      :class="fadeFrom"
      aria-hidden="true"
    ></div>
    <div
      v-show="moreRight"
      class="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l"
      :class="fadeFrom"
      aria-hidden="true"
    ></div>
  </nav>
</template>
