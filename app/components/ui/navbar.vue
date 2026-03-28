<script setup lang="ts">
  import type { Component } from "vue";
  import { NavBarComponents } from "~/pkg/enums";

  const activeTabKey = ref<string | null>(
    Object.keys(NavBarComponents)[0] ?? null
  );
  const activeTab = ref<Component | null>(
    NavBarComponents[activeTabKey.value!] ?? null
  );

  const emit = defineEmits<{
    (e: "update:activeTab", tab: Component): void;
  }>();

  const setActiveTab = (key: string | number, tab: Component) => {
    activeTab.value = tab;
    activeTabKey.value = String(key);
    emit("update:activeTab", tab);
  };

  watch(activeTab, (newTab) => {
    if (newTab !== null) {
      emit("update:activeTab", newTab);
    }
  });
</script>

<template>
  <section>
    <nav aria-label="Portfolio sections">
      <ul
        class="inline-flex h-10 w-full lg:w-fit items-center justify-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-1 gap-1"
        role="tablist"
      >
        <li
          v-for="(component, key) in NavBarComponents"
          :key="key"
          @click="setActiveTab(key, component)"
          :class="[
            'px-3 py-1 text-sm rounded-md capitalize cursor-pointer transition-all duration-300 ease-out',
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
    </nav>
  </section>
</template>
