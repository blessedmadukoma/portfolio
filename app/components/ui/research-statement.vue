<script setup lang="ts">
const emit = defineEmits(["close"]);
</script>

<template>
	<ClientOnly>
		<Teleport to="body">
			<div
				class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
			>
				<div
					class="relative bg-white dark:bg-zinc-900 rounded-lg shadow-lg px-10 py-4 max-w-3xl w-full text-sm mx-4 max-h-[90vh] overflow-y-auto"
				>
					<div class="flex items-center justify-between mb-2">
						<h2 class="text-xl font-bold text-zinc-900 dark:text-zinc-100">
							Research &amp; Engineering Focus
						</h2>
						<button
							@click="emit('close')"
							class="text-3xl text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 ml-4 transition-colors"
							aria-label="Close"
						>
							&times;
						</button>
					</div>

					<p class="text-zinc-800 dark:text-zinc-300 mb-3">
						I design and study
						<strong>intelligent data and machine learning systems</strong>
						that are transparent, reliable, and capable of operating in real
						time. My focus lies in understanding how
						<strong>system architecture</strong>, rather than model complexity
						alone, can make AI infrastructures inherently
						<strong>interpretable, auditable, and scalable</strong> for
						high-stakes decision environments such as sports integrity,
						compliance, and intelligent infrastructure governance.
					</p>

					<div class="mb-6">
						<h3
							class="text-base tracking-wide font-semibold text-zinc-800 dark:text-zinc-200 mb-1"
						>
							Current Research
						</h3>
						<p class="text-zinc-800 dark:text-zinc-300">
							At
							<a
								href="https://www.africa.engineering.cmu.edu/"
								target="_blank"
								rel="noopener noreferrer"
								class="font-medium text-indigo-500 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300"
							>
								Carnegie Mellon University Africa</a
							>, my current research investigates
							<strong
								>anomaly detection methodologies for athletic performance
								analysis</strong
							>
							as a pathway toward automated doping detection. I explore how
							<strong>statistical outlier detection</strong> and
							<strong>machine learning methods</strong> can identify suspicious
							performance deviations while ensuring interpretability,
							reproducibility, and fairness—building systems where detection is
							both scientifically grounded and ethically defensible.
						</p>

						<h3
							class="text-base tracking-wide font-semibold text-zinc-800 dark:text-zinc-200 mb-1 mt-4"
						>
							Future Direction
						</h3>
						<p class="text-zinc-800 dark:text-zinc-300 mb-2">
							Building on this foundation, I aim to develop
							<strong>next-generation data intelligence systems</strong>
							that unify analytics, modeling, provenance, and compliance into
							self-regulating architectures. This vision is embodied in my work
							with
							<a
								href="https://www.sedge.app/"
								target="_blank"
								rel="noopener noreferrer"
								class="font-medium text-indigo-500 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300"
								>Sedge</a
							>
							— a platform integrating five components: Spark, Architect, Nexus,
							Chronicle, and Guardian — to operationalize reliable,
							interpretable, and continuously adaptive AI ecosystems.
						</p>

						<p
							class="italic text-indigo-700 dark:text-indigo-300 font-medium mt-4"
						>
							My long-term question:
						</p>
						<blockquote
							class="border-l-4 border-indigo-400 pl-4 mt-2 text-zinc-800 dark:text-zinc-100 italic"
						>
							How can we engineer AI systems that understand, govern, and
							improve themselves — turning data infrastructures into
							self-reliable, interpretable, and continuously learning
							ecosystems?
						</blockquote>
					</div>
				</div>
			</div>
		</Teleport>
	</ClientOnly>
</template>
