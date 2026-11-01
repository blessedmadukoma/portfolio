<script setup lang="ts">
  // ref and markRaw are auto-imported by Nuxt
  const activeTab = shallowRef<ReturnType<typeof defineComponent> | null>(null);

  // Marks where the tabs start. On small screens the page scrolls, so if the
  // reader has scrolled past the tabs, a new tab is shown from its start.
  const tabsStart = ref<HTMLElement | null>(null);

  function setActiveTab(payload: ReturnType<typeof defineComponent>) {
    activeTab.value = markRaw(payload) as ReturnType<typeof defineComponent>;
    const y = tabsStart.value?.getBoundingClientRect().top ?? 0;
    if (y < 0) window.scrollBy({ top: y });
  }
</script>

<template>
  <section class="flex flex-col md:h-full">
    <div ref="tabsStart" aria-hidden="true"></div>
    <!-- Sticks to the top of the screen while the page scrolls (small screens). -->
    <div
      class="sticky top-0 flex-shrink-0 z-10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm pt-2 pb-1 border-b border-zinc-200 dark:border-zinc-700 md:pt-0"
    >
      <ui-navbar @update:activeTab="setActiveTab" />
    </div>

    <div class="pt-2 -mx-2 px-2 md:flex-1 md:overflow-y-auto">
      <component :is="activeTab" v-if="activeTab" />
      <!-- Fallback must match the first tab in app/pkg/enums.ts. -->
      <navs-research v-else />
    </div>
  </section>
</template>
