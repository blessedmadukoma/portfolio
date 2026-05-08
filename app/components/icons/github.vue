<template>
  <a
    href="https://github.com/blessedmadukoma"
    target="_blank"
    rel="noopener noreferrer"
    class="github-link flex items-center gap-[6px] hover:text-[#111] transition-colors rounded-lg px-2.5 py-1.5 -ml-2.5 hover:bg-black/[0.04] text-[12.5px] font-medium text-[#6b6661]"
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
      class="cursor-pointer text-current pointer-events-none"
      style="overflow: visible"
      aria-hidden="true"
    >
      <g class="github-icon" style="transform-origin: center">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path
          d="M9 19c-4.3 1.4 -4.3 -2.5 -6 -3m12 5v-3.5c0 -1 .1 -1.4 -.5 -2
             c2.8 -.3 5.5 -1.4 5.5 -6a4.6 4.6 0 0 0 -1.3 -3.2
             a4.2 4.2 0 0 0 -.1 -3.2s-1.1 -.3 -3.5 1.3
             a12.3 12.3 0 0 0 -6.2 0
             c-2.4 -1.6 -3.5 -1.3 -3.5 -1.3
             a4.2 4.2 0 0 0 -.1 3.2
             a4.6 4.6 0 0 0 -1.3 3.2
             c0 4.6 2.7 5.7 5.5 6
             c-.6 .6 -.6 1.2 -.5 2v3.5"
        />
      </g>
    </svg>
    Github
  </a>
</template>

<script setup>
  // No script logic needed — animation is purely CSS-driven.
</script>

<style scoped>
  /*
 * Original (Framer Motion):
 *   onHoverStart → animate(".github-icon", {
 *     scale:  [1, 1.1, 1],
 *     rotate: [0, -10, 10, 0]
 *   }, { duration: .5, ease: "easeInOut" })
 *
 *   onHoverEnd  → animate(".github-icon", { scale: 1, rotate: 0 }, { duration: .2 })
 *
 * CSS replication:
 *   A single @keyframes encodes both the scale bounce and the head-shake
 *   rotate sequence at the same time-percentages.
 *   duration: 0.5s / ease-in-out matches {duration:.5, ease:"easeInOut"}.
 *   overflow:visible on the <svg> prevents the rotated icon from being clipped.
 */
  .github-link:hover .github-icon {
    animation: gh-wiggle 0.5s ease-in-out forwards;
    transform-origin: center;
  }

  @keyframes gh-wiggle {
    /*
   * scale  keyframes: 1 → 1.1 → 1  (peak at ~50 %)
   * rotate keyframes: 0 → -10 → 10 → 0  (three equal thirds)
   * Both are layered into a single transform per frame.
   */
    0% {
      transform: scale(1) rotate(0deg);
    }
    33% {
      transform: scale(1.1) rotate(-10deg);
    }
    66% {
      transform: scale(1) rotate(10deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }
</style>
