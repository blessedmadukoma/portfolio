<script setup lang="ts">
  definePageMeta({ layout: "site" });

  useHead({
    title: "Projects | Blessed Madukoma",
    meta: [{ name: "description", content: "Projects built by Blessed Madukoma." }],
  });
</script>

<template>
  <!-- The active tab names the page, so the heading is for screen readers. -->
  <div class="pb-4 pt-6">
    <h1 class="sr-only">Projects</h1>
    <navs-projects />
  </div>
</template>
