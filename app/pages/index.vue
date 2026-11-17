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
    title: "Blessed Madukoma",
    meta: [
      {
        name: "description",
        content:
          "Blessed Madukoma is a software engineer and researcher in Kigali, Rwanda. He builds systems that help people get useful answers from complex data, and that keep working reliably as conditions change.",
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
          "Blessed Madukoma is a software engineer and researcher in Kigali, Rwanda. He builds systems that help people get useful answers from complex data, and that keep working reliably as conditions change.",
      },
      { property: "og:type", content: "website" },
    ],
  });
</script>
