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
          class="relative w-[calc(100vw-2rem)] max-w-3xl max-h-[90dvh] overflow-y-auto overscroll-contain rounded-lg bg-white px-4 py-4 text-[13px] leading-5 shadow-lg dark:bg-zinc-900 sm:px-6 sm:py-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="research-map-title"
        >
          <div class="mb-3 flex items-center justify-between gap-3">
            <h2
              id="research-map-title"
              class="text-base font-semibold text-zinc-900 dark:text-zinc-100 sm:text-lg"
            >
              How I Think About My Work
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
            <div class="grid items-stretch gap-2 sm:grid-cols-[1fr_auto_1fr]">
              <section class="rounded-md border border-zinc-200 p-3 dark:border-zinc-800">
                <h3 class="text-xs text-zinc-500 dark:text-zinc-400">
                  Broad Direction
                </h3>
                <p class="mt-1 font-medium text-zinc-900 dark:text-zinc-100">
                  Production AI systems
                </p>
                <p class="mt-2 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
                  Deployed applications that run AI models on data to answer
                  questions, make predictions, or complete tasks.
                </p>
              </section>

              <div class="flex items-center justify-center text-zinc-400 dark:text-zinc-500" aria-hidden="true">
                <span class="sm:hidden">↓</span>
                <span class="hidden sm:inline">→</span>
              </div>

              <section class="rounded-md border border-indigo-200 bg-indigo-50/60 p-3 dark:border-indigo-900/60 dark:bg-indigo-950/30">
                <h3 class="text-xs text-indigo-700 dark:text-indigo-300">
                  Current Focus
                </h3>
                <p class="mt-1 font-medium text-zinc-900 dark:text-zinc-100">
                  Dependable execution of tool-using AI agents
                </p>
                <p class="mt-2 text-xs leading-5 text-zinc-600 dark:text-zinc-400">
                  Software that checks where an agent sends data, checks that
                  its actions match user approval, prevents retries from making
                  the same change twice, and records what happened.
                </p>
              </section>
            </div>

            <p class="text-xs leading-5 text-zinc-600 dark:text-zinc-400">
              I focus on checks and records that remain necessary as models improve.
            </p>

            <section class="border-l-2 border-indigo-200 pl-4 dark:border-indigo-900">
              <h3 class="mb-3 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Questions I Am Exploring
              </h3>
              <ol class="list-decimal space-y-3 pl-5 text-zinc-700 marker:text-indigo-600 dark:text-zinc-300 dark:marker:text-indigo-400">
                <li>
                  <strong class="font-semibold text-zinc-900 dark:text-zinc-100">Protecting data across a workflow:</strong>
                  How can the system enforce data-use rules as agents move or transform data?
                </li>
                <li>
                  <strong class="font-semibold text-zinc-900 dark:text-zinc-100">Keeping actions within approval:</strong>
                  How does the system ensure that an agent’s final action matches what the user authorised?
                </li>
                <li>
                  <strong class="font-semibold text-zinc-900 dark:text-zinc-100">Recording what happened:</strong>
                  What must the system record so we can check what an agent did and what changed?
                </li>
              </ol>
            </section>

            <section class="rounded-md bg-zinc-50 p-3 dark:bg-zinc-800/40">
              <h3 class="mb-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                Current Work
              </h3>
              <p class="text-zinc-700 dark:text-zinc-300">
                I am building a football-analysis agent and recording its tool
                calls to test what happens when calls fail, repeat, or run after
                approval changes.
              </p>
            </section>
          </div>
        </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>
