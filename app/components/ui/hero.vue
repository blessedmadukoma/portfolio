<script setup lang="ts">
const showModal = ref(false);
const showMap = ref(false);
const statementView = ref<"statement" | "map">("statement");
const openStatement = (v: "statement" | "map") => {
	statementView.value = v;
	showModal.value = true;
};
const trackClick = useTrackClick();
</script>

<template>
	<section>
		<h1
			class="mb-4 text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100"
		>
			Hi👋🏿, I'm Blessed
		</h1>

		<div
			class="space-y-3 text-[15px] leading-[1.6] text-zinc-600 dark:text-zinc-400 md:text-sm md:leading-relaxed"
		>
			<p>
				<strong>Software engineer and researcher</strong> in Kigali, Rwanda
				(UTC+2). I build systems that help people get
				<strong>useful answers from complex data</strong>, and I research
				<strong>what keeps those answers reliable</strong> as the data and its
				meaning change. I am also building
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

			<ul class="list-disc space-y-1 pl-5 marker:text-zinc-400">
				<li>
					At SLS Energy, I replaced a manual spreadsheet with a billing engine:
					invoices for 9+ client organisations now go out within two days
					instead of over a month.
				</li>
				<li>
					My MS thesis at CMU-Africa checks 1.6 million athletics performances
					and narrows 31,604 athletes to about 163 for investigators. It won a
					Best Paper Honorable Mention at IEEE SDS 2026.
				</li>
			</ul>

			<p>
				I am open to AI and research engineering roles, remote or in Kigali:
				<a
					href="mailto:blessedmadukoma@gmail.com"
					class="underline text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 font-medium"
					@click="trackClick('email')"
					>email me</a
				>
				or
				<a
					href="/docs/Madukoma Blessed Academic CV.pdf"
					target="_blank"
					rel="noopener noreferrer"
					class="underline text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 font-medium"
					@click="trackClick('academic-cv')"
					>open my CV</a
				>. For research, read my
				<button
					@click="openStatement('statement')"
					class="underline text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 font-medium"
				>
					research statement</button
				> <span class="whitespace-nowrap"
					>(<button
						@click="openStatement('map')"
						class="underline text-zinc-900 dark:text-zinc-100 hover:text-zinc-600 dark:hover:text-zinc-400 font-medium"
					>see it as a map</button
					>).</span
				>
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
