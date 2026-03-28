<template>
  <div class="min-h-screen flex items-center justify-center bg-white dark:bg-zinc-950 px-4">
    <div class="text-center max-w-md">
      <div class="mb-6">
        <h1 class="text-6xl font-bold text-zinc-300 dark:text-zinc-700">500</h1>
        <p class="text-lg text-zinc-500 dark:text-zinc-400 mt-2">Internal Server Error</p>
      </div>

      <p class="text-sm text-zinc-600 dark:text-zinc-400 mb-6">
        Something went wrong on our end. Please try refreshing the page.
      </p>

      <button
        @click="handleError"
        class="inline-flex items-center gap-2 px-4 py-2 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 text-sm font-medium rounded-md hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
        Refresh Page
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  error: {
    message?: string;
    statusCode?: number;
    statusMessage?: string;
  };
}>();

const handleError = () => {
  clearError({ redirect: "/" });
};
</script>
