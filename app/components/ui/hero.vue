<script setup lang="ts">
const showModal = ref(false);
const showMap = ref(false);
const statementView = ref<"statement" | "map">("statement");
const openStatement = (v: "statement" | "map") => {
	statementView.value = v;
	showModal.value = true;
};
</script>

<template>
	<section>
		<h1
			class="text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100 flex items-center justify-between mb-4"
		>
			<span>Hi👋🏿, I'm Blessed</span>
			<ui-theme-toggle />
		</h1>

		<div
			class="space-y-3 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed"
		>
			<p>
				Software engineer and researcher. I study how to keep AI-powered
				data systems <strong>correct</strong> as <em>data</em>, <em>definitions</em>,
				<em>access rules</em> and <em>tools</em>
				change, and what that costs.
				<br />
				<strong>Current:</strong> when can people (in business and research)
				trust an answer computed from data? I work on what the data means,
				which answers a change
				makes wrong, and what evidence an answer must carry. I am building
				<a
					href="https://sedge.app"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center gap-1 align-middle text-zinc-900 hover:text-zinc-600 dark:text-zinc-100 dark:hover:text-zinc-400"
				>
					<span
						class="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-white ring-1 ring-zinc-200 dark:ring-zinc-700"
						aria-hidden="true"
					>
						<img
							src="/logos/imgs/sedge-favicon.png"
							alt=""
							class="h-[13px] w-[13px]"
						/>
					</span>
					<span class="underline">Sedge</span></a
				>, a data operating system.
			</p>

			<p>
				<button
					@click="openStatement('statement')"
					class="underline text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 font-medium"
				>
					Read my research statement</button
				> <span class="whitespace-nowrap"
					>(<button
						@click="openStatement('map')"
						class="underline text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 font-medium"
					>see it as a map</button
					>),</span
				>
				or
				<a
					href="mailto:blessedmadukoma@gmail.com"
					class="underline hover:text-zinc-900 dark:hover:text-zinc-100"
					>email me</a
				>: I am open to AI and research engineering roles, including remote.
				<!-- Research map retired (9 Oct 2026): the statement now covers it.
				<button
					@click="showMap = true"
					class="underline text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 font-medium"
				>
					how I think about my work</button
				> -->
			</p>
		</div>

		<ui-research-statement
			v-if="showModal"
			:initial-view="statementView"
			@close="showModal = false"
		/>
		<!-- <ui-research-map v-if="showMap" @close="showMap = false" /> -->
	</section>
</template>
