<script setup lang="ts">
  const props = withDefaults(
    defineProps<{ initialView?: "statement" | "map" }>(),
    { initialView: "statement" },
  );
  const emit = defineEmits(["close"]);
  const showCertificate = ref(false);
  const certificateUrl = "/images/awards/sds2026-certificate.jpg";

  // Two views of the same research: the written statement and the research map.
  const view = ref<"statement" | "map">(props.initialView);
  const panel = ref<HTMLElement | null>(null);
  watch(view, () => panel.value?.scrollTo({ top: 0 }));
  const tabClass = (v: "statement" | "map") => [
    "rounded px-2.5 py-1 font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400",
    view.value === v
      ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-100"
      : "text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200",
  ];
</script>

<template>
  <ClientOnly>
    <Teleport to="body">
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
        @click.self="emit('close')"
      >
        <div
          ref="panel"
          class="relative w-[calc(100vw-2rem)] max-w-3xl lg:max-w-4xl max-h-[90dvh] overflow-y-auto overscroll-contain rounded-lg bg-white px-4 py-4 text-[13px] leading-5 shadow-lg dark:bg-zinc-900 sm:px-6 sm:py-5 [&_strong]:font-medium"
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

            <div class="ml-auto flex items-center gap-2">
              <div
                role="tablist"
                aria-label="Choose a view"
                class="inline-flex rounded-md bg-zinc-100 p-0.5 text-xs dark:bg-zinc-800"
              >
                <button
                  role="tab"
                  :aria-selected="view === 'statement'"
                  :class="tabClass('statement')"
                  @click="view = 'statement'"
                >
                  Text
                </button>
                <button
                  role="tab"
                  :aria-selected="view === 'map'"
                  :class="tabClass('map')"
                  @click="view = 'map'"
                >
                  Map
                </button>
              </div>

            <button
              @click="emit('close')"
              class="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-2xl text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
              aria-label="Close"
            >
              &times;
            </button>
            </div>
          </div>

          <ui-research-map-diagram v-if="view === 'map'" />

          <div v-else class="space-y-4">
            <section>
              <p class="text-zinc-800 dark:text-zinc-300">
                I study which changes to AI-powered data systems make their
                answers <span class="font-semibold text-zinc-900 dark:text-zinc-100">complete and up to date</span>, or clear about
                what they lack, and at what cost. A correct answer matches
                complete, up-to-date data, or it says clearly that it is
                incomplete or out of date. Cost means what a change adds: time,
                tokens, needless warnings, or information leaked to someone who
                may not see it.
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
                >, I studied AI agents that write code to analyse data, and I
                have continued this work since.
              </p>
              <ul class="mt-2 list-disc space-y-1.5 pl-5 text-zinc-800 dark:text-zinc-300">
                <li>
                  <span class="font-semibold text-zinc-900 dark:text-zinc-100">Partial answers presented as complete.</span>
                  When access rules hid some rows and the model was not told,
                  three cheaper models presented partial answers as complete in
                  70–95% of affected cases. A stronger model made the opposite
                  mistake: in a small sample, it doubted 8 of its 16 complete answers (<NuxtLink
                    to="/blog/does-an-ai-agent-know-when-it-cannot-see-all-the-data"
                    class="font-medium text-indigo-500 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300"
                    >study</NuxtLink
                  >).
                </li>
                <li>
                  <span class="font-semibold text-zinc-900 dark:text-zinc-100">A log may not show what ran.</span>
                  The harness is the software that runs the model’s code. In
                  DataAgentBench’s public logs, it made 21.6% of Python steps
                  fail, and the logs show those failures as the model’s (<a
                    href="https://github.com/blessedmadukoma/data-agent-traces"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="font-medium text-indigo-500 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300"
                    >code</a
                  >; <NuxtLink
                    to="/research/data-agent-traces#summary"
                    class="font-medium text-indigo-500 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300"
                    >close-out page</NuxtLink
                  >). All 11 smolagents versions I tested, from 1.0 to 1.26,
                  silently swap a missing variable for a similar one and log
                  success.
                </li>
                <li>
                  <span class="font-semibold text-zinc-900 dark:text-zinc-100">Fewer errors meant only slightly better answers.</span>
                  A checker that stops code from naming columns or files that do
                  not exist cut one model’s errors from 3,316 to 2, but raised its
                  accuracy by only 1.44 points. It gave no detectable gain over a
                  plain error message that lists the existing names.
                </li>
              </ul>
            </section>

            <section>
              <h3 class="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                Where This Started
              </h3>
              <p class="text-zinc-800 dark:text-zinc-300">
                I am curious about what data can tell us that we aren’t seeing
                yet. That curiosity runs through my COVID-19 vulnerability study
                and my athletics research. Finding a pattern raises further
                questions: what produced it, what the analysis leaves out, and
                whether someone can act on it. AI systems now produce answers
                with much less manual work, and nobody reads every step, so those
                questions now fall on the system.
              </p>
            </section>

            <section>
              <h3 class="mb-1 text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                What I Am Working On
              </h3>
              <p class="text-zinc-800 dark:text-zinc-300">
                One question connects this work:
              </p>
              <p class="mt-1.5 border-l-2 border-indigo-300 pl-3 font-medium text-zinc-900 dark:border-indigo-700 dark:text-zinc-100">
                When can someone act on an answer computed from data, and which
                changes to the system make that true more often, at a cost they
                can afford?
              </p>
              <ul class="mt-2 list-disc space-y-1.5 pl-5 text-zinc-800 dark:text-zinc-300">
                <li>
                  <span class="font-semibold text-zinc-900 dark:text-zinc-100">Scope.</span>
                  Does the answer say what data it covered, including rows the
                  user may not read?
                  <span class="mt-0.5 block text-xs text-zinc-500 dark:text-zinc-400">Research: fine-grained access control. Industry:
                    row-level security.</span>
                </li>
                <li>
                  <span class="font-semibold text-zinc-900 dark:text-zinc-100">Evidence.</span>
                  What must come with an answer so that someone else can check
                  it, and does the log show what actually ran?
                  <span class="mt-0.5 block text-xs text-zinc-500 dark:text-zinc-400">Research: data provenance. Industry: agent
                    observability and audit logs.</span>
                </li>
                <li>
                  <span class="font-semibold text-zinc-900 dark:text-zinc-100">Change (planned).</span>
                  Which answers already given become wrong when data, definitions
                  or access rules change?
                  <span class="mt-0.5 block text-xs text-zinc-500 dark:text-zinc-400">Research: incremental view maintenance. Industry:
                    keeping AI answers, caches and reports current.</span>
                </li>
              </ul>
              <p class="mt-2 text-zinc-800 dark:text-zinc-300">
                Next, I am testing whether a system can tell an agent when hidden
                rows change its answer, with a known, limited leak and far fewer
                false warnings. I build these ideas into
                <a
                  href="https://sedge.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="font-medium text-indigo-500 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300"
                  >Sedge</a
                >, a data operating system that uses AI to answer questions about
                a company’s data.
              </p>
              <button
                class="mt-2 text-xs font-medium text-indigo-500 underline hover:text-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-400 dark:text-indigo-400 dark:hover:text-indigo-300"
                @click="view = 'map'"
              >
                See this work as a map
              </button>
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
                competitions (2010–2025), with eight detection methods. It links
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
