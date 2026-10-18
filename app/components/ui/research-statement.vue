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
                I study how to keep AI-powered data systems
                <span class="font-semibold text-zinc-900 dark:text-zinc-100">correct</span>
                as <em>data</em>, <em>definitions</em>, <em>access rules</em>
                and <em>tools</em> change, and what that costs. A correct
                answer matches complete, up-to-date data, or it says clearly
                that it is incomplete.
              </p>
            </section>

            <section>
              <h3 class="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                What I Have Found
              </h3>
              <p class="text-zinc-800 dark:text-zinc-300">
                With Prof. Prasenjit Mitra at
                <a
                  href="https://language-lab-gamma.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-medium text-indigo-500 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300"
                  >CMU Africa’s SaLT Lab</a
                >, I studied AI agents that write code to analyse data.
              </p>
              <ul class="mt-2 list-disc space-y-1.5 pl-5 text-zinc-800 dark:text-zinc-300">
                <li>
                  <span class="font-semibold text-zinc-900 dark:text-zinc-100">Logs can blame the model for the software around it.</span>
                  In DataAgentBench’s public logs, that software made 21.6% of
                  the agents’ code steps fail, and the logs showed these
                  failures as the model’s own. Removing them changed how six
                  models ranked (<a
                    href="https://github.com/blessedmadukoma/data-agent-traces"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="font-medium text-indigo-500 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300"
                    >code</a
                  >).
                </li>
                <li>
                  <span class="font-semibold text-zinc-900 dark:text-zinc-100">Errors the model can see are the smaller problem.</span>
                  A checker that stops code from using columns or files that do
                  not exist raised accuracy by only 0.68 points. A clear error
                  message worked as well.
                </li>
                <li>
                  <span class="font-semibold text-zinc-900 dark:text-zinc-100">Errors the model cannot see stay silent.</span>
                  When access rules hid some rows and the model was not told,
                  cheaper models presented incomplete answers as complete in
                  70–95% of affected cases (<NuxtLink
                    to="/blog/does-an-ai-agent-know-when-it-cannot-see-all-the-data"
                    class="font-medium text-indigo-500 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300"
                    >study</NuxtLink
                  >).
                </li>
              </ul>
            </section>

            <section>
              <h3 class="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Why I Work on Silent Errors
              </h3>
              <p class="text-zinc-800 dark:text-zinc-300">
                Better models will keep fixing errors they can see. They cannot
                fix what the data does not show, such as a definition that
                changed or rows they may not read. People still act on these
                answers, so the system has to catch them. For example, my
                Fantasy Premier League agent once reported the wrong scores for
                a footballer, while its log showed a successful step.
              </p>
            </section>

            <section>
              <h3 class="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                What I Am Working On
              </h3>
              <p class="text-zinc-800 dark:text-zinc-300">
                When something an answer depends on changes, which answers
                become wrong, and what is the cheapest way to fix or flag them?
                I am working on this in
                <a
                  href="https://sedge.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-medium text-indigo-500 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300"
                  >Sedge</a
                >, a data operating system I am building that uses AI to answer
                questions about a company’s data.
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
                competitions (2010–2025), with 8+ detection methods. It links
                each flag to its evidence, so a flag is a starting point for
                investigation, not a verdict. Our full paper received the
                <a
                  :href="certificateUrl"
                  class="font-semibold text-indigo-600 underline underline-offset-2 hover:text-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 dark:text-indigo-400 dark:hover:text-indigo-300"
                  aria-haspopup="dialog"
                  @click.prevent="showCertificate = true"
                  >Honorable Mention - Best Paper Award</a
                >
                at the 13th IEEE Swiss Conference on Data Science and AI
                (SDS2026).
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
