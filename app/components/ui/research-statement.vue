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
              <p class="text-zinc-800 dark:text-zinc-300">
                I am interested in making
                <strong>production AI systems dependable</strong>. My current
                focus is <strong>AI agents</strong> that read data, call tools,
                save intermediate results, and update files or records. I focus
                on checks and records that remain necessary as models improve.
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
                That project <strong>shaped my current direction</strong>.
                I needed to check whether each flagged performance was supported
                by the data and show the records behind it.
              </p>
            </section>

            <section>
              <h3
                class="mb-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200"
              >
                Questions I Am Exploring
              </h3>

              <ol class="list-decimal space-y-2 pl-5 text-zinc-800 dark:text-zinc-300">
                <li>
                  <strong class="!font-semibold">Protecting data across a workflow:</strong>
                  How can the system enforce data-use rules as agents move or
                  transform data?
                </li>
                <li>
                  <strong class="!font-semibold">Keeping actions within approval:</strong>
                  How does the system ensure that an agent’s final action
                  matches what the user authorised?
                </li>
                <li>
                  <strong class="!font-semibold">Recording what happened:</strong>
                  What must the system record so we can check what an agent did
                  and what changed?
                </li>
              </ol>
            </section>

            <section>
              <h3
                class="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200"
              >
                Current Work
              </h3>
              <p class="text-zinc-800 dark:text-zinc-300">
                I am building a small football-analysis agent and recording its
                tool calls to test what happens when calls fail, repeat, or run
                after approval changes. For each test, I specify what should
                happen, what the run record must show, and what checks could
                prevent an incorrect action. I use these tests and prior research
                to choose a specific problem to study.
              </p>
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
