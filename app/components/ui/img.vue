<template>
  <div>
    <div
      v-if="imgUrl"
      class="w-12 h-12 rounded-md overflow-hidden outline outline-gray-600 dark:bg-gray-100 flex items-center justify-center p-0.5"
    >
      <img
        :src="imgUrl"
        :alt="alt"
        class="w-full h-full object-cover rounded-lg"
      />
    </div>

    <div v-else>
      <svg
        class="w-12 h-12 rounded-md bg-gray-100 object-contain"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 80 80"
        fill="none"
      >
        <rect width="80" height="80" rx="12" fill="#E5E7EB" />
        <text
          x="50%"
          y="50%"
          text-anchor="middle"
          dy=".3em"
          font-size="14"
          fill="#9CA3AF"
        >
          No Image
        </text>
      </svg>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    imgUrl: string | null | undefined;
    alt: string;
  }>();
</script>
