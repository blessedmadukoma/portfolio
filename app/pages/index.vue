<template>
  <div class="space-y-10 pb-4 pt-6">
    <section class="space-y-2">
      <ui-hero />
      <ui-socials />
    </section>

    <ui-recent-thoughts />
  </div>
</template>

<script setup lang="ts">
  definePageMeta({ layout: "site" });

  useHead({
    title: "Blessed Madukoma",
    meta: [
      {
        name: "description",
        content:
          "Blessed Madukoma is a software engineer and researcher in Kigali, Rwanda. He builds systems that help people get useful answers from complex data, and researches what keeps those answers reliable as the data and its meaning change.",
      },
      {
        name: "keywords",
        content:
          "Blessed Madukoma, Software Engineer, Researcher, data agents, text-to-SQL, semantic layers, data quality, LLM agents, AI-powered data systems, Sedge",
      },
      { name: "author", content: "Blessed Madukoma" },
      { property: "og:title", content: "Blessed Madukoma | Portfolio" },
      {
        property: "og:description",
        content:
          "Blessed Madukoma is a software engineer and researcher in Kigali, Rwanda. He builds systems that help people get useful answers from complex data, and researches what keeps those answers reliable as the data and its meaning change.",
      },
      { property: "og:type", content: "website" },
    ],
  });
</script>
