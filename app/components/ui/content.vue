<script setup lang="ts">
  // ref and markRaw are auto-imported by Nuxt
  const activeTab = shallowRef<ReturnType<typeof defineComponent> | null>(null);

  function setActiveTab(payload: ReturnType<typeof defineComponent>) {
    activeTab.value = markRaw(payload) as ReturnType<typeof defineComponent>;
  }
</script>

<template>
  <section class="flex flex-col h-full">
    <div
      class="flex-shrink-0 z-10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm pb-1 border-b border-zinc-200 dark:border-zinc-700"
    >
      <div class="overflow-x-auto">
        <ui-navbar @update:activeTab="setActiveTab" />
      </div>
    </div>

    <div class="flex-1 overflow-y-auto pt-2">
      <component :is="activeTab" v-if="activeTab" />
      <navs-projects v-else />
    </div>
  </section>
</template>
