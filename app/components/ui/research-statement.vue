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
            <strong>reliable data and intelligent systems</strong> that operate
            transparently under real-world conditions. My work focuses on how
            <strong
              >system architecture, observability, and data reliability</strong
            >
            determine whether analytical and machine learning systems can be
            trusted in production, particularly in environments where decisions
            must be explainable, auditable, and resilient to failure.
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
                  >current research</a
                >
                investigates
                <strong
                  >performance anomaly detection in large-scale athletics
                  data</strong
                >
                as a pathway toward automated integrity monitoring. The work
                analyzes over one million competition records using statistical
                and machine learning methods to identify abnormal performance
                patterns. Beyond detection accuracy, the research examines how
                systems can remain
                <strong
                  >interpretable, reproducible, and operationally
                  reliable</strong
                >
                when deployed in real-world decision environments.
              </span>

              <span class="block">
                This research is conducted at
                <strong
                  ><a
                    href="https://www.africa.engineering.cmu.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="font-medium text-indigo-500 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300"
                  >
                    Carnegie Mellon University</a
                  ></strong
                >, where I examine how analytical systems behave after
                deployment and how observability and system design influence
                trust in automated detection workflows.
              </span>
            </p>

            <h3
              class="text-base tracking-wide font-semibold text-zinc-800 dark:text-zinc-200 mb-1 mt-4"
            >
              Research Direction
            </h3>

            <p class="text-zinc-800 dark:text-zinc-300 mb-2">
              My long-term research direction centers on
              <strong>observable and self-reliable data systems:</strong>
              systems that can <em>detect failures</em>,
              <em>explain their behavior</em>, and
              <em>maintain trust under uncertainty</em>. This includes work on
              data pipelines, monitoring infrastructure, and system
              instrumentation that make complex analytical systems measurable
              and debuggable in production.
            </p>

            <p
              class="italic text-indigo-700 dark:text-indigo-300 font-medium mt-4"
            >
              My core research question:
            </p>

            <blockquote
              class="border-l-4 border-indigo-400 pl-4 mt-2 text-zinc-800 dark:text-zinc-100 italic"
            >
              How can we engineer data and AI systems that remain reliable,
              observable, and accountable as they scale from research prototypes
              into production infrastructure?
            </blockquote>
          </div>
        </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>
