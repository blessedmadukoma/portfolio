<script setup lang="ts">
  definePageMeta({ layout: "site" });

  useHead({
    title: "Research | Blessed Madukoma",
    meta: [{ name: "description", content: "Research by Blessed Madukoma: publications and records on data agents, semantic layers and reliable answers from changing data." }],
  });
</script>

<template>
  <!-- The active tab names the page, so the heading is for screen readers. -->
  <div class="pb-4 pt-6">
    <h1 class="sr-only">Research</h1>
    <navs-research />
  </div>
</template>
