<script setup lang="ts">
  definePageMeta({ layout: "site" });

  useHead({
    title: "Projects | Blessed Madukoma",
    meta: [{ name: "description", content: "Projects built by Blessed Madukoma." }],
  });
</script>

<template>
  <div class="space-y-4 py-8">
    <h1 class="text-xl font-semibold text-zinc-900 dark:text-zinc-100">Projects</h1>
    <navs-projects />
  </div>
</template>
