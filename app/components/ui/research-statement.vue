<script setup lang="ts">
  const emit = defineEmits(["close"]);
  const showCertificate = ref(false);
  const certificateUrl = "/images/awards/sds2026-certificate.jpg";
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        @click.self="emit('close')"
      >
        <div
          class="relative w-[calc(100vw-2rem)] max-w-3xl max-h-[90dvh] overflow-y-auto overscroll-contain rounded-lg bg-white px-4 py-4 text-[13px] leading-5 shadow-lg dark:bg-zinc-900 sm:px-6 sm:py-5 [&_strong]:font-medium"
          role="dialog"
          aria-modal="true"
          aria-labelledby="research-statement-title"
        >
          <div class="mb-3 flex items-center justify-between gap-3">
            <h2
              id="research-statement-title"
              class="text-base font-semibold text-zinc-900 dark:text-zinc-100 sm:text-lg"
            >
              Research &amp; Engineering Focus
            </h2>

            <button
              @click="emit('close')"
              class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-2xl text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
              aria-label="Close"
            >
              &times;
            </button>
          </div>

          <div class="space-y-4">
            <section>
              <h3
                class="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200"
              >
                Purpose
              </h3>
              <blockquote
                class="mt-1.5 border-l-4 border-indigo-400 pl-3 font-semibold italic text-zinc-800 dark:text-zinc-100"
              >
                Enable people to delegate data-intensive work while keeping
                execution controlled and results supported as the system changes.
              </blockquote>
            </section>

            <section>
              <p class="text-zinc-800 dark:text-zinc-300">
                I am interested in
                <strong>
                  systems and infrastructure for AI agents that operate over real
                  data, tools, and services</strong
                >. I care about what happens underneath these agents as they
                execute real work: how their work is represented and executed,
                what state and evidence it depends on, how failures are handled,
                and whether results remain valid as data and environments change.
              </p>
            </section>

            <section>
              <h3
                class="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200"
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
                <a
                  :href="certificateUrl"
                  class="font-semibold text-indigo-600 underline underline-offset-2 hover:text-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 dark:text-indigo-400 dark:hover:text-indigo-300"
                  aria-haspopup="dialog"
                  @click.prevent="showCertificate = true"
                  >Best Paper Honorable Mention</a
                >.
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
                class="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200"
              >
                Current Focus
              </h3>

              <p class="text-zinc-800 dark:text-zinc-300">
                I am currently exploring two related systems problems. The first
                is <strong>execution reliability</strong>: how agent-driven work
                should manage state, recovery, provenance, reproducibility, and
                external effects. The second is
                <strong>data and evidence validity</strong>: how systems can
                determine whether the information an agent relied on is still
                correct and whether its conclusions remain supported when
                underlying data or environments change. I use data-intensive
                workloads, including sports analytics, as concrete systems I can
                build, instrument, break, and measure.
              </p>
            </section>

            <section>
              <p
                class="italic text-indigo-700 dark:text-indigo-300 font-medium"
              >
                The question I keep coming back to:
              </p>

              <blockquote
                class="mt-1.5 border-l-4 border-indigo-400 pl-3 italic text-zinc-800 dark:text-zinc-100"
              >
                How should we build the systems underneath AI agents that operate
                over real data and tools?
              </blockquote>
            </section>
          </div>
        </div>
      </div>
    </Teleport>
    <ui-image-modal
      v-if="showCertificate"
      :src="certificateUrl"
      alt="SDS 2026 Honorable Mention - Best Full Paper Award certificate"
      @close="showCertificate = false"
    />
  </ClientOnly>
</template>
