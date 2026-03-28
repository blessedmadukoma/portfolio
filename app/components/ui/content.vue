<script setup lang="ts">
  // ref and markRaw are auto-imported by Nuxt
  const activeTab = shallowRef<ReturnType<typeof defineComponent> | null>(null);

  function setActiveTab(payload: ReturnType<typeof defineComponent>) {
    activeTab.value = markRaw(payload) as ReturnType<typeof defineComponent>;
  }
</script>

<template>
  <section class="flex flex-col gap-4">
    <div
      class="sticky top-0 z-10 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-sm py-2"
    >
      <div class="overflow-x-auto overflow-y-hidden whitespace-nowrap">
        <ui-navbar @update:activeTab="setActiveTab" />
      </div>
    </div>

    <div>
      <component :is="activeTab" v-if="activeTab" />
      <navs-projects v-else />
    </div>
  </section>
</template>
