<script setup lang="ts">
// import Analytics from "@vercel/analytics/nuxt";
</script>

<template>
	<div>
		<!-- <Analytics /> -->
		<!-- <main
      class="bg-white dark:bg-primary-blue text-gray-900 dark:text-gray-100 theme-transition"
      style="padding-top: 0; padding-bottom: 0"
    > -->
		<main
			class="flex flex-col h-screen overflow-hidden bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 theme-transition"
		>
			<div
				class="flex-1 flex flex-col h-full max-w-7xl mx-auto w-full px-4 py-8"
			>
				<NuxtPage />
			</div>
		</main>
	</div>
</template>
