<script setup lang="ts">
  defineOptions({ inheritAttrs: false });
</script>

<template>
  <div
    class="my-6 max-w-full overflow-x-auto rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
    tabindex="0"
    role="group"
    aria-label="Article table"
  >
    <table v-bind="$attrs">
      <slot />
    </table>
  </div>
</template>
