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
                I study infrastructure for reliable AI-generated workloads over
                tabular and other data formats. My current project focuses on
                <strong>program–data compatibility</strong>: whether a
                low-latency gate can derive exact data requirements from a
                short-lived Python program and check the source before an agent
                executes it.
              </p>
            </section>

            <section>
              <h3
                class="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200"
              >
                How I Got Here
              </h3>

              <p class="text-zinc-800 dark:text-zinc-300">
                At
                <strong>
                  <a
                    href="https://www.africa.engineering.cmu.edu/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="font-medium text-indigo-500 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300"
                  >
                    Carnegie Mellon University Africa’s SaLT Lab</a
                  ></strong
                >, I study reliability problems in agents that discover, read,
                and transform data. Previously, I built an
                <a
                  href="https://athletics-performance.mblessed.space/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-medium text-indigo-500 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300"
                >
                  athletics anomaly-detection benchmark platform</a
                >
                with over 1.5M+ performance records, 19,000+ competitions, and
                14 detection methods. The work received a
                <a
                  :href="certificateUrl"
                  class="font-semibold text-indigo-600 underline underline-offset-2 hover:text-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 dark:text-indigo-400 dark:hover:text-indigo-300"
                  aria-haspopup="dialog"
                  @click.prevent="showCertificate = true"
                  >Best Paper Honorable Mention</a
                >
                at <strong>IEEE SDS 2026</strong>. To verify and explain a
                detected anomaly, I had to trace it to the underlying
                performance and sanctions data. This showed me that reliable
                outputs depend on valid inputs and visible evidence.
              </p>
            </section>

            <section>
              <h3
                class="mb-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200"
              >
                Current Project
              </h3>
              <p class="text-zinc-800 dark:text-zinc-300">
                I am testing which failures in recorded data-agent programs can
                be predicted from exact program–data requirements. The first
                scope covers files or tables, columns, type conversions,
                null-sensitive operations, and join keys. The gate would return
                <code>run</code>, <code>block</code>, or <code>unknown</code>
                with a reason, while distinguishing source, program, executor,
                and ordinary-code failures.
              </p>
            </section>

            <section>
              <h3
                class="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200"
              >
                Current Work
              </h3>
              <p class="text-zinc-800 dark:text-zinc-300">
                I studied
                <a
                  href="https://ssc.io/pdf/duckdq.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-medium text-indigo-500 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300"
                  >DuckDQ</a
                >
                and
                <a
                  href="https://arxiv.org/abs/2604.21765"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-medium text-indigo-500 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300"
                  >PrismaDV</a
                >
                to understand efficient assertion execution and code-informed
                test generation. Next, I will inspect one DABstep run containing
                one failed cell and two successful cells, classify each result,
                and implement one exact check if the evidence supports it. In
                parallel, I am exploring schema-aware checks for generated SQL
                in
                <a
                  href="https://sedge.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-medium text-indigo-500 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300"
                  >Sedge</a
                >
                using
                <a
                  href="https://github.com/ajitpratap0/GoSQLX"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-medium text-indigo-500 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300"
                  >GoSQLX</a
                >.
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
