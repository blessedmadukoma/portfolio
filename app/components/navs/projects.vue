<script lang="ts" setup>
import { PROJECTS } from "~/data/projects";
import { TOOLS } from "~/data/tools";

const projects = ref(PROJECTS);
const tools = ref(TOOLS);

type Tool = (typeof TOOLS)[number];

const findTool = (tech: string) =>
	tools.value.find((t: Tool) => t.name.toLowerCase() === tech.toLowerCase());
</script>

<template>
	<section class="mt-4">
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
			<div
				v-for="(project, id) in projects"
				:key="id"
				class="group p-6 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50 hover:shadow-lg hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-300 ease-out"
			>
				<!-- Title + links -->
				<div class="flex items-start justify-between mb-2">
					<h3
						class="text-sm font-medium text-zinc-900 dark:text-zinc-100 leading-snug"
					>
						{{ project.title }}
					</h3>
					<div
						class="flex flex-row gap-2 text-xs text-zinc-500 dark:text-zinc-400 flex-shrink-0 ml-3"
					>
						<a
							v-if="project.github"
							:href="project.github"
							target="_blank"
							rel="noopener"
							class="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
						>
							GitHub
						</a>
						<a
							v-if="project.live"
							:href="project.live"
							target="_blank"
							rel="noopener"
							class="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
						>
							Live
						</a>
					</div>
				</div>

				<!-- Description -->
				<p
					class="text-sm text-zinc-500 dark:text-zinc-400 mb-4 leading-relaxed"
				>
					{{ project.description }}
				</p>

				<!-- Tech tags -->
				<div class="flex flex-wrap gap-2">
					<span
						v-for="tech in project.technologies"
						:key="tech"
						class="inline-flex items-center gap-1 text-xs text-zinc-400 dark:text-zinc-500"
					>
						<img
							v-if="findTool(tech)"
							:src="findTool(tech)?.image"
							:alt="tech"
							class="w-3 h-3 object-contain"
							loading="lazy"
						/>
						{{ tech }}
					</span>
				</div>
			</div>
		</div>
	</section>
</template>
