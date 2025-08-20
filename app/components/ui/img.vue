<template>
  <div>
    <div
      v-if="imgUrl"
      class="w-16 h-16 rounded-md overflow-hidden dark:bg-gray-100 flex items-center justify-center dark:p-1"
    >
      <img
        :src="imgUrl"
        alt="Project Image"
        class="w-full h-full object-cover"
      />
    </div>

    <div v-else>
      <svg
        class="w-16 h-16 rounded-md bg-gray-100"
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
  }>();
</script>
