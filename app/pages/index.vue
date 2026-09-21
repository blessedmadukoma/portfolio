<template>
  <section class="flex flex-col h-full py-2 space-y-4">
    <section class="space-y-2 flex-shrink-0">
      <ui-hero />
      <ui-socials />
    </section>

    <section class="flex-1 flex flex-col min-h-0">
      <ui-content />
    </section>

    <section class="flex-shrink-0">
      <ui-footer />
    </section>
  </section>
</template>

<script setup lang="ts">
  definePageMeta({ layout: "home" });

  useHead({
    title: "Blessed M.",
    meta: [
      {
        name: "description",
        content:
          "Blessed Madukoma is a software engineer and systems researcher studying infrastructure for reliable AI-generated workloads.",
      },
      {
        name: "keywords",
        content:
          "Blessed Madukoma, Software Engineer, Research Engineer, AI-generated workloads, data infrastructure, Sedge",
      },
      { name: "author", content: "Blessed Madukoma" },
      { property: "og:title", content: "Blessed Madukoma | Portfolio" },
      {
        property: "og:description",
        content:
          "Blessed Madukoma builds reliable software, data, and AI-enabled systems through research, engineering, and production-focused projects.",
      },
      { property: "og:type", content: "website" },
    ],
  });
</script>
