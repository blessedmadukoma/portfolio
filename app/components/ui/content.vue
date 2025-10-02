<script setup lang="ts">
  import type { Component } from "vue";
  import { markRaw, ref } from "vue";

  const activeTab = ref<Component | null>(null);

  function setActiveTab(payload: Component) {
    activeTab.value = markRaw(payload);
  }
</script>

<template>
  <section class="h-full flex flex-col pr-3">
    <section
      class="flex-shrink-0 sticky top-0 bg-white dark:bg-primary-blue z-10 border-b py-1 backdrop-blur-lg"
    >
      <div class="overflow-x-auto overflow-y-hidden whitespace-nowrap">
        <ui-navbar @update:activeTab="setActiveTab" />
      </div>
    </section>

    <section class="flex-1 overflow-x-hidden">
      <component :is="activeTab" v-if="activeTab" />
      <navs-projects v-else />
    </section>
  </section>
</template>
