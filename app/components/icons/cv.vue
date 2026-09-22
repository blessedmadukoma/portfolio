<template>
  <a
    href="/docs/Madukoma Blessed Resume.pdf"
    target="_blank"
    rel="noopener noreferrer"
    class="cv-link flex shrink-0 items-center gap-[6px] whitespace-nowrap rounded-lg px-2.5 py-1.5 -ml-2.5 text-[12.5px] font-medium text-[#6b6661] transition-colors hover:bg-black/[0.04] hover:text-[#111] dark:text-zinc-400 dark:hover:bg-white/[0.08] dark:hover:text-zinc-100"
    aria-label="Open CV PDF"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path
        class="cv-page"
        d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
        pathLength="1"
      />
      <path class="cv-fold" d="M14 2v6h6" pathLength="1" />
      <path class="cv-line cv-line-one" d="M8 13h8" pathLength="1" />
      <path class="cv-line cv-line-two" d="M8 17h5" pathLength="1" />
    </svg>
    CV
  </a>
</template>

<style scoped>
  .cv-page,
  .cv-fold,
  .cv-line {
    stroke-dasharray: 1;
    stroke-dashoffset: 0;
  }

  .cv-link:is(:hover, .is-socially-active) .cv-page {
    animation: cv-draw 0.45s cubic-bezier(0, 0, 0.58, 1) forwards;
  }

  .cv-link:is(:hover, .is-socially-active) .cv-fold {
    animation: cv-draw 0.3s cubic-bezier(0, 0, 0.58, 1) 0.18s forwards;
    stroke-dashoffset: 1;
  }

  .cv-link:is(:hover, .is-socially-active) .cv-line-one {
    animation: cv-draw 0.25s cubic-bezier(0, 0, 0.58, 1) 0.3s forwards;
    stroke-dashoffset: 1;
  }

  .cv-link:is(:hover, .is-socially-active) .cv-line-two {
    animation: cv-draw 0.25s cubic-bezier(0, 0, 0.58, 1) 0.42s forwards;
    stroke-dashoffset: 1;
  }

  @keyframes cv-draw {
    from {
      stroke-dashoffset: 1;
    }
    to {
      stroke-dashoffset: 0;
    }
  }
</style>
