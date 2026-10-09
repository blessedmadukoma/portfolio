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
              Research Statement
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
              <p class="text-zinc-800 dark:text-zinc-300">
                I study how to keep AI-powered data systems correct as data,
                definitions, access rules and tools change, and what that
                costs. Agents now write and run analysis code over
                organisational data. Their answers depend on the data version,
                the definitions and the rows they can see.
              </p>
            </section>

            <section>
              <h3 class="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                What I Mean by Correct
              </h3>
              <p class="text-zinc-800 dark:text-zinc-300">
                By correct, I mean an answer that matches a reference answer
                computed with full, current information, or one that says
                clearly that it is partial. By cost, I mean cost per correct
                answer, checks or recomputations per change, and unnecessary
                interventions.
              </p>
            </section>

            <section>
              <h3 class="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                What I Have Found
              </h3>
              <p class="text-zinc-800 dark:text-zinc-300">
                At
                <a
                  href="https://www.africa.engineering.cmu.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-medium text-indigo-500 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300"
                  >Carnegie Mellon University Africa’s SaLT Lab</a
                >, I worked with Prof. Prasenjit Mitra on agents that write
                analysis code. I analysed 283,435 recorded steps across six
                benchmarks. Traces did not always record the code that ran or
                the result the model received. In a pre-registered rerun,
                executing the model’s code as written removed the failures
                caused by the harness’s code wrapper, without a detectable
                change in accuracy.
              </p>
              <p class="mt-2 text-zinc-800 dark:text-zinc-300">
                Separately, in a
                <NuxtLink
                  to="/blog/does-an-ai-agent-know-when-it-cannot-see-all-the-data"
                  class="font-medium text-indigo-500 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300"
                  >pre-registered study</NuxtLink
                >
                on five public databases
                with row-level access rules, cheaper models that were not told
                the rules presented partial answers as complete in 70–95% of
                affected cases with a final answer.
              </p>
            </section>

            <section>
              <h3 class="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                What I Want to Study Next
              </h3>
              <p class="text-zinc-800 dark:text-zinc-300">
                I want to track an analysis’s dependencies on data versions,
                definitions, access scope and tool behaviour. When one of them
                changes, the system could select a check, a recomputation, a
                partial-answer label or abstention. I would compare this with
                refreshing all context or changing nothing. A related question
                is how to provide useful coverage labels without revealing
                protected data.
              </p>
              <p class="mt-2 text-zinc-800 dark:text-zinc-300">
                I am also building
                <a
                  href="https://sedge.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-medium text-indigo-500 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300"
                  >Sedge</a
                >, a data operating system in development that keeps a
                catalogue of what a company’s data means and uses it to answer
                questions with AI. Its planned
                access rules and change tracking
                are where I can test these methods on a working system.
              </p>
            </section>

            <section>
              <h3 class="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Earlier Work
              </h3>
              <p class="text-zinc-800 dark:text-zinc-300">
                I built an
                <a
                  href="https://athletics-performance.mblessed.space/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-medium text-indigo-500 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300"
                  >athletics anomaly-detection benchmark platform</a
                >
                over 1.6 million performances from more than 19,000
                competitions. Our full paper benchmarked eight methods and
                received the
                <a
                  :href="certificateUrl"
                  class="font-semibold text-indigo-600 underline underline-offset-2 hover:text-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 dark:text-indigo-400 dark:hover:text-indigo-300"
                  aria-haspopup="dialog"
                  @click.prevent="showCertificate = true"
                  >Honorable Mention - Best Paper Award</a
                >
                at the 13th IEEE Swiss Conference on Data Science and AI
                (SDS2026). A flag there is a starting point for investigation,
                not a verdict.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Teleport>
    <ui-image-modal
      v-if="showCertificate"
      :src="certificateUrl"
      alt="SDS 2026 Honorable Mention - Best Paper Award certificate"
      @close="showCertificate = false"
    />
  </ClientOnly>
</template>
