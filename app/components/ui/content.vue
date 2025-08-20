<script setup lang="ts">
  import type { Component } from "vue";
  import { markRaw, ref } from "vue";

  const activeTab = ref<Component | null>(null);

  function setActiveTab(payload: Component) {
    activeTab.value = markRaw(payload);
  }
</script>

<template>
  <section class="h-screen flex flex-col">
    <section class="flex-shrink-0 border-b pb-1">
      <div class="overflow-x-auto overflow-y-hidden whitespace-nowrap">
        <ui-navbar @update:activeTab="setActiveTab" />
      </div>
    </section>

    <section class="flex-1 overflow-y-auto overflow-x-hidden">
      <component :is="activeTab" v-if="activeTab" />
      <navs-projects v-else />
    </section>
  </section>
</template>
