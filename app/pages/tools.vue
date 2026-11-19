<script setup lang="ts">
  definePageMeta({ layout: "site" });

  useHead({
    title: "Tools | Blessed Madukoma",
    meta: [{ name: "description", content: "Tools Blessed Madukoma uses." }],
  });
</script>

<template>
  <!-- The active tab names the page, so the heading is for screen readers. -->
  <div class="pb-4 pt-6">
    <h1 class="sr-only">Tools</h1>
    <navs-tools />
  </div>
</template>
