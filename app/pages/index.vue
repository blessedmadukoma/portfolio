<template>
  <section class="h-screen flex flex-col overflow-hidden py-2 space-y-8">
    <section class="space-y-4 flex-shrink-0">
      <ui-hero />
      <ui-socials />
    </section>

    <section class="flex-1 overflow-y-auto">
      <ui-content />
    </section>

    <section class="flex-shrink-0">
      <ui-footer />
    </section>
  </section>
</template>

<script setup>
  useHead({
    title: "Blessed Madukoma | Portfolio",
    meta: [
      {
        name: "description",
        content:
          "Explore the portfolio of Blessed Madukoma, showcasing projects, skills, and contact information.",
      },
      {
        name: "keywords",
        content:
          "Blessed Madukoma, portfolio, Software Engineer, AI Engineer, projects, contact",
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
