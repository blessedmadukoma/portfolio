<template>
  <section class="flex flex-1 flex-col py-2 space-y-4 md:h-full">
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
          "Blessed Madukoma is a software engineer and researcher. He studies which changes to AI-powered data systems make their answers complete and up to date, or clear about what they lack, and at what cost.",
      },
      {
        name: "keywords",
        content:
          "Blessed Madukoma, Software Engineer, Researcher, AI-powered data systems, data agents, access control, data provenance, agent observability, Sedge",
      },
      { name: "author", content: "Blessed Madukoma" },
      { property: "og:title", content: "Blessed Madukoma | Portfolio" },
      {
        property: "og:description",
        content:
          "Blessed Madukoma is a software engineer and researcher. He studies which changes to AI-powered data systems make their answers complete and up to date, or clear about what they lack, and at what cost.",
      },
      { property: "og:type", content: "website" },
    ],
  });
</script>
