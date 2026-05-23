<script setup lang="ts">
  defineProps<{ width?: number | string; height?: number | string }>();
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="width ?? 11"
    :height="height ?? 11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <path d="M12 2L2 7l10 5 10-5-10-5z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
</template>
