<script setup lang="ts">
  definePageMeta({ layout: "site" });

  useHead({
    title: "Experience | Blessed Madukoma",
    meta: [{ name: "description", content: "Work experience of Blessed Madukoma." }],
  });
</script>

<template>
  <div class="space-y-4 py-8">
    <h1 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Experience</h1>
    <navs-experience />
  </div>
</template>
