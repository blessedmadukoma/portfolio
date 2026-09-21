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
                I study
                <strong>infrastructure for reliable AI-generated workloads</strong>,
                from one-off programs to multi-step pipelines that work with
                tabular and other data. My current research asks how a system
                can derive and check the data requirements of short-lived
                Python programs over tabular data before an AI agent runs them.
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
                systems.
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
                performance records, 19,000+ competitions, and 14 detection
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
                While building the athletics system, I had to trace each
                detected anomaly back to the underlying performance and
                sanctions data so I could verify and explain it. This showed me
                that reliable outputs depend on valid inputs and visible
                evidence, which led me to study whether systems can check the
                data requirements of AI-generated workloads before execution.
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
                  <strong class="!font-semibold">Finding exact requirements:</strong>
                  Which table, column, type, null, and operation requirements
                  can the system derive from generated Python code?
                </li>
                <li>
                  <strong class="!font-semibold">Catching the right failures:</strong>
                  Which failures come from the source data, and which come from
                  the generated program or its execution environment?
                </li>
                <li>
                  <strong class="!font-semibold">Checking before execution:</strong>
                  Can the system generate and run useful checks fast enough for
                  programs that an agent creates and uses once?
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
                I have completed an initial study of
                <a
                  href="https://ssc.io/pdf/duckdq.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-medium text-indigo-500 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300"
                >DuckDQ</a>
                and
                <a
                  href="https://arxiv.org/abs/2604.21765"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-medium text-indigo-500 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300"
                >PrismaDV</a>, which cover fast data assertions and
                code-informed test generation.
                My next step is to inspect failed and successful DABstep cells
                and test whether an exact pre-execution check could detect a
                real source-data failure. In parallel, I am prototyping
                schema-aware validation for generated SQL in
                <a
                  href="https://sedge.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-medium text-indigo-500 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300"
                >Sedge</a> using
                <a
                  href="https://github.com/ajitpratap0/GoSQLX"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-medium text-indigo-500 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300"
                >GoSQLX</a>.
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
