<script setup lang="ts">
  // Close-out of the data-agent-traces study (Sep – Nov 2026). Two screens,
  // Summary and Evidence. From md up, each screen fits a laptop screen
  // (1280 x 720 and larger) without scrolling. Unlisted: no link to it yet.
  definePageMeta({ layout: false, colorMode: "light" });

  useHead({
    title: "What agent traces do not record | Blessed M.",
    meta: [
      { name: "robots", content: "noindex, nofollow" },
      {
        name: "description",
        content:
          "Close-out of my study of AI data agents: what the public traces do not record, what did not work, why I stopped, and what I test next.",
      },
    ],
  });

  type Tone = "plain" | "good" | "warn" | "bad" | "accent";
  type Screen = "summary" | "evidence";

  const screen = ref<Screen>("summary");
  const mainEl = ref<HTMLElement | null>(null);

  function show(name: Screen) {
    screen.value = name;
    mainEl.value?.scrollTo({ top: 0 });
  }

  const tabs: { key: Screen; label: string }[] = [
    { key: "summary", label: "Summary" },
    { key: "evidence", label: "Evidence" },
  ];

  const badge: Record<Tone, string> = {
    plain: "border-zinc-200 bg-zinc-100 text-zinc-600",
    good: "border-emerald-200 bg-emerald-50 text-emerald-700",
    warn: "border-amber-200 bg-amber-50 text-amber-700",
    bad: "border-red-200 bg-red-50 text-red-600",
    accent: "border-indigo-200 bg-indigo-50 text-indigo-600",
  };

  const link =
    "font-medium text-indigo-500 underline underline-offset-2 hover:text-indigo-700";

  const repoUrl = "https://github.com/blessedmadukoma/data-agent-traces";
  const zenodoUrl = "https://doi.org/10.5281/zenodo.23352753";
  const studyUrl =
    "/blog/does-an-ai-agent-know-when-it-cannot-see-all-the-data";

  const keepText =
    "smolagents, a popular agent library, quietly replaces a variable name that does not exist with a similar one, and the trace says the step worked. All 11 versions I tested do this.";

  // The proofs are fixed text written here, so v-html is safe.
  const beats: {
    n: number;
    step: string;
    tone: Tone;
    claim: string;
    proof: string;
  }[] = [
    {
      n: 1,
      step: "Problem",
      tone: "plain",
      claim:
        "Researchers judge AI models by the mistakes recorded in their traces.",
      proof:
        "Two well-known test suites for data agents, DataAgentBench and DABstep, publish their traces: <b>273,090 steps</b> in total. I checked whether each recorded mistake was really the model’s.",
    },
    {
      n: 2,
      step: "Finding",
      tone: "good",
      claim:
        "The harness caused many of the mistakes that the traces show as the model’s.",
      proof:
        "In DataAgentBench, the harness broke about <b>one in five</b> of the Python programs the models wrote (21.6%). It placed each program inside a text string, which changed some characters, so correct programs failed. The trace still showed the model’s program next to the error. Without these failures, the order of the six models by number of mistakes changes: gpt-5.1 falls from <b>second to fourth</b> place.",
    },
    {
      n: 3,
      step: "What did not work",
      tone: "warn",
      claim:
        "Stopping a common mistake before it happened made the final answers only slightly better.",
      proof:
        "The mistake was a program that asks for a file or column that does not exist. My checker stopped almost all of them: for one model, they fell from <b>3,316 to 2</b>. Yet the share of correct answers rose by only <b>1.4 percentage points</b>, from 55.9% to 57.3%. A simple error message that lists the files and columns that do exist helped about as much; my experiments could not tell the two apart.",
    },
    {
      n: 4,
      step: "Why I stopped",
      tone: "bad",
      claim:
        "My main finding turned out to be a deliberate design choice, others had already published the general idea, and my evidence was too thin.",
      proof:
        "DataAgentBench’s own instructions say the program “will be quoted by triple double-quotes and passed as a string”, and its authors confirmed this is deliberate. At least <b>seven</b> studies from 2026 already show that a harness can change an agent’s results. My controlled reruns used only <b>two models</b>, and after I fixed the harness, one model’s share of correct answers fell by 9.6 percentage points, for a reason I could not find.",
    },
    {
      n: 5,
      step: "Next",
      tone: "accent",
      claim:
        "I will test whether the system around an agent can warn it when hidden rows change its answer, and reveal only a small, measured amount about those rows.",
      proof: `In my <a href="${studyUrl}" class="${link}">earlier study</a>, access rules hid some rows of a database. A warning based only on the access rule revealed nothing, but it also flagged <b>45%</b> of answers that were in fact complete. An exact warning was always right, but a short script could use it to work out totals the user may not see, with 17 to 23 questions for each total. Next, I build warnings between these two and measure both costs: false alarms and leaked information.`,
    },
  ];

  const effects: {
    n: number;
    name: string;
    source: string;
    what: string;
    size: string;
  }[] = [
    {
      n: 1,
      name: "String embedding",
      source: "DataAgentBench · source code",
      what: 'Puts the code in a string, so Python decodes <span class="font-mono">\\n</span> first',
      size: "21.6% of Python steps fail",
    },
    {
      n: 2,
      name: "Dropped variables",
      source: "6 DABstep submissions · inferred",
      what: "Appears to run each step in a fresh process",
      size: "6,799 failed steps",
    },
    {
      n: 3,
      name: "Replaced keys",
      source: "smolagents 1.0–1.4 · inferred",
      what: "Returns the most similar key for a missing one",
      size: "23 reads logged as working",
    },
    {
      n: 4,
      name: "Cut results",
      source: "DataAgentBench · source code",
      what: "Returns at most 5 MongoDB documents, no marker",
      size: "85.9% of 6,306 rerun queries cut",
    },
  ];

  const experiments: {
    name: string;
    setup: string;
    result: string;
    verdict: string;
    tone: Tone;
  }[] = [
    {
      name: "Rerun, gpt-oss:120b",
      setup: "54 tasks × 10 runs, released vs fixed harness",
      result: "Syntax errors 23.7% → 0%. Accuracy −1.0 pts (CI −5.7 to +3.4)",
      verdict: "fix works",
      tone: "good",
    },
    {
      name: "Rerun, gpt-5-mini",
      setup: "54 tasks × 5 runs, same two harnesses",
      result:
        "Syntax errors 26.8% → 0%. Accuracy 44.7% → 35.1% (CI −14.2 to −5.1)",
      verdict: "unexplained",
      tone: "warn",
    },
    {
      name: "2×2 rerun, gpt-5-mini",
      setup: "Code fix vs the prompt sentence it changed",
      result: "Stopped at 212 runs, 1 of 5 rounds: API credit ran out",
      verdict: "not finished",
      tone: "plain",
    },
    {
      name: "Checker vs error message",
      setup: "QRData, 411 questions × 10 runs, 2 models",
      result:
        "Checker +0.68 pts, message +1.00 pts. Difference −0.32 (CI −0.84 to +0.19)",
      verdict: "same as message",
      tone: "warn",
    },
    {
      name: "Harness probes",
      setup: "6 small programs × 5 harnesses",
      result:
        "smolagents 1.0.0–1.26.0 swaps undefined names. LangChain, AutoGen: as Python",
      verdict: "new finding",
      tone: "good",
    },
    {
      name: "Hidden-rows study",
      setup: "BIRD, 5 databases, 131 affected questions, 3 models",
      result:
        "Partial answers shown as complete: 70–95%. Opus (40 pairs): 0 of 16, but doubted 8 of 16 complete",
      verdict: "next study",
      tone: "accent",
    },
  ];

  const th =
    "border-b border-zinc-200 bg-zinc-50 px-3.5 py-2 text-left text-[11px] font-medium uppercase tracking-[0.05em] text-zinc-500";
  const td = "border-b border-zinc-200 px-3.5 py-1.5 align-top leading-[1.45]";
</script>

<template>
  <div class="min-h-dvh bg-white text-zinc-900 md:h-dvh md:overflow-hidden">
    <div
      class="flex flex-col md:grid md:h-full md:grid-cols-[240px_minmax(0,1fr)]"
    >
      <!-- Sidebar: a top bar on small screens -->
      <aside
        class="flex flex-wrap items-center gap-3 border-b border-zinc-200 bg-zinc-50 px-4 py-3 md:min-h-0 md:flex-col md:flex-nowrap md:items-stretch md:gap-[22px] md:overflow-y-auto md:border-b-0 md:border-r md:py-5"
      >
        <div class="flex items-center gap-2.5 px-1">
          <div
            aria-hidden="true"
            class="grid h-7 w-7 flex-none place-items-center rounded-[7px] bg-zinc-900 font-mono text-[11px] font-semibold text-zinc-50"
          >
            dt
          </div>
          <div>
            <b class="block text-[14.5px] font-semibold leading-tight">data-agent-traces</b>
            <span class="text-xs text-zinc-500">Sep – Nov 2026</span>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Screens"
          class="ml-auto flex gap-1 md:ml-0 md:flex-col"
        >
          <button
            v-for="t in tabs"
            :id="`tab-${t.key}`"
            :key="t.key"
            type="button"
            role="tab"
            :aria-selected="screen === t.key"
            :aria-controls="`panel-${t.key}`"
            :class="[
              'flex h-[38px] items-center gap-2.5 rounded-lg border px-2.5 text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500',
              screen === t.key
                ? 'border-zinc-200 bg-white font-medium text-zinc-900 shadow-sm'
                : 'border-transparent text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900',
            ]"
            @click="show(t.key)"
          >
            <svg
              class="h-4 w-4 flex-none"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="1.8"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
            >
              <template v-if="t.key === 'summary'">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <path d="M14 2v6h6" />
                <path d="M16 13H8" />
                <path d="M16 17H8" />
                <path d="M10 9H8" />
              </template>
              <template v-else>
                <path d="m3 17 2 2 4-4" />
                <path d="m3 7 2 2 4-4" />
                <path d="M13 6h8" />
                <path d="M13 12h8" />
                <path d="M13 18h8" />
              </template>
            </svg>
            {{ t.label }}
          </button>
        </div>

        <div
          class="mt-auto hidden flex-col gap-2.5 rounded-[10px] border border-zinc-200 bg-white p-3 md:flex"
        >
          <div>
            <div class="info-k">Status</div>
            <div class="flex items-center gap-1.5 text-[12.5px] text-zinc-600">
              <span class="h-1.5 w-1.5 flex-none rounded-full bg-red-600" aria-hidden="true"></span>
              Paper stopped on 1 Nov 2026
            </div>
          </div>
          <div>
            <div class="info-k">What I keep</div>
            <div class="text-[13px] leading-normal">{{ keepText }}</div>
          </div>
          <div>
            <div class="info-k">Code and data</div>
            <div class="font-mono text-[12.5px]">
              v2.2.0 ·
              <a :href="repoUrl" target="_blank" rel="noopener noreferrer" :class="link">GitHub</a>
              ·
              <a :href="zenodoUrl" target="_blank" rel="noopener noreferrer" :class="link">Zenodo</a>
            </div>
          </div>
          <div>
            <div class="info-k">Author</div>
            <NuxtLink to="/" class="text-[13px] hover:text-indigo-600">Blessed Madukoma</NuxtLink>
          </div>
        </div>
      </aside>

      <main ref="mainEl" class="min-w-0 md:min-h-0 md:overflow-y-auto">
        <!-- SUMMARY -->
        <section
          v-show="screen === 'summary'"
          id="panel-summary"
          role="tabpanel"
          aria-labelledby="tab-summary"
          class="screen"
        >
          <header>
            <h1 class="text-2xl font-semibold leading-tight tracking-tight md:text-[28px]">
              What agent traces do not record
            </h1>
            <p class="mt-1.5 max-w-[96ch] text-sm text-zinc-600">
              An AI data agent answers questions about data in steps. In each
              step, the AI <b class="font-semibold text-zinc-900">model</b>
              writes a short program. Other software, the
              <b class="font-semibold text-zinc-900">harness</b>, runs the
              program and records the program and its result. That record is
              the <b class="font-semibold text-zinc-900">trace</b>.
            </p>
          </header>

          <ol class="overflow-hidden rounded-[10px] border border-zinc-200 bg-white">
            <li
              v-for="b in beats"
              :key="b.n"
              :class="[
                'beat grid items-start gap-1.5 border-t border-zinc-200 px-[18px] py-[13px] first:border-t-0 min-[1100px]:grid-cols-[132px_minmax(0,0.75fr)_minmax(0,1.5fr)] min-[1100px]:gap-[18px]',
                b.tone === 'accent' ? 'bg-indigo-50/40' : '',
              ]"
            >
              <span class="flex items-center gap-2.5 pt-px text-[13px] font-semibold text-zinc-600">
                <span
                  :class="[
                    'grid h-[22px] w-[22px] flex-none place-items-center rounded-full border font-mono text-[11.5px] font-semibold',
                    badge[b.tone],
                  ]"
                >{{ b.n }}</span>
                {{ b.step }}
              </span>
              <p class="claim text-[15px] font-medium leading-[1.45]">{{ b.claim }}</p>
              <p
                class="proof text-[13px] leading-normal text-zinc-600 [&_b]:font-semibold [&_b]:text-zinc-900"
                v-html="b.proof"
              ></p>
            </li>
          </ol>

          <div
            class="lead-card flex flex-col gap-[3px] rounded-r-[10px] border border-l-[3px] border-zinc-200 border-l-indigo-500 bg-white px-[18px] py-[13px]"
          >
            <span class="text-[12.5px] text-zinc-500">My research in one sentence</span>
            <p class="lead text-[15px] font-medium leading-[1.45]">
              I study which changes to AI-powered data systems make their
              answers complete and up to date, or clear about what they lack,
              and at what cost.
            </p>
          </div>

          <!-- Small screens: the sidebar card is hidden, so show its finding here. -->
          <div class="flex flex-col gap-[3px] rounded-[10px] border border-zinc-200 bg-white px-[18px] py-[13px] md:hidden">
            <span class="text-[12.5px] text-zinc-500">What I keep</span>
            <p class="text-[13px] leading-normal text-zinc-600">
              {{ keepText }} Code and data:
              <a :href="repoUrl" target="_blank" rel="noopener noreferrer" :class="link">GitHub</a>,
              <a :href="zenodoUrl" target="_blank" rel="noopener noreferrer" :class="link">Zenodo</a>.
            </p>
          </div>
        </section>

        <!-- EVIDENCE -->
        <section
          v-show="screen === 'evidence'"
          id="panel-evidence"
          role="tabpanel"
          aria-labelledby="tab-evidence"
          class="screen"
        >
          <header class="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <h1 class="text-2xl font-semibold leading-tight tracking-tight md:text-[28px]">
                Evidence
              </h1>
              <p class="mt-1.5 max-w-[96ch] text-sm text-zinc-600">
                How each number on the Summary was measured. “pts” means
                percentage points; “CI” is the 95% confidence interval.
                Sources: paper draft (13 Oct 2026), experiment log (1 Nov
                2026), hidden-rows study (26 Sep 2026).
              </p>
            </div>
            <span
              class="w-fit flex-none whitespace-nowrap rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-2 font-mono text-xs font-medium leading-none text-zinc-600"
            >283,435 steps · 6 benchmarks</span>
          </header>

          <div class="flex flex-wrap items-baseline gap-2.5">
            <h2 class="text-[15px] font-semibold">Four harness effects</h2>
            <span class="text-[12.5px] text-zinc-500">in the published traces of DataAgentBench and DABstep · 2 of 4 inferred</span>
          </div>
          <div class="overflow-x-auto rounded-[10px] border border-zinc-200 bg-white">
            <table class="w-full min-w-[720px] border-collapse text-[13px]">
              <thead>
                <tr>
                  <th :class="th" class="w-[44px]">#</th>
                  <th :class="th" class="w-[30%]">Effect</th>
                  <th :class="th">What the harness does</th>
                  <th :class="th" class="w-[27%]">Size in the traces</th>
                </tr>
              </thead>
              <tbody class="[&_tr:last-child_td]:border-b-0">
                <tr v-for="e in effects" :key="e.n">
                  <td :class="td">
                    <span
                      class="inline-grid h-[18px] w-[18px] place-items-center rounded-[3px] border-[1.5px] border-orange-700 font-mono text-[11px] font-semibold leading-none text-orange-700"
                    >{{ e.n }}</span>
                  </td>
                  <td :class="td">
                    <b class="font-semibold">{{ e.name }}</b>
                    <span class="block text-xs text-zinc-500">{{ e.source }}</span>
                  </td>
                  <td :class="td" v-html="e.what"></td>
                  <td :class="td" class="tabular-nums">{{ e.size }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="flex flex-wrap items-baseline gap-2.5">
            <h2 class="text-[15px] font-semibold">Experiments</h2>
            <span class="text-[12.5px] text-zinc-500">all pre-registered except the probes and the note check</span>
          </div>
          <div class="overflow-x-auto rounded-[10px] border border-zinc-200 bg-white">
            <table class="w-full min-w-[720px] border-collapse text-[13px]">
              <thead>
                <tr>
                  <th :class="th" class="w-[21%]">Experiment</th>
                  <th :class="th" class="w-[27%]">Set-up</th>
                  <th :class="th">Result</th>
                  <th :class="th" class="w-[140px]">Verdict</th>
                </tr>
              </thead>
              <tbody class="[&_tr:last-child_td]:border-b-0">
                <tr v-for="x in experiments" :key="x.name">
                  <td :class="td"><b class="font-semibold">{{ x.name }}</b></td>
                  <td :class="td">{{ x.setup }}</td>
                  <td :class="td" class="tabular-nums">{{ x.result }}</td>
                  <td :class="td">
                    <span
                      :class="[
                        'inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-[9px] py-1 text-xs font-medium leading-none',
                        badge[x.tone],
                        x.tone === 'plain' ? 'bg-white' : '',
                      ]"
                    >
                      <span class="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true"></span>
                      {{ x.verdict }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>

<style scoped>
  .screen {
    display: flex;
    min-height: 100%;
    max-width: 1240px;
    flex-direction: column;
    gap: clamp(12px, 2vh, 20px);
    padding: clamp(18px, 3.2vh, 34px) clamp(16px, 3vw, 40px);
  }
  .info-k {
    margin-bottom: 4px;
    font-size: 10.5px;
    font-weight: 500;
    line-height: 1;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgb(113 113 122);
  }

  /* Short laptop or projector screens: tighter rows so a screen still fits. */
  @media (min-width: 768px) and (max-height: 800px) {
    .screen {
      gap: 8px;
      padding-top: 12px;
      padding-bottom: 12px;
    }
    .screen h1 {
      font-size: 24px;
    }
    .screen header p {
      margin-top: 4px;
      font-size: 13px;
    }
    .beat {
      padding: 8px 16px;
    }
    .claim {
      font-size: 13.5px;
      line-height: 1.4;
    }
    .proof {
      font-size: 12.5px;
      line-height: 1.45;
    }
    .lead-card {
      padding: 9px 16px;
    }
    .lead {
      font-size: 14px;
    }
    th {
      padding: 7px 14px;
    }
    td {
      padding: 4px 14px;
      line-height: 1.4;
    }
  }
  @media (max-width: 767px) {
    .screen {
      padding: 18px 16px;
    }
  }
</style>
