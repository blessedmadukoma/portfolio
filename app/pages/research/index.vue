<script setup lang="ts">
  definePageMeta({ layout: "site" });

  useHead({
    title: "Research | Blessed Madukoma",
    meta: [{ name: "description", content: "Research by Blessed Madukoma: publications and records on reliable answers from changing data." }],
  });
</script>

<template>
  <div class="space-y-4 py-8">
    <h1 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Research</h1>
    <navs-research />
  </div>
</template>
