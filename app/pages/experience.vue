<script setup lang="ts">
  definePageMeta({ layout: "site" });

  useHead({
    title: "Experience | Blessed Madukoma",
    meta: [{ name: "description", content: "Work experience of Blessed Madukoma." }],
  });
</script>

<template>
  <!-- The active tab names the page, so the heading is for screen readers. -->
  <div class="pb-4 pt-6">
    <h1 class="sr-only">Experience</h1>
    <navs-experience />
  </div>
</template>
