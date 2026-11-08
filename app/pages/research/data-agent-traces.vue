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
          "Close-out of my study of AI data agents: what the public traces do not record, what did not work, why I stopped, and the open problems I am exploring.",
      },
    ],
    link: [
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Geist:wght@400;500;600;700&family=Geist+Mono:wght@400;500;600&display=swap",
      },
    ],
  });

  type Screen = "summary" | "research" | "open" | "evidence";

  const screen = ref<Screen>("research");
  const mainEl = ref<HTMLElement | null>(null);

  // Each screen except the first has a link of its own, for example
  // /research/data-agent-traces#open-problems. Older links still work.
  const hashFor: Record<Screen, string> = {
    research: "",
    summary: "summary",
    evidence: "evidence",
    open: "open-problems",
  };
  const oldHashes: Record<string, Screen> = {
    "my-research": "research",
    "open-problem": "open",
  };

  function show(name: Screen) {
    screen.value = name;
    mainEl.value?.scrollTo({ top: 0 });
    const hash = hashFor[name];
    history.replaceState(
      history.state,
      "",
      hash ? `#${hash}` : location.pathname + location.search,
    );
  }

  // The sidebar can shrink to a row of icons, as on the FPL agent site. The
  // choice is kept in this browser only; storage can fail, so it is optional.
  const collapsed = ref(false);
  const sidebarKey = "dat-sidebar";

  function toggleSidebar() {
    collapsed.value = !collapsed.value;
    try {
      localStorage.setItem(sidebarKey, collapsed.value ? "collapsed" : "expanded");
    } catch {
      // Storage is blocked; the sidebar still works for this visit.
    }
  }

  onMounted(() => {
    const hash = location.hash.slice(1);
    const match =
      (Object.keys(hashFor) as Screen[]).find(
        (k) => hashFor[k] !== "" && hashFor[k] === hash,
      ) ?? oldHashes[hash];
    if (match) screen.value = match;
    // With no saved choice, small laptop screens start with the sidebar
    // collapsed so that each tab fits on one screen.
    let saved: string | null = null;
    try {
      saved = localStorage.getItem(sidebarKey);
    } catch {
      saved = null;
    }
    collapsed.value = saved ? saved === "collapsed" : window.innerWidth < 1366;
  });

  const tabs: { key: Screen; label: string }[] = [
    { key: "research", label: "My research" },
    { key: "summary", label: "Summary" },
    { key: "evidence", label: "Evidence" },
    { key: "open", label: "Open problems" },
  ];

  const repoUrl = "https://github.com/blessedmadukoma/data-agent-traces";
  const zenodoUrl = "https://doi.org/10.5281/zenodo.23352753";
  const studyUrl =
    "/blog/does-an-ai-agent-know-when-it-cannot-see-all-the-data";

  // Fixed text written here, so v-html is safe.
  const keepText =
    '<a href="https://huggingface.co/docs/smolagents/index" target="_blank" rel="noopener noreferrer">smolagents</a>, a popular agent library, quietly replaces a variable name that does not exist with a similar one, and the trace says the step worked. All 11 versions I tested do this.';

  // The points are fixed text written here, so v-html is safe. A point that
  // is an object with "head" is a small heading inside the list.
  type Point = string | { head: string };

  const beats: {
    n: number;
    step: string;
    kind: "" | "found" | "fail" | "stop" | "next";
    claim: string;
    points: Point[];
  }[] = [
    {
      n: 1,
      step: "Problem",
      kind: "",
      claim:
        "Researchers compare AI models by counting the mistakes recorded in their traces. I checked whether each recorded mistake was really the model's.",
      points: [
        "<b>Data:</b> the published traces of two test suites for data agents, DataAgentBench and DABstep: <b>273,090 steps</b>.",
        "<b>How I found it:</b> I was building a checker that stops a program before it runs if the program names a file or column that does not exist. To test it, I sorted the recorded failures by cause: the data, the model's program or the harness.",
        "<b>Why it matters:</b> if the harness causes a mistake and the trace blames the model, the ranking of models is wrong, and developers change the model or the prompt instead of fixing the harness.",
      ],
    },
    {
      n: 2,
      step: "Finding",
      kind: "found",
      claim:
        "In DataAgentBench, the harness caused 36.8% of the failed steps that the traces show as the model's (16,293 of 44,277).",
      points: [
        'The models wrote valid Python, for example <span class="mono">print("\\n".join(rows))</span>.',
        'The harness put the code inside a text string before it ran it. Python turned the <span class="mono">\\n</span> into a real line break, so the step failed with <span class="mono">SyntaxError: unterminated string literal</span>.',
        "The trace showed the model's valid code next to that error.",
        "Ranked by failed steps per run (fewest first), gpt-5.1 is <b>second</b> with these failures and <b>fourth</b> without them.",
      ],
    },
    {
      n: 3,
      step: "What did not work",
      kind: "fail",
      claim:
        "My checker stopped almost every program that named a missing file or column, but the share of correct answers rose only a little.",
      points: [
        "<b>Test:</b> QRData, 411 data-analysis questions, each run 10 times, with two models.",
        "<b>gpt-oss:120b:</b> these mistakes fell from <b>3,316 to 2</b>. Correct answers rose from <b>55.9%&nbsp;to&nbsp;57.3%</b>.",
        "<b>gemma4:31b:</b> these mistakes fell from <b>343 to 0</b>. Correct answers did not change measurably.",
        "A plain error message that lists the files and columns that exist helped about as much as the checker. The difference between the two was too small to measure.",
      ],
    },
    {
      n: 4,
      step: "Why I stopped",
      kind: "stop",
      claim:
        "The main finding was a deliberate design, the general idea was already published, and my reruns could not explain one result.",
      points: [
        '<b>Deliberate:</b> DataAgentBench\'s prompt says the code "will be quoted by triple double-quotes and passed as a string", and its authors confirmed this is on purpose. The prompt does not say that <span class="mono">\\n</span> becomes a line break.',
        "<b>Already published:</b> at least seven studies from 2026 show that changing the harness changes agents' scores and rankings.",
        "<b>Unexplained result:</b> I reran 54 DataAgentBench tasks with the code passed unchanged. The syntax errors fell to zero for both models. gpt-oss:120b's correct answers did not change measurably, but gpt-5-mini's fell from <b>44.7%&nbsp;to&nbsp;35.1%</b>.",
        // Commented out on 8 Nov 2026 to keep the screen short; the Evidence
        // tab has the same fact in its "2×2 rerun" row. Uncomment to restore.
        // "The fix also changed one sentence of the prompt. A test to separate these two causes stopped after 212 runs, when my API credit ran out.",
      ],
    },
  ];

  const parts: { name: string; question: string; status: string }[] = [
    {
      name: "Scope",
      question:
        "Does the answer say which data it covered, including rows the user may not see?",
      status: "Studied in my hidden-rows study, September 2026 (Open problems tab).",
    },
    {
      name: "Evidence",
      question:
        "Does the record of how an answer was made show what actually ran?",
      status: "Studied in the paper I stopped (Summary tab).",
    },
    {
      name: "Change",
      question:
        "Which answers already given become wrong when data, definitions or access rules change?",
      status: "Planned; no result yet.",
    },
  ];

  // Open problems screen: one problem for each part, then the focus.
  const problems: {
    part: string;
    name: string;
    problem: string;
    status?: string;
    focus?: boolean;
  }[] = [
    {
      part: "Scope",
      name: "Hidden rows",
      problem:
        "An AI model cannot tell whether rows the user may not see change its answer. The database system can, but telling the user can reveal those rows.",
      status: "Details below.",
      focus: true,
    },
    {
      part: "Evidence",
      name: "Records that hide what ran",
      problem:
        "A trace does not show what the harness changed, so a reader cannot tell who caused a failure.",
      status:
        "Measured in the paper I stopped: the harness caused 36.8% of DataAgentBench's failed steps.",
    },
    {
      part: "Change",
      name: "Answers that go out of date",
      problem:
        "I found no system that re-checks answers already given when data, definitions or access rules change.",
      status: "Planned; no result yet.",
    },
  ];

  // Focus details. Fixed text written here, so v-html is safe.
  const openPoints: string[] = [
    `<b>The evidence:</b> in my <a href="${studyUrl}">hidden-rows study</a>, on five BIRD databases under PostgreSQL row-level security, three cheaper models gave partial answers as complete in 70% to 95% of the cases where hidden rows changed the answer.`,
    "<b>Why the model cannot solve it alone:</b> it sees only the visible rows. On a 40-pair sample, Claude Opus never hid a partial answer, but it doubted 8 of 16 complete answers.",
  ];

  const checkRows: { label: string; a: string; b: string }[] = [
    {
      label: "Uses",
      a: "The SQL query and the access rule, never the hidden rows",
      b: "The query, run on all rows",
    },
    {
      label: "Mistakes",
      a: "Labelled 633 of 1,419 complete answers (45%) as possibly incomplete",
      b: "None: always right about whether the hidden rows change the result",
    },
    {
      label: "Reveals",
      a: "Nothing about the hidden rows",
      b: "A script that read only its yes-or-no output recovered hidden totals in 17&nbsp;to&nbsp;23 queries each, such as the bank's 4,500 accounts when the user sees 778",
    },
  ];

  const solution =
    '<b>A possible solution:</b> checks between A and B that write the scope into the final answer, for example "778 accounts in your region; other regions are hidden". They would be measured by two costs: complete answers labelled incomplete, and how much a script can learn about the hidden rows.';

  const related: { idea: string; cite: string; does: string; here: string }[] = [
    {
      idea: "Non-Truman access control",
      cite: "Rizvi et al., 2004",
      does: "Rejects a SQL query when hidden rows could change its result, so the user gets no answer.",
      here: "The agent still answers, and the answer states its scope.",
    },
    {
      idea: "Query auditing",
      cite: "Kenthapadi et al., 2005",
      does: "Answers or refuses each query so that no private value can be worked out, and proves that a refusal computed from the hidden data leaks.",
      here: "The decision is a scope label on the agent's final answer, which can combine several queries. The same leak applies, so it is measured.",
    },
    {
      idea: "Differential privacy",
      cite: "",
      does: "Adds random noise to answers to limit what anyone can learn about one record.",
      here: "The answer for the visible rows must stay exact. Noise could be added to the scope label only, as one possible check between A and B.",
    },
    {
      idea: "Access-control checks for text-to-SQL",
      cite: "Fei et al., 2026",
      does: "Tests whether the generated SQL stays inside the data a role may read.",
      here: "The SQL is allowed; the question is whether the answer says that it is partial.",
    },
    {
      idea: "Model abstention",
      cite: 'Training a model to say "I don\'t know"',
      does: "Changes how the model writes.",
      here: "The fact that decides the answer is in the hidden rows, which the model cannot see.",
    },
    {
      idea: "Partial Evidence Bench",
      cite: "Tallam, 2026",
      does: "Measures the same failure for documents.",
      here: "The data are in databases, and what the scope label reveals is measured.",
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
      verdict: "open problem",
      chip: "accent",
    },
  ];
</script>

<template>
  <div :class="['dat', { collapsed }]">
    <div class="shell">
      <aside class="side">
        <div class="side-head">
          <div class="brand">
            <div class="logo" aria-hidden="true">dt</div>
            <div class="brand-text"><b>data-agent-traces</b><span>Sep – Nov 2026</span></div>
          </div>
          <button
            type="button"
            class="side-toggle"
            :aria-expanded="!collapsed"
            :aria-label="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
            :title="collapsed ? 'Expand sidebar' : 'Collapse sidebar'"
            @click="toggleSidebar"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <rect x="2" y="2.5" width="12" height="11" rx="2" />
              <path d="M6 2.5v11" />
            </svg>
          </button>
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
            :title="t.label"
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
              <template v-else-if="t.key === 'research'">
                <circle cx="12" cy="12" r="9" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="12" cy="12" r="1" />
              </template>
              <template v-else-if="t.key === 'open'">
                <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
                <path d="M9 18h6" />
                <path d="M10 22h4" />
              </template>
              <template v-else>
                <path d="m3 17 2 2 4-4" />
                <path d="m3 7 2 2 4-4" />
                <path d="M13 6h8" />
                <path d="M13 12h8" />
                <path d="M13 18h8" />
              </template>
            </svg>
            <span class="label">{{ t.label }}</span>
          </button>
        </nav>
        <div class="info">
          <div>
            <div class="k">Status</div>
            <div class="dotline">Paper stopped · 1 Nov 2026</div>
          </div>
          <div>
            <div class="k">Code and data</div>
            <div class="v">
              <a :href="repoUrl" target="_blank" rel="noopener noreferrer">GitHub</a>
              ·
              <a :href="zenodoUrl" target="_blank" rel="noopener noreferrer">Zenodo</a>
              <span class="ver">v2.2.0</span>
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
              <ul class="proof">
                <li
                  v-for="(pt, i) in b.points"
                  :key="i"
                  :class="{ head: typeof pt !== 'string' }"
                  v-html="typeof pt === 'string' ? pt : pt.head"
                ></li>
              </ul>
            </div>
          </div>

          <div class="now">
            <div class="card keep">
              <span class="k">What I keep</span>
              <p>
                <span v-html="keepText"></span>
                <span class="phone-only">
                  Code and data:
                  <a :href="repoUrl" target="_blank" rel="noopener noreferrer">GitHub</a>,
                  <a :href="zenodoUrl" target="_blank" rel="noopener noreferrer">Zenodo</a>.
                </span>
              </p>
            </div>
          </div>
        </section>

        <!-- MY RESEARCH -->
        <section
          v-show="screen === 'research'"
          id="screen-research"
          class="screen"
          role="tabpanel"
          aria-labelledby="h-research"
        >
          <div class="head">
            <div>
              <h1 id="h-research">My research</h1>
            </div>
          </div>

          <div class="card research">
            <span class="k">My research in one sentence</span>
            <p class="sentence">
              I study which changes to AI-powered data systems make their
              answers complete and up to date, or clear about what they lack,
              and at what cost.
            </p>
            <p class="plain">
              <span>In plain words:</span> when an AI agent answers a question
              from data, I study how the system can make the answer say when it
              is incomplete or out of date, and what that costs.
            </p>
          </div>

          <div class="sec-title"><h2>Three parts of the question</h2></div>
          <div class="parts">
            <div v-for="pt in parts" :key="pt.name" class="part">
              <b>{{ pt.name }}</b>
              <p>{{ pt.question }}</p>
              <span>{{ pt.status }}</span>
            </div>
          </div>

          <div class="card connect">
            <span class="k">How the parts connect</span>
            <p>
              Scope and Change ask the same question about two versions of the
              data: all rows against the rows the user sees, and today's data
              against the data the answer used. Both can be decided by comparing
              the rows an answer read with the rows that differ. Evidence
              supplies the record of what each answer read. In all three, the
              fact that decides whether an answer is right is outside the model,
              so the system must supply it.
            </p>
          </div>
        </section>

        <!-- OPEN PROBLEMS -->
        <section
          v-show="screen === 'open'"
          id="screen-open"
          class="screen"
          role="tabpanel"
          aria-labelledby="h-open"
        >
          <div class="head">
            <div>
              <h1 id="h-open">Open problems I am exploring</h1>
            </div>
          </div>

          <ol class="problems">
            <li
              v-for="pb in problems"
              :key="pb.part"
              :class="['problem', { focus: pb.focus }]"
            >
              <h2>{{ pb.name }} <span>({{ pb.part }})</span></h2>
              <p>{{ pb.problem }}</p>
              <span v-if="pb.status" class="status">{{ pb.status }}</span>
            </li>
          </ol>

          <div class="op-grid">
            <div class="card op">
              <h2>Focus: what I found and tested</h2>
              <ul class="proof">
                <li v-for="(pt, i) in openPoints" :key="i" v-html="pt"></li>
              </ul>
              <div class="box">
                <table class="checks">
                  <thead>
                    <tr>
                      <th scope="col"><span class="sr-only">Property</span></th>
                      <th scope="col">Check A</th>
                      <th scope="col">Check B</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="r in checkRows" :key="r.label">
                      <th scope="row">{{ r.label }}</th>
                      <td v-html="r.a"></td>
                      <td v-html="r.b"></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p class="solution" v-html="solution"></p>
            </div>
            <div class="card op">
              <h2>How this differs from related ideas</h2>
              <div class="box">
                <table class="related">
                  <thead>
                    <tr>
                      <th scope="col">Idea</th>
                      <th scope="col">What it does</th>
                      <th scope="col">What is different here</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="r in related" :key="r.idea">
                      <td data-label="Idea"><b>{{ r.idea }}</b><span v-if="r.cite" class="sub">{{ r.cite }}</span></td>
                      <td data-label="What it does">{{ r.does }}</td>
                      <td data-label="What is different here">{{ r.here }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
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
                How each number on the Summary was measured. "pts" is the
                gap between two percentages: 55.9% to 57.3% is +1.4 pts; "CI" is the 95% confidence interval.
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
  --text-2: #44403c;
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
.side-head { display: flex; align-items: center; justify-content: space-between; gap: 4px; }
.brand { display: flex; align-items: center; gap: 10px; padding: 0 4px; min-width: 0; }
.side-toggle { display: grid; place-items: center; width: 28px; height: 28px; padding: 0; border: 0; border-radius: 6px; background: none; color: var(--muted); cursor: pointer; flex: none; }
.side-toggle:hover { background: var(--sunken); color: var(--fg); }
.side-toggle svg { width: 16px; height: 16px; }
.logo { width: 28px; height: 28px; border-radius: 7px; background: var(--ink); color: var(--ink-fg); display: grid; place-items: center; font: 600 11px/1 var(--font-mono); flex: none; }
.brand b { display: block; font-size: 14.5px; font-weight: 600; line-height: 1.2; white-space: nowrap; }
.brand span { font-size: 12px; color: var(--faint); }
.nav { display: flex; flex-direction: column; gap: 4px; }
.nav button { cursor: pointer; text-align: left; background: transparent; display: flex; align-items: center; gap: 10px; height: 38px; padding: 0 10px; border-radius: 8px; text-decoration: none; color: var(--muted); font-size: 14px; border: 1px solid transparent; }
.nav button svg { width: 16px; height: 16px; flex: none; }
.nav button:hover { color: var(--fg); background: var(--sunken); }
.nav button[aria-current="page"] { background: var(--card); border-color: var(--line); color: var(--fg); font-weight: 500; box-shadow: 0 1px 2px rgba(0,0,0,0.04); }
.info { margin-top: auto; border: 1px solid var(--line); background: var(--card); border-radius: 10px; padding: 14px 12px; display: flex; flex-direction: column; gap: 14px; }
.info .k { font: 500 10.5px/1 var(--font-sans); letter-spacing: 0.06em; text-transform: uppercase; color: var(--faint); margin-bottom: 4px; }
.info .v { font-size: 13px; }
.info .ver { margin-left: 6px; font: 500 11.5px/1 var(--font-mono); color: var(--faint); }
.info a { color: var(--accent); text-decoration: underline; text-underline-offset: 2px; }
.info a.home { color: inherit; text-decoration: none; }
.info a.home:hover { color: var(--accent); }
.dotline { display: flex; align-items: center; gap: 6px; font-size: 12.5px; color: var(--muted); }
.dotline::before { content: ""; width: 6px; height: 6px; border-radius: 50%; background: var(--bad); }

.main { min-width: 0; min-height: 0; overflow-y: auto; }
.screen {
  min-height: 100%; display: flex; flex-direction: column; gap: clamp(12px, 2vh, 20px);
  padding-block: clamp(18px, 3.2vh, 34px); padding-left: clamp(16px, 3vw, 40px); padding-right: max(16px, env(safe-area-inset-right, 0px), 3vw);
  max-width: 1400px;
}
.head { display: flex; justify-content: space-between; align-items: flex-start; gap: 16px; }
.head h1 { font-size: 28px; line-height: 1.15; font-weight: 600; letter-spacing: -0.02em; }
.head p { color: var(--muted); font-size: 14px; margin-top: 6px; }
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
.beat { display: grid; grid-template-columns: 116px minmax(0, 0.75fr) minmax(0, 1.9fr); gap: 18px; padding: 10px 18px; border-top: 1px solid var(--line); align-items: start; }
.beat:first-child { border-top: 0; }
.step { display: flex; align-items: center; gap: 10px; font-size: 13px; font-weight: 600; color: var(--muted); padding-top: 1px; }
.step i { font-style: normal; width: 22px; height: 22px; border-radius: 50%; display: grid; place-items: center; font: 600 11.5px/1 var(--font-mono); background: var(--sunken); color: var(--muted); border: 1px solid var(--line); flex: none; }
.beat.found .step i { background: var(--good-soft); color: var(--good); border-color: var(--good-line); }
.beat.fail .step i { background: var(--warn-soft); color: var(--warn); border-color: var(--warn-line); }
.beat.stop .step i { background: var(--bad-soft); color: var(--bad); border-color: var(--bad-line); }
.beat.next .step i { background: var(--accent-soft); color: var(--accent); border-color: color-mix(in srgb, var(--accent) 30%, transparent); }
.beat.next { background: color-mix(in srgb, var(--accent-soft) 45%, var(--card)); }
.claim { font-size: 15px; line-height: 1.45; font-weight: 500; }
.proof { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; font-size: 14px; line-height: 1.5; color: var(--text-2); font-variant-numeric: tabular-nums; }
.proof li { position: relative; padding-left: 14px; }
.proof li::before { content: ""; position: absolute; left: 3px; top: 0.68em; width: 4px; height: 4px; border-radius: 50%; background: var(--faint); }
.proof :deep(b) { color: var(--fg); font-weight: 600; }
.proof :deep(.mono) { font-family: var(--font-mono); font-size: 0.92em; color: var(--fg); }
.proof li.head { padding-left: 0; margin-top: 6px; font-size: 11px; font-weight: 600; letter-spacing: 0.05em; text-transform: uppercase; color: var(--faint); }
.proof li.head::before { display: none; }
.proof :deep(a) { color: var(--accent); text-decoration: underline; text-underline-offset: 2px; }
td :deep(.mono) { font-family: var(--font-mono); font-size: 0.92em; }

.now { display: grid; grid-template-columns: minmax(0, 1fr); gap: 14px; }
.now .card { padding: 13px 18px; display: flex; flex-direction: column; gap: 3px; }
.now .k { font-size: 12.5px; color: var(--faint); }
.now .keep p { font-size: 13px; color: var(--muted); line-height: 1.5; }
.now .keep a, .now .keep :deep(a) { color: var(--accent); text-decoration: underline; text-underline-offset: 2px; }

/* Open problems */
.problems { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); background: var(--card); border: 1px solid var(--line); border-radius: 10px; overflow: hidden; }
.problem { padding: 12px 16px; display: flex; flex-direction: column; gap: 4px; min-width: 0; }
.problem + .problem { border-left: 1px solid var(--line); }
.problem.focus { box-shadow: inset 0 2px 0 var(--accent); }
.problem h2 { font-size: 14.5px; font-weight: 600; line-height: 1.35; }
.problem h2 span { font-weight: 400; color: var(--faint); }
.problem p { font-size: 13.5px; line-height: 1.5; color: var(--text-2); }
.problem .status { font-size: 12.5px; line-height: 1.4; color: var(--faint); margin-top: auto; }
.problem.focus .status { color: var(--accent); font-weight: 500; }

.head p a { color: var(--accent); text-decoration: underline; text-underline-offset: 2px; }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
.research { padding: 16px 20px; border-left: 3px solid var(--accent); border-radius: 0 10px 10px 0; display: flex; flex-direction: column; gap: 6px; }
.research .k, .connect .k, .op .k { font-size: 12.5px; color: var(--faint); }
.research .sentence { font-size: 18px; font-weight: 500; line-height: 1.45; letter-spacing: -0.005em; }
.research .plain { font-size: 14.5px; line-height: 1.55; color: var(--muted); }
.research .plain span { color: var(--faint); font-weight: 500; }
.connect { padding: 14px 20px; display: flex; flex-direction: column; gap: 4px; }
.connect p { font-size: 14px; line-height: 1.6; color: var(--fg); max-width: 110ch; }
.parts { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 10px; }
.part { border: 1px solid var(--line); border-radius: 10px; padding: 14px 16px; background: var(--card); display: flex; flex-direction: column; gap: 6px; }
.part b { font-size: 15px; font-weight: 600; }
.part p { font-size: 14px; line-height: 1.5; color: var(--fg); }
.part span { font-size: 12.5px; color: var(--faint); margin-top: auto; }
.op-grid { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.2fr); gap: 14px; align-items: start; }
.op { padding: 13px 18px; display: flex; flex-direction: column; gap: 10px; }
.op h2 { font-size: 15px; font-weight: 600; }
.op .box { border: 1px solid var(--line); border-radius: 8px; overflow: hidden; }
.op table { min-width: 0; font-size: 12.5px; }
.op th, .op td { padding: 6px 10px; }
.op tbody th { width: 76px; text-align: left; vertical-align: top; font: 600 12px/1.45 var(--font-sans); letter-spacing: 0; text-transform: none; color: var(--muted); background: var(--sunken); border-bottom: 1px solid var(--line); }
.op tbody tr:last-child th { border-bottom: 0; }
.op .related td:first-child { width: 30%; }
.op .solution { font-size: 13px; line-height: 1.5; color: var(--muted); }
.op .solution :deep(b) { color: var(--fg); font-weight: 600; }
.phone-only { display: none; }

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

/* Collapsed sidebar: a row of icons (wide screens only) */
@media (min-width: 761px) {
  .dat.collapsed .shell { grid-template-columns: 64px minmax(0, 1fr); }
  .dat.collapsed .side { padding-inline: 12px; }
  .dat.collapsed .side-head { flex-direction: column; gap: 12px; }
  .dat.collapsed .brand { padding: 0; }
  .dat.collapsed .brand-text, .dat.collapsed .info { display: none; }
  .dat.collapsed .nav button { justify-content: center; padding: 0; }
  .dat.collapsed .nav .label { position: absolute; width: 1px; height: 1px; overflow: hidden; clip-path: inset(50%); white-space: nowrap; }
}

/* Short laptop or projector screens */
@media (min-width: 761px) and (max-height: 800px) {
  .screen { gap: 7px; padding-block: 9px; }
  .head h1 { font-size: 24px; }
  .head p { font-size: 13px; margin-top: 4px; }
  .proof { gap: 0; }
  .claim { font-size: 14px; line-height: 1.4; }
  .proof { font-size: 13.5px; line-height: 1.45; }
  .now .card { padding: 8px 16px; }
  .research { padding: 12px 18px; }
  .research .sentence { font-size: 16px; }
  .research .plain, .part p, .connect p { font-size: 13px; line-height: 1.5; }
  .part { padding: 10px 14px; gap: 4px; }
  .beat { padding: 5px 16px; }
  .op { padding: 7px 14px; gap: 5px; }
  .op h2 { font-size: 14px; }
  .problem { padding: 8px 14px; gap: 2px; }
  .problem p { font-size: 13px; line-height: 1.4; }
  .op th, .op td { padding: 3px 8px; line-height: 1.35; }
  .op table, .op .solution { font-size: 12px; line-height: 1.35; }
  th { padding: 7px 14px; }
  td { padding: 4px 14px; line-height: 1.4; }
}
@media (max-width: 1100px) {
  .beat { grid-template-columns: minmax(0, 1fr); gap: 6px; }
  .now { grid-template-columns: minmax(0, 1fr); }
  .op-grid { grid-template-columns: minmax(0, 1fr); }
  .problems { grid-template-columns: minmax(0, 1fr); }
  .problem + .problem { border-left: 0; border-top: 1px solid var(--line); }
}
@media (max-width: 760px) {
  .dat { height: auto; overflow: visible; }
  .phone-only { display: inline; }
  .parts { grid-template-columns: minmax(0, 1fr); }
  .nav { flex-wrap: wrap; }
  .op .related thead { display: none; }
  .op .related tr { display: block; border-bottom: 1px solid var(--line); padding: 6px 0; }
  .op .related tr:last-child { border-bottom: 0; }
  .op .related td { display: block; width: auto; border: 0; padding: 2px 10px; }
  .op .related td:first-child { width: auto; }
  .op .related td + td::before { content: attr(data-label) ": "; color: var(--faint); font-weight: 500; }
  .shell { grid-template-columns: minmax(0, 1fr); height: auto; }
  .side { flex-direction: row; flex-wrap: wrap; align-items: center; gap: 12px; border-right: 0; border-bottom: 1px solid var(--line); padding-right: max(16px, env(safe-area-inset-right, 0px)); padding-block: 12px; }
  .nav { flex-direction: row; margin-left: auto; }
  .info, .side-toggle { display: none; }
  .main { overflow: visible; }
  .screen { padding-left: max(16px, env(safe-area-inset-left, 0px)); padding-right: max(16px, env(safe-area-inset-right, 0px)); }
  .head { flex-direction: column; }
  .head h1 { font-size: 24px; }
}
</style>
