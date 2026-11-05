<script setup lang="ts">
  // Close-out of the data-agent-traces study (Sep – Nov 2026). The markup and
  // styles copy the approved one-page design: a 240px sidebar switches
  // between two screens, Summary and Evidence. Above 760px wide, each screen
  // fits a laptop screen (1280 x 720 and larger) without scrolling.
  // Unlisted: no page links here yet, and search engines are asked not to
  // index it.
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
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap",
      },
    ],
  });

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
    kind: "" | "found" | "fail" | "stop" | "next";
    claim: string;
    proof: string;
  }[] = [
    {
      n: 1,
      step: "Problem",
      kind: "",
      claim:
        "Researchers judge AI models by the mistakes recorded in their traces.",
      proof:
        "Two well-known test suites for data agents, DataAgentBench and DABstep, publish their traces: <b>273,090 steps</b> in total. I checked whether each recorded mistake was really the model's.",
    },
    {
      n: 2,
      step: "Finding",
      kind: "found",
      claim:
        "The harness caused many of the mistakes that the traces show as the model's.",
      proof:
        "In DataAgentBench, the harness broke about <b>one in five</b> of the Python programs the models wrote (21.6%). It placed each program inside a text string, which changed some characters, so correct programs failed. The trace still showed the model's program next to the error. Without these failures, the order of the six models by number of mistakes changes: gpt-5.1 falls from <b>second to fourth</b> place.",
    },
    {
      n: 3,
      step: "What did not work",
      kind: "fail",
      claim:
        "Stopping a common mistake before it happened made the final answers only slightly better.",
      proof:
        "The mistake was a program that asks for a file or column that does not exist. My checker stopped almost all of them: for one model, they fell from <b>3,316 to 2</b>. Yet the share of correct answers rose by only <b>1.4 percentage points</b>, from 55.9% to 57.3%. A simple error message that lists the files and columns that do exist helped about as much; my experiments could not tell the two apart.",
    },
    {
      n: 4,
      step: "Why I stopped",
      kind: "stop",
      claim:
        "My main finding turned out to be a deliberate design choice, others had already published the general idea, and my evidence was too thin.",
      proof:
        "DataAgentBench's own instructions say the program \"will be quoted by triple double-quotes and passed as a string\", and its authors confirmed this is deliberate. At least <b>seven</b> studies from 2026 already show that a harness can change an agent's results. My controlled reruns used only <b>two models</b>, and after I fixed the harness, one model's share of correct answers fell by 9.6 percentage points, for a reason I could not find.",
    },
    {
      n: 5,
      step: "Next",
      kind: "next",
      claim:
        "I will test whether the system around an agent can warn it when hidden rows change its answer, and reveal only a small, measured amount about those rows.",
      proof: `In my <a href="${studyUrl}">earlier study</a>, access rules hid some rows of a database. A warning based only on the access rule revealed nothing, but it also flagged <b>45%</b> of answers that were in fact complete. An exact warning was always right, but a short script could use it to work out totals the user may not see, with 17 to 23 questions for each total. Next, I build warnings between these two and measure both costs: false alarms and leaked information.`,
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
      what: 'Puts the code in a string, so Python decodes <span class="mono">\\n</span> first',
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
    chip: "" | "good" | "warn" | "bad" | "accent";
  }[] = [
    {
      name: "Rerun, gpt-oss:120b",
      setup: "54 tasks × 10 runs, released vs fixed harness",
      result: "Syntax errors 23.7% → 0%. Accuracy −1.0 pts (CI −5.7 to +3.4)",
      verdict: "fix works",
      chip: "good",
    },
    {
      name: "Rerun, gpt-5-mini",
      setup: "54 tasks × 5 runs, same two harnesses",
      result:
        "Syntax errors 26.8% → 0%. Accuracy 44.7% → 35.1% (CI −14.2 to −5.1)",
      verdict: "unexplained",
      chip: "warn",
    },
    {
      name: "2×2 rerun, gpt-5-mini",
      setup: "Code fix vs the prompt sentence it changed",
      result: "Stopped at 212 runs, 1 of 5 rounds: API credit ran out",
      verdict: "not finished",
      chip: "",
    },
    {
      name: "Checker vs error message",
      setup: "QRData, 411 questions × 10 runs, 2 models",
      result:
        "Checker +0.68 pts, message +1.00 pts. Difference −0.32 (CI −0.84 to +0.19)",
      verdict: "same as message",
      chip: "warn",
    },
    {
      name: "Harness probes",
      setup: "6 small programs × 5 harnesses",
      result:
        "smolagents 1.0.0–1.26.0 swaps undefined names. LangChain, AutoGen: as Python",
      verdict: "new finding",
      chip: "good",
    },
    {
      name: "Hidden-rows study",
      setup: "BIRD, 5 databases, 131 affected questions, 3 models",
      result:
        "Partial answers shown as complete: 70–95%. Opus (40 pairs): 0 of 16, but doubted 8 of 16 complete",
      verdict: "next study",
      chip: "accent",
    },
  ];
</script>

<template>
  <div class="dat">
    <div class="shell">
      <aside class="side">
        <div class="brand">
          <div class="logo" aria-hidden="true">dt</div>
          <div><b>data-agent-traces</b><span>Sep – Nov 2026</span></div>
        </div>
        <nav class="nav" role="tablist" aria-label="Screens">
          <button
            v-for="t in tabs"
            :id="`tab-${t.key}`"
            :key="t.key"
            type="button"
            role="tab"
            :aria-selected="screen === t.key"
            :aria-controls="`screen-${t.key}`"
            :aria-current="screen === t.key ? 'page' : undefined"
            @click="show(t.key)"
          >
            <svg
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
        </nav>
        <div class="info">
          <div>
            <div class="k">Status</div>
            <div class="dotline">Paper stopped on 1 Nov 2026</div>
          </div>
          <div>
            <div class="k">What I keep</div>
            <div class="v">{{ keepText }}</div>
          </div>
          <div>
            <div class="k">Code and data</div>
            <div class="v mono">
              v2.2.0 ·
              <a :href="repoUrl" target="_blank" rel="noopener noreferrer">GitHub</a>
              ·
              <a :href="zenodoUrl" target="_blank" rel="noopener noreferrer">Zenodo</a>
            </div>
          </div>
          <div>
            <div class="k">Author</div>
            <div class="v"><NuxtLink to="/" class="home">Blessed Madukoma</NuxtLink></div>
          </div>
        </div>
      </aside>

      <main ref="mainEl" class="main">
        <!-- SUMMARY -->
        <section
          v-show="screen === 'summary'"
          id="screen-summary"
          class="screen"
          role="tabpanel"
          aria-labelledby="h-summary"
        >
          <div class="head">
            <div>
              <h1 id="h-summary">What agent traces do not record</h1>
              <p>
                An AI data agent answers questions about data in steps. In each
                step, the AI <b>model</b> writes a short program. Other
                software, the <b>harness</b>, runs the program and records the
                program and its result. That record is the <b>trace</b>.
              </p>
            </div>
          </div>

          <div class="card story" role="list">
            <div
              v-for="b in beats"
              :key="b.n"
              :class="['beat', b.kind]"
              role="listitem"
            >
              <span class="step"><i>{{ b.n }}</i>{{ b.step }}</span>
              <p class="claim">{{ b.claim }}</p>
              <p class="proof" v-html="b.proof"></p>
            </div>
          </div>

          <div class="now">
            <div class="card lead">
              <span class="k">My research in one sentence</span>
              <p>
                I study which changes to AI-powered data systems make their
                answers complete and up to date, or clear about what they lack,
                and at what cost.
              </p>
            </div>
            <!-- Phones: the sidebar card is hidden, so its finding shows here. -->
            <div class="card keep keep-mobile">
              <span class="k">What I keep</span>
              <p>
                {{ keepText }} Code and data:
                <a :href="repoUrl" target="_blank" rel="noopener noreferrer">GitHub</a>,
                <a :href="zenodoUrl" target="_blank" rel="noopener noreferrer">Zenodo</a>.
              </p>
            </div>
          </div>
        </section>

        <!-- EVIDENCE -->
        <section
          v-show="screen === 'evidence'"
          id="screen-evidence"
          class="screen"
          role="tabpanel"
          aria-labelledby="h-evidence"
        >
          <div class="head">
            <div>
              <h1 id="h-evidence">Evidence</h1>
              <p>
                How each number on the Summary was measured. "pts" means
                percentage points; "CI" is the 95% confidence interval.
                Sources: paper draft (13 Oct 2026), experiment log (1 Nov
                2026), hidden-rows study (26 Sep 2026).
              </p>
            </div>
            <span class="tag">283,435 steps · 6 benchmarks</span>
          </div>

          <div class="sec-title">
            <h2>Four harness effects</h2>
            <span>in the published traces of DataAgentBench and DABstep · 2 of 4 inferred</span>
          </div>
          <div class="card tbl">
            <table>
              <thead>
                <tr>
                  <th style="width: 44px">#</th>
                  <th style="width: 30%">Effect</th>
                  <th>What the harness does</th>
                  <th style="width: 27%">Size in the traces</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="e in effects" :key="e.n">
                  <td><span class="sq">{{ e.n }}</span></td>
                  <td><b>{{ e.name }}</b><span class="sub">{{ e.source }}</span></td>
                  <td v-html="e.what"></td>
                  <td class="n">{{ e.size }}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="sec-title">
            <h2>Experiments</h2>
            <span>all pre-registered except the probes and the note check</span>
          </div>
          <div class="card tbl">
            <table>
              <thead>
                <tr>
                  <th style="width: 21%">Experiment</th>
                  <th style="width: 27%">Set-up</th>
                  <th>Result</th>
                  <th style="width: 140px">Verdict</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="x in experiments" :key="x.name">
                  <td><b>{{ x.name }}</b></td>
                  <td>{{ x.setup }}</td>
                  <td class="n">{{ x.result }}</td>
                  <td><span :class="['chip', x.chip]">{{ x.verdict }}</span></td>
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
.dat {
  --main: #ffffff;
  --side: #fafaf9;
  --card: #ffffff;
  --sunken: #f5f5f4;
  --fg: #1c1917;
  --muted: #57534e;
  --faint: #78716c;
  --line: #e7e5e4;
  --ink: #1c1917;
  --ink-fg: #fafaf9;
  --accent: #1f4e79;
  --accent-soft: #edf2f8;
  --good: #047857; --good-soft: #ecfdf5; --good-line: #a7f3d0;
  --bad: #dc2626; --bad-soft: #fef2f2; --bad-line: #fecaca;
  --warn: #b45309; --warn-soft: #fffbeb; --warn-line: #fde68a;
  --harness: #b4441c; --harness-soft: #fbefe9;
  --font-sans: "Geist", ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-mono: "Geist Mono", ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace;
  color-scheme: light;
  height: 100dvh;
  overflow: hidden;
  background: var(--main); color: var(--fg); font-family: var(--font-sans); font-size: 14px; line-height: 1.5; -webkit-font-smoothing: antialiased;
}
h1, h2, h3, p { margin: 0; }
a { color: inherit; }
a:focus-visible, button:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.mono { font-family: var(--font-mono); font-size: 0.92em; }

/* Shell */
.shell { display: grid; grid-template-columns: 240px minmax(0, 1fr); height: 100%; }
.side {
  background: var(--side); border-right: 1px solid var(--line);
  display: flex; flex-direction: column; gap: 22px; min-height: 0; overflow-y: auto;
  padding-block: 20px; padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: 16px;
}
.brand { display: flex; align-items: center; gap: 10px; padding: 0 4px; }
.logo { width: 28px; height: 28px; border-radius: 7px; background: var(--ink); color: var(--ink-fg); display: grid; place-items: center; font: 600 11px/1 var(--font-mono); flex: none; }
.brand b { display: block; font-size: 14.5px; font-weight: 600; line-height: 1.2; }
.brand span { font-size: 12px; color: var(--faint); }
.nav { display: flex; flex-direction: column; gap: 4px; }
.nav button { cursor: pointer; text-align: left; background: transparent; display: flex; align-items: center; gap: 10px; height: 38px; padding: 0 10px; border-radius: 8px; text-decoration: none; color: var(--muted); font-size: 14px; border: 1px solid transparent; }
.nav button svg { width: 16px; height: 16px; flex: none; }
.nav button:hover { color: var(--fg); background: var(--sunken); }
.nav button[aria-current="page"] { background: var(--card); border-color: var(--line); color: var(--fg); font-weight: 500; box-shadow: 0 1px 2px rgba(0,0,0,0.04); }
.info { margin-top: auto; border: 1px solid var(--line); background: var(--card); border-radius: 10px; padding: 12px; display: flex; flex-direction: column; gap: 10px; }
.info .k { font: 500 10.5px/1 var(--font-sans); letter-spacing: 0.06em; text-transform: uppercase; color: var(--faint); margin-bottom: 4px; }
.info .v { font-size: 13px; }
.info .v.mono { font-size: 12.5px; }
.info a { color: var(--accent); text-decoration: underline; text-underline-offset: 2px; }
.info a.home { color: inherit; text-decoration: none; }
.info a.home:hover { color: var(--accent); }
.dotline { display: flex; align-items: center; gap: 6px; font-size: 12.5px; color: var(--muted); }
.dotline::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--bad); }

.main { min-width: 0; min-height: 0; overflow-y: auto; }
.screen {
  min-height: 100%; display: flex; flex-direction: column; gap: clamp(12px, 2vh, 20px);
  padding-block: clamp(18px, 3.2vh, 34px); padding-left: clamp(16px, 3vw, 40px); padding-right: max(16px, env(safe-area-inset-right, 0px), 3vw);
  max-width: 1240px;
}
.head { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
.head h1 { font-size: 28px; line-height: 1.15; font-weight: 600; letter-spacing: -0.02em; }
.head p { color: var(--muted); font-size: 14px; margin-top: 6px; max-width: 96ch; }
.head p b { color: var(--fg); font-weight: 600; }
.tag { flex: none; font: 500 12px/1 var(--font-mono); padding: 8px 10px; border-radius: 6px; background: var(--sunken); color: var(--muted); border: 1px solid var(--line); white-space: nowrap; }

.chip { display: inline-flex; align-items: center; gap: 6px; font: 500 12px/1 var(--font-sans); padding: 4px 9px; border-radius: 999px; border: 1px solid var(--line); color: var(--muted); background: var(--card); white-space: nowrap; }
.chip::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: currentColor; }
.chip.good { color: var(--good); background: var(--good-soft); border-color: var(--good-line); }
.chip.bad { color: var(--bad); background: var(--bad-soft); border-color: var(--bad-line); }
.chip.warn { color: var(--warn); background: var(--warn-soft); border-color: var(--warn-line); }
.chip.accent { color: var(--accent); background: var(--accent-soft); border-color: color-mix(in srgb, var(--accent) 30%, transparent); }

.card { background: var(--card); border: 1px solid var(--line); border-radius: 10px; min-width: 0; }

/* Story */
.story { overflow: hidden; }
.beat { display: grid; grid-template-columns: 132px minmax(0, 0.75fr) minmax(0, 1.5fr); gap: 18px; padding: 13px 18px; border-top: 1px solid var(--line); align-items: start; }
.beat:first-child { border-top: 0; }
.step { display: flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 600; color: var(--muted); padding-top: 1px; }
.step i { font-style: normal; width: 22px; height: 22px; border-radius: 50%; display: grid; place-items: center; font: 600 11.5px/1 var(--font-mono); background: var(--sunken); color: var(--muted); border: 1px solid var(--line); flex: none; }
.beat.found .step i { background: var(--good-soft); color: var(--good); border-color: var(--good-line); }
.beat.fail .step i { background: var(--warn-soft); color: var(--warn); border-color: var(--warn-line); }
.beat.stop .step i { background: var(--bad-soft); color: var(--bad); border-color: var(--bad-line); }
.beat.next .step i { background: var(--accent-soft); color: var(--accent); border-color: color-mix(in srgb, var(--accent) 30%, transparent); }
.beat.next { background: color-mix(in srgb, var(--accent-soft) 45%, var(--card)); }
.claim { font-size: 15px; line-height: 1.45; font-weight: 500; }
.proof { font-size: 13px; line-height: 1.5; color: var(--muted); font-variant-numeric: tabular-nums; }
.proof :deep(b) { color: var(--fg); font-weight: 600; }
.proof :deep(.mono) { color: var(--fg); }
.proof :deep(a) { color: var(--accent); text-decoration: underline; text-underline-offset: 2px; }
td :deep(.mono) { font-family: var(--font-mono); font-size: 0.92em; }

.now { display: grid; grid-template-columns: minmax(0, 1fr); gap: 14px; }
.now .card { padding: 13px 18px; display: flex; flex-direction: column; gap: 3px; }
.now .k { font-size: 12.5px; color: var(--faint); }
.now .lead { border-left: 3px solid var(--accent); border-radius: 0 10px 10px 0; }
.now .lead p { font-size: 15px; font-weight: 500; line-height: 1.45; }
.now .keep p { font-size: 13px; color: var(--muted); line-height: 1.5; }
.now .keep a { color: var(--accent); text-decoration: underline; text-underline-offset: 2px; }
.now .keep-mobile { display: none; }

/* Evidence tables */
.sec-title { display: flex; align-items: baseline; gap: 10px; flex-wrap: wrap; }
.sec-title h2 { font-size: 15px; font-weight: 600; }
.sec-title span { font-size: 12.5px; color: var(--faint); }
.tbl { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: 13px; min-width: 720px; }
th { text-align: left; font: 500 11px/1.2 var(--font-sans); letter-spacing: 0.05em; text-transform: uppercase; color: var(--faint); padding: 8px 14px; background: var(--sunken); border-bottom: 1px solid var(--line); }
td { padding: 6px 14px; border-bottom: 1px solid var(--line); vertical-align: top; line-height: 1.45; }
tr:last-child td { border-bottom: 0; }
td.n { font-variant-numeric: tabular-nums; }
td .sub { display: block; font-size: 12px; color: var(--faint); }
.sq { display: inline-grid; place-items: center; width: 18px; height: 18px; border: 1.5px solid var(--harness); color: var(--harness); font: 600 11px/1 var(--font-mono); border-radius: 3px; }

/* Short laptop or projector screens */
@media (min-width: 761px) and (max-height: 800px) {
  .screen { gap: 10px; padding-block: 14px; }
  .head h1 { font-size: 24px; }
  .head p { font-size: 13px; margin-top: 4px; }
  .beat { padding: 8px 16px; }
  .claim { font-size: 13.5px; line-height: 1.4; }
  .proof { font-size: 12.5px; line-height: 1.45; }
  .now .card { padding: 9px 16px; }
  .now .lead p { font-size: 14px; }
  th { padding: 7px 14px; }
  td { padding: 4px 14px; line-height: 1.4; }
}
@media (max-width: 1100px) {
  .beat { grid-template-columns: minmax(0, 1fr); gap: 6px; }
  .now { grid-template-columns: minmax(0, 1fr); }
}
@media (max-width: 760px) {
  .dat { height: auto; overflow: visible; }
  .now .keep-mobile { display: flex; }
  .shell { grid-template-columns: minmax(0, 1fr); height: auto; }
  .side { flex-direction: row; flex-wrap: wrap; align-items: center; gap: 12px; border-right: 0; border-bottom: 1px solid var(--line); padding-right: max(16px, env(safe-area-inset-right, 0px)); padding-block: 12px; }
  .nav { flex-direction: row; margin-left: auto; }
  .info { display: none; }
  .main { overflow: visible; }
  .screen { padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }
  .head { flex-direction: column; }
  .head h1 { font-size: 24px; }
}
</style>
