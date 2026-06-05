<template>
  <a
    href="https://scholar.google.com/citations?user=r2TGbRkAAAAJ&hl=en"
    target="_blank"
    rel="noopener noreferrer"
    class="scholar-link flex items-center gap-[6px] hover:text-[#111] dark:hover:text-zinc-100 transition-colors rounded-lg px-2.5 py-1.5 -ml-2.5 hover:bg-black/[0.04] dark:hover:bg-white/[0.08] text-[12.5px] font-medium text-[#6b6661] dark:text-zinc-400"
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
      style="overflow: visible"
      aria-hidden="true"
    >
      <g class="scholar-icon" style="transform-origin: center">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M22 9l-10 -4l-10 4l10 4l10 -4v6" />
        <path d="M6 10.6v5.4a6 3 0 0 0 12 0v-5.4" />
      </g>
    </svg>
    Google Scholar
  </a>
</template>

<script setup>
  // No script logic needed — animation is purely CSS-driven.
</script>

<style scoped>
  /*
   * Toss animation: the graduation cap lifts and tilts on hover,
   * mirroring the cap-throw gesture — matches the wiggle/draw family
   * used by the other social icons.
   */
  .scholar-link:hover .scholar-icon {
    animation: scholar-toss 0.5s ease-in-out forwards;
    transform-origin: center;
  }

  @keyframes scholar-toss {
    0% {
      transform: translateY(0px) rotate(0deg);
    }
    35% {
      transform: translateY(-4px) rotate(-8deg);
    }
    70% {
      transform: translateY(-2px) rotate(8deg);
    }
    100% {
      transform: translateY(0px) rotate(0deg);
    }
  }
</style>
