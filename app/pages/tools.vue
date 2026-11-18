<script setup lang="ts">
  definePageMeta({ layout: "site" });

  useHead({
    title: "Tools | Blessed Madukoma",
    meta: [{ name: "description", content: "Tools Blessed Madukoma uses." }],
  });
</script>

<template>
  <div class="space-y-4 py-8">
    <h1 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Tools</h1>
    <navs-tools />
  </div>
</template>
