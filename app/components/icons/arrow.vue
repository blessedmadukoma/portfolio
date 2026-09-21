<script setup lang="ts">
  withDefaults(defineProps<{ open?: boolean }>(), {
    open: false,
  });
</script>

<template>
  <span
    :class="[
      'inline-flex transition-transform duration-200 ease-out',
      open ? 'rotate-90' : 'group-hover:rotate-90',
    ]"
  >
    <svg
      class="inline w-4 h-4 text-zinc-400"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      viewBox="0 0 16 16"
    >
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 4l4 4-4 4" />
    </svg>
  </span>
</template>
