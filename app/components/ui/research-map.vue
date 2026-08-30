<script setup lang="ts">
  const emit = defineEmits(["close"]);

  const pillars = [
    {
      name: "Data-intensive systems",
      what: "Databases, pipelines, APIs, files, streams, indexes, and systems built around changing data.",
    },
    {
      name: "Production AI systems",
      what: "AI-enabled software once it is connected to real tools, users, services, and workflows.",
    },
    {
      name: "Reliable infrastructure",
      what: "State, logs, provenance, recovery, replay, invalidation, observability, and fault tolerance.",
    },
    {
      name: "Research engineering",
      what: "Reading papers, building artifacts, testing hypotheses, instrumenting systems, and measuring results.",
    },
  ];

  const lenses = [
    {
      name: "State and recovery",
      what: "What must survive so a run can resume after failure.",
    },
    {
      name: "Provenance",
      what: "What data, tools, code paths, and intermediate values a result depended on.",
    },
    {
      name: "Validity under change",
      what: "Whether a result still holds after data, tools, schemas, models, or environments change.",
    },
    {
      name: "Isolation of effects",
      what: "What the run changes outside itself, and whether those effects can be contained.",
    },
    {
      name: "Measurement",
      what: "How to show that the system became more dependable.",
    },
  ];

  const swaps = [
    ["Agentic data systems", "AI-generated data workflows"],
    ["Tool-using agents", "ML production pipelines"],
    ["Sports-data agent", "Scientific data assistants"],
    ["Agent replay and invalidation", "Pipeline validity and recovery"],
    ["Agent provenance", "AI system observability and lineage"],
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
          class="relative bg-white dark:bg-zinc-900 rounded-lg shadow-lg px-10 py-6 max-w-6xl w-[96vw] text-sm mx-4 max-h-[92vh] overflow-y-auto"
        >
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-xl font-bold text-zinc-900 dark:text-zinc-100">
              How I Think About My Work
            </h2>

            <button
              @click="emit('close')"
              class="text-3xl text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 ml-4 transition-colors"
              aria-label="Close"
            >
              &times;
            </button>
          </div>

          <p class="text-zinc-800 dark:text-zinc-300 mb-6 max-w-4xl">
            My broad direction is
            <strong>
              engineering reliable infrastructure for data-intensive, AI-enabled
              systems</strong
            >. My current focus is agents because they put data access, tool
            use, state, execution, and changing outputs in the same run.
          </p>

          <section class="mb-7">
            <h3
              class="text-base tracking-wide font-semibold text-zinc-800 dark:text-zinc-200 mb-3"
            >
              The Stable Core
            </h3>

            <div class="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              <div
                v-for="pillar in pillars"
                :key="pillar.name"
                class="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
              >
                <h4 class="font-semibold text-zinc-900 dark:text-zinc-100">
                  {{ pillar.name }}
                </h4>
                <p class="mt-1.5 text-zinc-600 dark:text-zinc-400">
                  {{ pillar.what }}
                </p>
              </div>
            </div>
          </section>

          <section class="mb-7">
            <h3
              class="text-base tracking-wide font-semibold text-zinc-800 dark:text-zinc-200 mb-3"
            >
              How the Direction Narrows
            </h3>

            <div
              class="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr_auto_1fr]"
            >
              <div
                class="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
              >
                <span
                  class="inline-flex rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  Broad direction
                </span>
                <h4 class="mt-2 font-semibold text-zinc-900 dark:text-zinc-100">
                  Reliable infrastructure for data-intensive AI-enabled systems
                </h4>
                <p class="mt-1.5 text-zinc-600 dark:text-zinc-400">
                  The long-term research identity.
                </p>
              </div>

              <div
                class="hidden items-center justify-center text-2xl text-zinc-300 dark:text-zinc-700 md:flex"
              >
                →
              </div>

              <div
                class="rounded-lg border border-indigo-200 bg-indigo-50/60 p-4 dark:border-indigo-900/60 dark:bg-indigo-950/30"
              >
                <span
                  class="inline-flex rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
                >
                  Current focus
                </span>
                <h4 class="mt-2 font-semibold text-zinc-900 dark:text-zinc-100">
                  Reliable agentic data systems
                </h4>
                <p class="mt-1.5 text-zinc-600 dark:text-zinc-400">
                  Agents query data, call tools, compute results, keep state,
                  and produce conclusions that may become stale or invalid.
                </p>
              </div>

              <div
                class="hidden items-center justify-center text-2xl text-zinc-300 dark:text-zinc-700 md:flex"
              >
                →
              </div>

              <div
                class="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
              >
                <span
                  class="inline-flex rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  Workload
                </span>
                <h4 class="mt-2 font-semibold text-zinc-900 dark:text-zinc-100">
                  Sports analytics agent
                </h4>
                <p class="mt-1.5 text-zinc-600 dark:text-zinc-400">
                  A concrete workload I can build, instrument, break, and
                  measure.
                </p>
              </div>
            </div>
          </section>

          <section class="mb-7">
            <h3
              class="text-base tracking-wide font-semibold text-zinc-800 dark:text-zinc-200 mb-3"
            >
              What One Run Looks Like
            </h3>

            <div
              class="overflow-x-auto rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
            >
              <svg
                viewBox="0 0 930 300"
                class="block h-auto w-full min-w-[900px]"
                role="img"
                aria-label="A tool-using AI system moves from question through plan, data access, tool calls and computation to a typed conclusion, drawing on changing data, external tools and execution state. Brackets underneath mark the spans concerned with provenance and read-sets, with state, side effects and recovery, and with measurement of reliability."
              >
                <defs>
                  <marker
                    id="rm-arrow"
                    viewBox="0 0 10 10"
                    refX="9"
                    refY="5"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path
                      d="M0,0 L10,5 L0,10 z"
                      class="fill-zinc-400 dark:fill-zinc-500"
                    />
                  </marker>
                </defs>

                <g
                  class="fill-white stroke-zinc-400 dark:fill-zinc-900 dark:stroke-zinc-600"
                  stroke-width="1.2"
                >
                  <rect x="0" y="95" width="115" height="48" rx="7" />
                  <rect x="145" y="95" width="115" height="48" rx="7" />
                  <rect x="290" y="95" width="130" height="48" rx="7" />
                  <rect x="450" y="95" width="120" height="48" rx="7" />
                  <rect x="600" y="95" width="130" height="48" rx="7" />
                  <rect x="760" y="95" width="170" height="48" rx="7" />
                </g>

                <g
                  text-anchor="middle"
                  class="fill-zinc-900 dark:fill-zinc-100"
                  font-size="12.5"
                  font-weight="600"
                >
                  <text x="57.5" y="124">Question</text>
                  <text x="202.5" y="124">Plan</text>
                  <text x="355" y="124">Data access</text>
                  <text x="510" y="124">Tool calls</text>
                  <text x="665" y="124">Compute</text>
                  <text x="845" y="124">Typed conclusion</text>
                </g>

                <g
                  class="stroke-zinc-400 dark:stroke-zinc-500"
                  stroke-width="1.3"
                  fill="none"
                >
                  <line
                    x1="115"
                    y1="119"
                    x2="139"
                    y2="119"
                    marker-end="url(#rm-arrow)"
                  />
                  <line
                    x1="260"
                    y1="119"
                    x2="284"
                    y2="119"
                    marker-end="url(#rm-arrow)"
                  />
                  <line
                    x1="420"
                    y1="119"
                    x2="444"
                    y2="119"
                    marker-end="url(#rm-arrow)"
                  />
                  <line
                    x1="570"
                    y1="119"
                    x2="594"
                    y2="119"
                    marker-end="url(#rm-arrow)"
                  />
                  <line
                    x1="730"
                    y1="119"
                    x2="754"
                    y2="119"
                    marker-end="url(#rm-arrow)"
                  />
                </g>

                <g
                  class="fill-zinc-50 stroke-zinc-300 dark:fill-zinc-800/60 dark:stroke-zinc-700"
                  stroke-width="1"
                >
                  <rect x="280" y="15" width="150" height="44" rx="7" />
                  <rect x="438" y="15" width="145" height="44" rx="7" />
                  <rect x="590" y="15" width="150" height="44" rx="7" />
                </g>

                <g
                  text-anchor="middle"
                  class="fill-zinc-900 dark:fill-zinc-100"
                  font-size="11.5"
                  font-weight="600"
                >
                  <text x="355" y="41">changing data</text>
                  <text x="510.5" y="41">external tools</text>
                  <text x="665" y="41">execution state</text>
                </g>

                <g
                  class="stroke-zinc-400 dark:stroke-zinc-500"
                  stroke-width="1.2"
                  fill="none"
                >
                  <line
                    x1="355"
                    y1="59"
                    x2="355"
                    y2="91"
                    marker-end="url(#rm-arrow)"
                  />
                  <line
                    x1="510.5"
                    y1="59"
                    x2="510.5"
                    y2="91"
                    marker-end="url(#rm-arrow)"
                  />
                  <line
                    x1="665"
                    y1="59"
                    x2="665"
                    y2="91"
                    marker-end="url(#rm-arrow)"
                  />
                </g>

                <g
                  class="stroke-indigo-500 dark:stroke-indigo-400"
                  stroke-width="1.3"
                  fill="none"
                >
                  <path d="M290,185 v7 H930 v-7" />
                  <path d="M450,220 v7 H930 v-7" />
                  <path d="M0,255 v7 H930 v-7" />
                </g>

                <g
                  text-anchor="middle"
                  class="fill-indigo-600 dark:fill-indigo-400"
                  font-size="11"
                >
                  <text x="610" y="181">provenance and read-sets</text>
                  <text x="690" y="216">state, side effects and recovery</text>
                  <text x="465" y="251">measurement of reliability</text>
                </g>
              </svg>
            </div>

            <p class="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              The hard part is knowing what the run depended on, what changed,
              and whether the result can still be trusted, replayed, repaired,
              or invalidated.
            </p>
          </section>

          <section class="mb-7">
            <h3
              class="text-base tracking-wide font-semibold text-zinc-800 dark:text-zinc-200 mb-3"
            >
              What I Look At Inside It
            </h3>

            <dl class="grid gap-3 md:grid-cols-2">
              <div
                v-for="lens in lenses"
                :key="lens.name"
                class="rounded-lg border border-zinc-200 p-4 dark:border-zinc-800"
              >
                <dt class="font-medium text-zinc-900 dark:text-zinc-100">
                  {{ lens.name }}
                </dt>
                <dd class="mt-1 text-zinc-600 dark:text-zinc-400">
                  {{ lens.what }}
                </dd>
              </div>
            </dl>
          </section>

          <section>
            <h3
              class="text-base tracking-wide font-semibold text-zinc-800 dark:text-zinc-200 mb-1"
            >
              If Agents Stop Being the Best Focus
            </h3>

            <p class="text-zinc-600 dark:text-zinc-400 mb-3">
              The core direction stays. The current workload can change.
            </p>

            <div
              class="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800"
            >
              <table class="w-full text-left">
                <thead>
                  <tr
                    class="border-b border-zinc-200 bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400"
                  >
                    <th class="px-4 py-2 font-medium">Current focus</th>
                    <th class="px-4 py-2 font-medium">Could become</th>
                  </tr>
                </thead>

                <tbody>
                  <tr
                    v-for="(row, i) in swaps"
                    :key="row[0]"
                    :class="
                      i < swaps.length - 1
                        ? 'border-b border-zinc-200 dark:border-zinc-800'
                        : ''
                    "
                  >
                    <td class="px-4 py-2 text-zinc-800 dark:text-zinc-300">
                      {{ row[0] }}
                    </td>
                    <td class="px-4 py-2 text-zinc-600 dark:text-zinc-400">
                      {{ row[1] }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>
