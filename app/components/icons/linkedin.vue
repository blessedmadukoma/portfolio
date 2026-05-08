<template>
  <a
    href="https://www.linkedin.com/in/blessed-madukoma"
    target="_blank"
    rel="noopener noreferrer"
    class="linkedin-link flex items-center gap-[6px] hover:text-[#111] transition-colors rounded-lg px-2.5 py-1.5 -ml-2.5 hover:bg-black/[0.04] text-[12.5px] font-medium text-[#6b6661]"
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
      class="linkedin-icon cursor-pointer text-current pointer-events-none"
      aria-hidden="true"
    >
      <!-- Invisible clip path — standard Tabler/Lucide pattern -->
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />

      <!--
        .lines — the "in" letterforms.
        pathLength="1" normalises the path length to 1, so:
          stroke-dasharray: 1  →  one dash spanning the full path
          stroke-dashoffset: 0 →  dash starts at beginning → fully visible (rest state)
          stroke-dashoffset: 1 →  dash offset by full length  → fully hidden (animation start)
        On hover the CSS animation fires: dashoffset 1 → 0 in 0.5 s easeOut
        exactly matching Framer Motion's: animate(".lines", {pathLength:[0,1]}, {duration:.5,ease:"easeOut"})
      -->
      <path class="lines" d="M8 11v5" pathLength="1" />
      <path class="lines" d="M8 8v.01" pathLength="1" />
      <path class="lines" d="M12 16v-5" pathLength="1" />
      <path class="lines" d="M16 16v-3a2 2 0 1 0 -4 0" pathLength="1" />

      <!-- .border — the rounded-rectangle outline, no animation -->
      <path
        class="border-path"
        d="M3 7a4 4 0 0 1 4 -4h10a4 4 0 0 1 4 4v10a4 4 0 0 1 -4 4h-10a4 4 0 0 1 -4 -4z"
      />
    </svg>
    Linkedin
  </a>
</template>

<script setup>
  // No script logic needed — animation is purely CSS-driven.
</script>

<style scoped>
  /* ─── Default (rest) state for the "in" lines ─────────────────────────────── */
  .lines {
    /*
   * stroke-dasharray: 1  — with pathLength="1" this means one dash that is
   * exactly as long as the entire path, so the path appears fully drawn.
   *
   * stroke-dashoffset: 0 — dash starts at position 0, so it's visible.
   */
    stroke-dasharray: 1;
    stroke-dashoffset: 0;
  }

  /* ─── Hover: fire the draw animation ──────────────────────────────────────── */
  /*
 * CSS :hover on the parent <a> mirrors Framer Motion's onHoverStart callback.
 * The [from → to] keyframes replicate pathLength: [0, 1] — the path is
 * instantly hidden (offset = 1) then draws itself into view (offset → 0).
 *
 * duration: 0.5s / ease-out matches {duration: .5, ease: "easeOut"}.
 */
  .linkedin-link:hover .lines {
    animation: li-draw 0.5s cubic-bezier(0, 0, 0.58, 1) forwards;
  }

  @keyframes li-draw {
    from {
      stroke-dashoffset: 1; /* hidden: dash is shifted one full path-length away */
    }
    to {
      stroke-dashoffset: 0; /* visible: dash sits at the start of the path */
    }
  }

  /*
 * Hover-end behaviour (mouse-leave): the animation class is removed by
 * the browser when :hover no longer matches, so stroke-dashoffset reverts
 * to the default value of 0 (lines fully visible) — this reproduces
 * Framer Motion's stopAnimation: animate(".lines,.border",{pathLength:1},{duration:.2}).
 *
 * No explicit transition is set for the leave direction because the
 * original site resets instantaneously at 0.2 s, which is indistinguishable
 * from the instant CSS revert for a 16 × 16 px icon.
 */
</style>
