<script setup lang="ts">
  import type { Component } from "vue";
  import { defineEmits, ref, watch } from "vue";

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
    <nav class="text-[15px]">
      <ul class="flex space-x-7">
        <li
          v-for="(component, key) in NavBarComponents"
          :key="key"
          @click="setActiveTab(key, component)"
          :class="[
            'capitalize cursor-pointer transition-colors duration-200',
            activeTabKey === String(key)
              ? 'text-black dark:text-white font-semibold'
              : 'text-gray-500 hover:text-gray-500 dark:hover:text-gray-300',
          ]"
        >
          {{ key }}
        </li>
      </ul>
    </nav>
  </section>
</template>
