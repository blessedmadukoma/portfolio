<script setup lang="ts">
  const emit = defineEmits(["close"]);
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        @click.self="emit('close')"
      >
        <div
          class="relative bg-white dark:bg-zinc-900 rounded-lg shadow-lg px-10 py-6 max-w-4xl w-[94vw] text-sm mx-4 max-h-[92vh] overflow-y-auto"
        >
          <div class="flex items-center justify-between mb-4">
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

          <div class="space-y-5">
            <section>
              <p class="text-zinc-800 dark:text-zinc-300">
                I work on
                <strong>
                  engineering reliable infrastructure for data-intensive,
                  AI-enabled systems</strong
                >. I care about what happens when AI components are connected to
                real data, tools, services, and production workflows: what they
                read, what they change, what they assume, and when their outputs
                can still be trusted.
              </p>
            </section>

            <section>
              <h3
                class="text-base tracking-wide font-semibold text-zinc-800 dark:text-zinc-200 mb-1"
              >
                Work So Far
              </h3>

              <p class="text-zinc-800 dark:text-zinc-300">
                I am a Graduate Research Associate at
                <strong>
                  <a
                    href="https://www.africa.engineering.cmu.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="font-medium text-indigo-500 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300"
                  >
                    Carnegie Mellon University Africa</a
                  ></strong
                >, where I study the reliability of AI agents and production AI
                systems after deployment.
              </p>

              <p class="text-zinc-800 dark:text-zinc-300 mt-2">
                I previously built a
                <a
                  href="https://athletics-performance.mblessed.space/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-medium text-indigo-500 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300"
                >
                  benchmarking platform</a
                >
                for performance anomaly detection in athletics, covering 1.5M+
                competition records, 19,000+ competitions, and 14 detection
                methods. The work was published at
                <strong>IEEE SDS 2026</strong> and received a
                <strong>Best Paper Honorable Mention</strong>.
              </p>

              <p class="text-zinc-800 dark:text-zinc-300 mt-2">
                That project <strong>shaped my current direction</strong> as the
                difficult part was not only building a detector, but showing
                whether the results meant anything and making each flag
                traceable to the evidence behind it.
              </p>
            </section>

            <section>
              <h3
                class="text-base tracking-wide font-semibold text-zinc-800 dark:text-zinc-200 mb-1"
              >
                Current Focus
              </h3>

              <p class="text-zinc-800 dark:text-zinc-300">
                My current focus is
                <strong>reliable agentic data systems:</strong> systems where AI
                agents query data, call tools, compute results, keep state, and
                produce conclusions that may become stale or invalid when the
                data, tools, or execution environment changes. I currently use
                sports analytics as a concrete workload for studying those
                infrastructure problems.
              </p>
            </section>

            <section>
              <p
                class="italic text-indigo-700 dark:text-indigo-300 font-medium"
              >
                The question I keep coming back to:
              </p>

              <blockquote
                class="border-l-4 border-indigo-400 pl-4 mt-2 text-zinc-800 dark:text-zinc-100 italic"
              >
                What should a system record about AI-enabled work over data, so
                its results can be trusted, replayed, repaired, or invalidated
                when something changes?
              </blockquote>
            </section>
          </div>
        </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>
