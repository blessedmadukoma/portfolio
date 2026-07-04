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
            <strong>production AI and data systems</strong>
            that operate in real-world environments. My research explores how
            software engineering principles, particularly
            <strong>evaluation, reliability, and system design</strong>, help AI
            systems remain dependable as models, users, and operating conditions
            evolve after deployment.
          </p>

          <div class="mb-6">
            <h3
              class="text-base tracking-wide font-semibold text-zinc-800 dark:text-zinc-200 mb-1"
            >
              Current Research
            </h3>

            <p class="text-zinc-800 dark:text-zinc-300 space-y-2">
              <span class="block">
                My
                <a
                  href="https://athletics-performance.mblessed.space/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-medium text-indigo-500 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300"
                >
                  current research
                </a>
                investigates
                <strong>
                  performance anomaly detection in large-scale athletics data
                </strong>
                as a pathway toward automated integrity monitoring. The work
                analyzes over one million competition records using statistical
                and machine learning methods to identify abnormal performance
                patterns. Beyond detection accuracy, it explores how analytical
                systems can remain reliable under real-world decision-making
                conditions.
              </span>

              <span class="block">
                This research is conducted at
                <strong>
                  <a
                    href="https://www.africa.engineering.cmu.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="font-medium text-indigo-500 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300"
                  >
                    Carnegie Mellon University Africa
                  </a> </strong
                >. Working on large-scale analytical systems has shaped my
                broader research interests toward
                <strong>software engineering for production AI systems</strong>,
                particularly how AI systems are evaluated and maintained as they
                evolve after deployment.
              </span>
            </p>

            <h3
              class="text-base tracking-wide font-semibold text-zinc-800 dark:text-zinc-200 mb-1 mt-4"
            >
              Research Direction
            </h3>

            <p class="text-zinc-800 dark:text-zinc-300 mb-2">
              My long-term research lies at the intersection of
              <strong>software engineering and production AI.</strong>
              Rather than developing larger or more capable models, I'm
              interested in how AI-enabled software can be continuously
              evaluated and engineered to remain reliable as models, prompts,
              tools, data, and operating environments evolve. My goal is to
              understand how production AI systems should be evaluated,
              monitored, and maintained throughout their operational lifecycle.
            </p>

            <p
              class="italic text-indigo-700 dark:text-indigo-300 font-medium mt-4"
            >
              My core research question:
            </p>

            <blockquote
              class="border-l-4 border-indigo-400 pl-4 mt-2 text-zinc-800 dark:text-zinc-100 italic"
            >
              How do we engineer production AI systems that remain reliable as
              they continuously evolve?
            </blockquote>
          </div>
        </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>
