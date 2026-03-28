<script lang="ts" setup>
const weekday = [
	"Sunday",
	"Monday",
	"Tuesday",
	"Wednesday",
	"Thursday",
	"Friday",
	"Saturday",
];
const date = new Date();
const day = weekday[date.getDay()];
</script>

<template>
	<div class="border-t border-zinc-200 dark:border-zinc-800 pt-4">
		<div
			class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6"
		>
			<!-- Left: links and greeting -->
			<div class="flex flex-col gap-1 text-sm text-zinc-500 dark:text-zinc-400">
				<a
					href="https://mblessed.space"
					target="_blank"
					rel="noopener noreferrer"
					class="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
				>
					mblessed.space
				</a>
				<p>
					Have a wonderful
					<span class="font-medium text-zinc-900 dark:text-zinc-100">{{
						day
					}}</span>
					🚀
				</p>
				<p>
					Inspired by
					<a
						href="https://www.chizi.app/"
						target="_blank"
						rel="noopener noreferrer"
						class="text-zinc-600 dark:text-zinc-300 hover:underline transition-colors"
						>Chizi</a
					>
					&amp;
					<a
						href="https://janvi.me"
						target="_blank"
						rel="noopener noreferrer"
						class="text-zinc-600 dark:text-zinc-300 hover:underline transition-colors"
						>Janvi</a
					>
				</p>
			</div>

			<!-- Right: memoji + spinning name -->
			<div class="flex flex-col items-center mr-4 overflow-hidden h-20">
				<div class="relative h-20 w-20">
					<img
						src="../../assets/imgs/memoji.png"
						alt="Memoji"
						class="w-20 h-20 rounded-full border-2 border-zinc-200 dark:border-zinc-700"
					/>
					<div class="absolute -top-14 -left-5 animate-spin-slow">
						<icons-name width="110" />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
