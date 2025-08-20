<script setup lang="ts">
  import type { Component } from "vue";
  import { markRaw, ref } from "vue";

  const activeTab = ref<Component | null>(null);

  function setActiveTab(payload: Component) {
    activeTab.value = markRaw(payload);
  }
</script>

<template>
  <section class="space-y-1">
    <ui-navbar @update:activeTab="setActiveTab" />

    <section class="flex-grow overflow-auto">
      <component :is="activeTab" v-if="activeTab" />
      <navs-projects v-else />
    </section>
  </section>
</template>
