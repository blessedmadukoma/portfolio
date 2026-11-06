<script setup lang="ts">
// The research map from the tldraw board (Portfolio page), drawn in HTML so that it follows the
// light and dark themes and stacks on small screens. Keep it in step with the tldraw frame.
const arms = [
  {
    title: "Scope",
    question:
      "Does the answer say what data it covered, including rows the user may not read?",
    research: "Fine-grained access control",
    industry: "Row-level security",
    work: [
      "Hidden rows: cheaper models presented partial answers as complete in 70–95% of affected cases",
      "Next: a note that tells the agent when hidden rows matter, with a limited leak",
    ],
    card: "border-blue-500 bg-blue-50 dark:border-blue-400 dark:bg-blue-950/40",
    label: "text-blue-700 dark:text-blue-300",
    order: ["sm:order-1", "sm:order-4", "sm:order-7"],
  },
  {
    title: "Evidence",
    question:
      "What must come with an answer so that someone else can check it, and does the log show what actually ran?",
    research: "Data provenance",
    industry: "Agent observability and audit logs",
    work: [
      "DataAgentBench: 21.6% of Python steps failed because of the harness, logged as the model’s",
      "smolagents: all 11 versions tested silently swap a missing variable for a similar one",
    ],
    card: "border-emerald-600 bg-emerald-50 dark:border-emerald-400 dark:bg-emerald-950/40",
    label: "text-emerald-700 dark:text-emerald-300",
    order: ["sm:order-2", "sm:order-5", "sm:order-8"],
  },
  {
    title: "Change (planned)",
    question:
      "Which answers already given become wrong when data, definitions or access rules change?",
    research: "Incremental view maintenance",
    industry: "Keeping AI answers, caches and reports current",
    work: [
      "Planned: re-check only the answers a change touches",
    ],
    card: "border-orange-500 bg-orange-50 dark:border-orange-400 dark:bg-orange-950/40",
    label: "text-orange-700 dark:text-orange-300",
    order: ["sm:order-3", "sm:order-6", "sm:order-9"],
  },
];

// Small screens only: the part of the line from the question that runs beside box k of arm i
// (0 = arm card, 1 = research and industry, 2 = from my work). Each part covers the gap above its box,
// and the line stops at the branch to the last arm.
const spine = (i: number, k: number) => {
  const last = i === arms.length - 1;
  if (last && k > 0) return "hidden";
  const top = k > 0 ? "-top-2.5" : i === 0 ? "-top-3" : "-top-[22px]";
  const end = last ? "h-[47px]" : "bottom-0";
  return `absolute left-[9px] w-0.5 bg-zinc-500 dark:bg-zinc-400 sm:hidden ${top} ${end}`;
};

const eras = [
  { title: "Before agents", text: "SQL queries, reports and dashboards" },
  { title: "Today", text: "AI agents that write queries and code" },
  { title: "Next", text: "Whatever replaces agents" },
];
</script>

<template>
  <figure class="space-y-3 text-zinc-800 dark:text-zinc-300" aria-label="Research map">
    <p
      class="mx-auto max-w-xl rounded-md border-2 border-violet-500 bg-violet-50 px-4 py-3 text-center text-sm font-semibold text-zinc-900 dark:border-violet-400 dark:bg-violet-950/40 dark:text-zinc-100"
    >
      When can someone act on an answer computed from data, and which changes
      to the system make that true more often, at a cost they can afford?
    </p>

    <!-- Elbow connectors from the question to the three parts (wider screens only). -->
    <div class="relative hidden h-7 sm:block" aria-hidden="true">
      <div class="absolute left-1/2 top-0 h-3 w-0.5 -translate-x-1/2 bg-zinc-500 dark:bg-zinc-400"></div>
      <div class="absolute left-[16.667%] right-[16.667%] top-3 h-0.5 bg-zinc-500 dark:bg-zinc-400"></div>
      <div class="absolute inset-x-0 top-3 grid grid-cols-3">
        <div v-for="arm in arms" :key="arm.title" class="flex flex-col items-center">
          <div class="h-2.5 w-0.5 bg-zinc-500 dark:bg-zinc-400"></div>
          <div class="h-0 w-0 border-x-[5px] border-t-[6px] border-x-transparent border-t-zinc-500 dark:border-t-zinc-400"></div>
        </div>
      </div>
    </div>

    <!-- On small screens, a line runs down from the question with a branch to each arm. -->
    <div class="grid gap-2.5 sm:grid-cols-3">
      <template v-for="(arm, i) in arms" :key="arm.title">
        <div :class="['relative flex flex-col max-sm:pl-6', arm.order[0]]">
          <span :class="spine(i, 0)" aria-hidden="true"></span>
          <span
            class="absolute left-[9px] top-[23px] h-0.5 w-[9px] bg-zinc-500 dark:bg-zinc-400 sm:hidden"
            aria-hidden="true"
          ></span>
          <span
            class="absolute left-[18px] top-[19px] h-0 w-0 border-y-[5px] border-l-[6px] border-y-transparent border-l-zinc-500 dark:border-l-zinc-400 sm:hidden"
            aria-hidden="true"
          ></span>
          <div :class="['flex-1 rounded-md border-2 p-3', arm.card]">
            <p :class="['text-[11px] font-bold uppercase tracking-wider', arm.label]">
              {{ arm.title }}
            </p>
            <p class="mt-1 text-zinc-800 dark:text-zinc-200">{{ arm.question }}</p>
          </div>
        </div>
        <div :class="['relative flex flex-col max-sm:pl-6', arm.order[1]]">
          <span :class="spine(i, 1)" aria-hidden="true"></span>
          <div
            class="flex-1 rounded-md border border-dotted border-zinc-300 p-2.5 text-xs leading-5 dark:border-zinc-700"
          >
            <p>
              <span class="font-semibold text-zinc-900 dark:text-zinc-100">Research:</span>
              {{ arm.research }}
            </p>
            <p>
              <span class="font-semibold text-zinc-900 dark:text-zinc-100">Industry:</span>
              {{ arm.industry }}
            </p>
          </div>
        </div>
        <div :class="['relative mb-3 flex flex-col max-sm:pl-6 sm:mb-0', arm.order[2]]">
          <span :class="spine(i, 2)" aria-hidden="true"></span>
          <div
            class="flex-1 rounded-md border border-dashed border-zinc-300 p-2.5 text-xs leading-5 dark:border-zinc-700"
          >
            <p class="font-semibold text-zinc-900 dark:text-zinc-100">From my work</p>
            <ul class="mt-1 list-disc space-y-0.5 pl-4">
              <li v-for="item in arm.work" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </template>
    </div>

    <p class="pt-1 text-center text-xs text-zinc-500 dark:text-zinc-400">
      How answers are computed keeps changing. The question does not.
    </p>
    <ol class="grid items-center gap-1.5 sm:grid-cols-[1fr_auto_1fr_auto_1fr]">
      <template v-for="(era, i) in eras" :key="era.title">
        <li
          class="rounded-md border border-violet-300 bg-violet-50 px-3 py-2 text-center text-xs leading-5 dark:border-violet-800 dark:bg-violet-950/40"
        >
          <p class="font-semibold text-zinc-900 dark:text-zinc-100">{{ era.title }}</p>
          <p>{{ era.text }}</p>
        </li>
        <li
          v-if="i < eras.length - 1"
          class="text-center text-base text-zinc-500 dark:text-zinc-400"
          aria-hidden="true"
        >
          <span class="sm:hidden">↓</span><span class="hidden sm:inline">→</span>
        </li>
      </template>
    </ol>

    <figcaption class="text-center text-xs text-zinc-500 dark:text-zinc-400">
      I am building these ideas into
      <a
        href="https://sedge.app"
        target="_blank"
        rel="noopener noreferrer"
        class="font-medium text-indigo-500 underline hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
        >Sedge</a
      >, a data operating system that uses AI to answer questions about a
      company’s data.
    </figcaption>
  </figure>
</template>
