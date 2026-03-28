<script lang="ts" setup>
import { AWARDS, EDUCATION, WORK_EXPERIENCE } from "~/data/experience";

const awards = ref(AWARDS);
const educations = ref(
	[...EDUCATION].sort((a, b) => {
		if (!a.endDate && !b.endDate) return 0;
		if (!a.endDate) return -1;
		if (!b.endDate) return 1;
		return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
	}),
);

const workExperience = ref(
	[...WORK_EXPERIENCE].sort((a, b) => {
		if (!a.endDate && !b.endDate) return 0;
		if (!a.endDate) return -1;
		if (!b.endDate) return 1;
		return new Date(b.endDate).getTime() - new Date(a.endDate).getTime();
	}),
);

const openWorkDropdown = ref<number | null>(null);
const openEducationDropdown = ref<number | null>(null);
const toggleWorkDropdown = (id: number) => {
	openWorkDropdown.value = openWorkDropdown.value === id ? null : id;
};
const toggleEducationDropdown = (id: number) => {
	openEducationDropdown.value = openEducationDropdown.value === id ? null : id;
};
</script>

<template>
	<section class="space-y-6 pr-4">
		<!-- Work Experience -->
		<section class="space-y-2">
			<h2 class="py-1 flex justify-between items-center">
				<p
					class="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
				>
					Work Experience
				</p>
				<a
					class="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 underline transition-colors"
					target="_blank"
					href="/docs/Madukoma Blessed Resume.pdf"
				>
					CV/Resume
				</a>
			</h2>

			<div
				v-for="(experience, id) in workExperience"
				:key="id"
				class="border-b border-zinc-200 last:border-b-0 dark:border-zinc-700"
				@click="toggleWorkDropdown(id)"
			>
				<div
					class="flex flex-1 justify-between items-start space-x-3 py-2 tracking-wide group cursor-pointer"
				>
					<div class="pr-2 flex space-x-4">
						<ui-img :img-url="experience.imageURL" />

						<div class="space-y-1">
							<h3 class="font-semibold">
								<p
									class="group-hover:underline text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 flex items-center space-x-2"
								>
									<a
										:href="experience.link"
										target="_blank"
										rel="noopener"
										@click.stop
									>
										{{ experience.company }}
									</a>
									<span
										class="transition-transform duration-200 group-hover:rotate-90"
									>
										<svg
											class="inline w-4 h-4 text-zinc-400"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											viewBox="0 0 16 16"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M6 4l4 4-4 4"
											/>
										</svg>
									</span>
								</p>
							</h3>
							<p class="block text-sm text-zinc-500 dark:text-zinc-400">
								{{ experience.position }}
							</p>
						</div>
					</div>
					<p
						class="block text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap"
					>
						{{ experience.startDate }} —
						{{ experience.endDate ? experience.endDate : "Present" }}
					</p>
				</div>

				<Transition name="expand">
					<div
						v-if="openWorkDropdown === id"
						class="w-full my-2 bg-zinc-50 dark:bg-zinc-800 rounded-md px-3 pb-3"
					>
						<ul
							class="list-disc list-inside space-y-2 tracking-wide leading-loose py-3"
						>
							<li
								v-for="(role, idx) in experience.workRoles"
								:key="idx"
								class="sm:text-sm text-base text-zinc-600 dark:text-zinc-300"
								v-html="role"
							></li>
						</ul>
					</div>
				</Transition>
			</div>
		</section>

		<!-- Awards -->
		<section v-if="awards.length" class="space-y-3">
			<h2 class="flex justify-between items-center">
				<p
					class="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
				>
					Awards
				</p>
				<a
					class="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 underline transition-colors"
					target="_blank"
					href="#"
				>
					View More
				</a>
			</h2>
		</section>

		<!-- Education -->
		<section class="space-y-3 mt-4">
			<h2 class="flex justify-between items-center">
				<p
					class="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400"
				>
					Education
				</p>
			</h2>

			<div
				v-for="(education, id) in educations"
				:key="id"
				class="border-b border-zinc-200 last:border-b-0 dark:border-zinc-700"
				@click="toggleEducationDropdown(id)"
			>
				<div
					class="flex flex-1 justify-between items-start space-x-3 py-2 tracking-wide group cursor-pointer"
				>
					<div class="pr-2 flex space-x-4">
						<img
							:src="education.imageURL"
							alt="Institution logo"
							class="w-16 h-16 rounded-md object-contain"
						/>
						<div class="space-y-2">
							<h3 class="font-semibold">
								<p
									class="group-hover:underline text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 flex items-center space-x-2"
								>
									<a
										:href="education.link"
										target="_blank"
										rel="noopener"
										@click.stop
									>
										{{ education.institution }}
									</a>
									<span
										class="transition-transform duration-200 group-hover:rotate-90"
									>
										<svg
											class="inline w-4 h-4 text-zinc-400"
											fill="none"
											stroke="currentColor"
											stroke-width="2"
											viewBox="0 0 16 16"
										>
											<path
												stroke-linecap="round"
												stroke-linejoin="round"
												d="M6 4l4 4-4 4"
											/>
										</svg>
									</span>
								</p>
							</h3>
							<p class="block text-sm text-zinc-500 dark:text-zinc-400">
								<span>{{ education.degree }}</span>
								<span v-if="education.grade">
									<span class="text-zinc-400 mx-1">•</span>
									{{ education.grade }}
								</span>
							</p>
						</div>
					</div>
					<p
						class="block text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap"
					>
						{{ education.startDate }} —
						{{ education.endDate ? education.endDate : "Present" }}
					</p>
				</div>

				<Transition name="expand">
					<div
						v-if="openEducationDropdown === id"
						class="w-full my-2 rounded-md p-3 tracking-wide text-sm text-zinc-600 dark:text-zinc-300"
					>
						<span>{{ education.description }}</span>
						<span v-if="education.thesis" class="block mt-2">
							<strong>Thesis: </strong>
							<span v-html="education.thesis"></span>
						</span>
					</div>
				</Transition>
			</div>
		</section>
	</section>
</template>
