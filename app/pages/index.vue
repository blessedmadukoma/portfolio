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
  // useBlogPosts();

  useHead({
    title: "Blessed M.",
    meta: [
      {
        name: "description",
        content:
          "Explore the portfolio of Blessed Madukoma, showcasing projects, skills, and contact information.",
      },
      {
        name: "keywords",
        content:
          "Blessed Madukoma, portfolio, Software Engineer, Research Engineer, projects, contact",
      },
      { name: "author", content: "Blessed Madukoma" },
      { property: "og:title", content: "Blessed Madukoma | Portfolio" },
      {
        property: "og:description",
        content:
          "Discover innovative projects, cutting-edge skills & research, and connect with Blessed Madukoma — your next Software, AI/ML & Research Engineer.",
      },
      { property: "og:type", content: "website" },
    ],
  });
</script>
