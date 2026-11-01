<script setup lang="ts">
  import type { Component } from "vue";
  import { NavBarComponents } from "~/pkg/enums";

  const activeTabKey = ref<string | null>(
    Object.keys(NavBarComponents)[0] ?? null,
  );
  const activeTab = shallowRef<Component | null>(
    activeTabKey.value
      ? markRaw(NavBarComponents[activeTabKey.value] as Component)
      : null,
  );

  const emit = defineEmits<{
    (e: "update:activeTab", tab: Component): void;
  }>();

  // The tabs scroll sideways when they do not fit (small screens). A fade on
  // the right shows that more tabs are hidden.
  const strip = ref<HTMLElement | null>(null);
  const moreRight = ref(false);
  const updateFade = () => {
    const el = strip.value;
    // 8 px: ignore the padding after the last tab.
    moreRight.value = !!el && el.scrollLeft + el.clientWidth < el.scrollWidth - 8;
  };
  onMounted(() => {
    updateFade();
    window.addEventListener("resize", updateFade);
  });
  onBeforeUnmount(() => window.removeEventListener("resize", updateFade));

  const setActiveTab = (key: string | number, tab: Component, event?: MouseEvent) => {
    activeTab.value = markRaw(tab);
    activeTabKey.value = String(key);
    emit("update:activeTab", markRaw(tab));
    // Show all of a tab that was only partly visible.
    (event?.currentTarget as HTMLElement | null)?.scrollIntoView({
      block: "nearest",
      inline: "nearest",
      behavior: "smooth",
    });
  };
</script>

<template>
  <section>
    <nav aria-label="Portfolio sections" class="relative">
      <div
        ref="strip"
        class="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        @scroll.passive="updateFade"
      >
        <ul
          class="inline-flex h-10 w-fit rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-1 gap-1"
          role="tablist"
        >
          <li
            v-for="(component, key) in NavBarComponents"
            :key="key"
            @click="setActiveTab(key, component, $event)"
            :class="[
              'whitespace-nowrap px-2.5 sm:px-3 py-1 text-sm rounded-md capitalize cursor-pointer transition-[background-color,color,box-shadow] duration-200 ease-out',
              activeTabKey === String(key)
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 shadow-sm font-medium'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100',
            ]"
            role="tab"
            :aria-selected="activeTabKey === String(key)"
          >
            {{ key }}
          </li>
        </ul>
      </div>
      <div
        v-show="moreRight"
        class="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white dark:from-zinc-950"
        aria-hidden="true"
      ></div>
    </nav>
  </section>
</template>
