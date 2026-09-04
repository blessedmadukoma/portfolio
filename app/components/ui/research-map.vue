<script setup lang="ts">
  const emit = defineEmits(["close"]);

  const pillars = [
    {
      name: "Agent systems",
      what: "Agents that plan, use tools, access data, and perform multi-step work.",
    },
    {
      name: "Data-intensive systems",
      what: "Databases, pipelines, APIs, files, streams, indexes, and changing data.",
    },
    {
      name: "Systems infrastructure",
      what: "Execution, state, recovery, provenance, coordination, isolation, observability, and related mechanisms.",
    },
  ];

  const focusAreas = [
    {
      name: "Execution reliability",
      items: [
        [
          "State and recovery",
          "What must survive so a run can resume after failure.",
        ],
        [
          "Provenance and reproducibility",
          "What data, tools, code paths, and intermediate values a result depended on, and what is needed to reproduce it.",
        ],
        [
          "External effects and isolation",
          "What the run changes outside itself, and whether those effects can be contained.",
        ],
      ],
    },
    {
      name: "Data and evidence validity",
      items: [
        [
          "Data dependencies",
          "What data and environmental conditions a conclusion relies on.",
        ],
        [
          "Validity under change",
          "Whether a result still holds after data, tools, schemas, models, or environments change.",
        ],
        [
          "Supported conclusions",
          "Whether the available evidence still supports the conclusion the system produced.",
        ],
      ],
    },
    {
      name: "Across both problem areas",
      items: [
        ["Measurement", "How to show that the system became more dependable."],
      ],
    },
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
          class="relative w-[calc(100vw-2rem)] max-w-5xl max-h-[90dvh] overflow-y-auto overscroll-contain rounded-lg bg-white px-4 py-4 text-[13px] leading-5 shadow-lg dark:bg-zinc-900 sm:px-6 sm:py-5"
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

          <p class="mb-5 text-zinc-700 dark:text-zinc-300">
            My broad direction is
            <strong class="font-medium">
              systems and infrastructure for AI agents that operate over real
              data, tools, and services</strong
            >. <br />
            I am particularly interested in what infrastructure these systems
            need to <b class="font-medium">execute work reliably</b> and to
            <b class="font-medium">keep their results valid</b>
            as the <b class="font-medium">underlying world changes</b>.
          </p>

          <section class="mb-5">
            <h3
              class="mb-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200"
            >
              The Stable Core
            </h3>

            <div class="grid gap-2.5 md:grid-cols-3">
              <div
                v-for="pillar in pillars"
                :key="pillar.name"
                class="min-w-0 rounded-md border border-zinc-200 p-3 dark:border-zinc-800"
              >
                <h4 class="font-semibold text-zinc-900 dark:text-zinc-100">
                  {{ pillar.name }}
                </h4>
                <p class="mt-1 text-xs leading-[1.5] text-zinc-600 dark:text-zinc-400">
                  {{ pillar.what }}
                </p>
              </div>
            </div>
          </section>

          <section class="mb-5">
            <h3
              class="mb-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200"
            >
              How I Work
            </h3>

            <p
              class="rounded-md bg-zinc-50 px-3 py-2 text-xs leading-5 text-zinc-600 dark:bg-zinc-800/40 dark:text-zinc-400"
            >
              Identify a practical need → examine prior work → build and
              instrument systems → form and test hypotheses → measure results →
              refine the claim.
            </p>
          </section>

          <section class="mb-5">
            <h3
              class="mb-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200"
            >
              How the Direction Narrows
            </h3>

            <div
              class="grid items-stretch gap-2 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)]"
            >
              <div
                class="min-w-0 rounded-md border border-zinc-200 p-3 dark:border-zinc-800"
              >
                <span
                  class="inline-flex rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] leading-4 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  Research umbrella
                </span>
                <h4 class="mt-1.5 font-medium text-zinc-900 dark:text-zinc-100">
                  Systems infrastructure for AI agents
                </h4>
                <p class="mt-1 text-xs leading-[1.5] text-zinc-600 dark:text-zinc-400">
                  The long-term research identity.
                </p>
              </div>

              <div
                class="hidden items-center justify-center text-lg text-zinc-400 dark:text-zinc-600 md:flex"
                aria-hidden="true"
              >
                →
              </div>

              <div
                class="min-w-0 rounded-md border border-indigo-200 bg-indigo-50/60 p-3 dark:border-indigo-900/60 dark:bg-indigo-950/30"
              >
                <span
                  class="inline-flex rounded-full bg-indigo-100 px-2 py-0.5 text-[11px] font-medium leading-4 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
                >
                  Current problem areas
                </span>
                <h4 class="mt-1.5 font-medium text-zinc-900 dark:text-zinc-100">
                  Execution reliability + data and evidence validity
                </h4>
                <p class="mt-1 text-xs leading-[1.5] text-zinc-600 dark:text-zinc-400">
                  Related systems problems in agent-driven work over real data,
                  tools, and services.
                </p>
              </div>

              <div
                class="hidden items-center justify-center text-lg text-zinc-400 dark:text-zinc-600 md:flex"
                aria-hidden="true"
              >
                →
              </div>

              <div
                class="min-w-0 rounded-md border border-zinc-200 p-3 dark:border-zinc-800"
              >
                <span
                  class="inline-flex rounded-full bg-zinc-100 px-2 py-0.5 text-[11px] leading-4 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  Experimental workloads
                </span>
                <h4 class="mt-1.5 font-medium text-zinc-900 dark:text-zinc-100">
                  Sports analytics and data-intensive workflows
                </h4>
                <p class="mt-1 text-xs leading-[1.5] text-zinc-600 dark:text-zinc-400">
                  Concrete systems I can build, instrument, break, and measure.
                </p>
              </div>
            </div>
          </section>

          <section class="mb-5">
            <h3
              class="mb-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200"
            >
              What One Run Looks Like
            </h3>

            <div
              class="overflow-x-auto rounded-md border border-zinc-200 p-2 dark:border-zinc-800 sm:p-3"
              tabindex="0"
              role="region"
              aria-label="Agent execution diagram; scroll horizontally on smaller screens"
            >
              <svg
                viewBox="0 0 930 300"
                class="mx-auto block h-auto w-full min-w-[900px] max-w-[930px]"
                role="img"
                aria-label="A tool-using AI system moves from question through plan, data access, tool calls, and computation to a typed conclusion. Annotations show the related concerns of data and evidence validity, execution reliability, and measurement across both."
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
                  <path d="M145,220 v7 H730 v-7" />
                  <path d="M0,255 v7 H930 v-7" />
                </g>

                <g
                  text-anchor="middle"
                  class="fill-indigo-600 dark:fill-indigo-400"
                  font-size="11"
                >
                  <text x="610" y="181">data and evidence validity</text>
                  <text x="437" y="216">execution reliability</text>
                  <text x="465" y="251">measurement across both</text>
                </g>
              </svg>
            </div>

            <p class="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              The infrastructure must support reliable execution and show
              whether the data and evidence still support each result as the
              world changes.
            </p>
          </section>

          <section>
            <h3
              class="mb-2 text-sm font-semibold text-zinc-800 dark:text-zinc-200"
            >
              What I Look At Inside It
            </h3>

            <div class="grid gap-2.5 md:grid-cols-2">
              <section
                v-for="area in focusAreas"
                :key="area.name"
                class="min-w-0 rounded-md border border-zinc-200 p-3 dark:border-zinc-800"
                :class="area.items.length === 1 ? 'md:col-span-2' : ''"
              >
                <h4 class="mb-2 font-semibold text-zinc-900 dark:text-zinc-100">
                  {{ area.name }}
                </h4>
                <dl class="space-y-2">
                  <div
                    v-for="(item, index) in area.items"
                    :key="item[0]"
                    :class="index > 0 ? 'border-t border-zinc-100 pt-2 dark:border-zinc-800' : ''"
                  >
                    <dt class="font-medium text-zinc-900 dark:text-zinc-100">
                      {{ item[0] }}
                    </dt>
                    <dd class="mt-0.5 text-xs leading-[1.5] text-zinc-600 dark:text-zinc-400">
                      {{ item[1] }}
                    </dd>
                  </div>
                </dl>
              </section>
            </div>
          </section>
        </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>
