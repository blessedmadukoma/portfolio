<script setup lang="ts">
  import {
    contactProtocolText,
    createContactReference,
  } from "#shared/utils/canary";

  // useState keeps the server-rendered code in the payload so hydration matches.
  const reference = useState("contact-ref", createContactReference);
  const protocol = computed(() => contactProtocolText(reference.value));
</script>

<template>
  <p class="contact-meta" aria-hidden="true">{{ protocol }}</p>
</template>
