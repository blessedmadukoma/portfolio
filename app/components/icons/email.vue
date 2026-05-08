<template>
  <a
    href="mailto:blessedmadukoma@gmail.com"
    class="email-link flex items-center gap-[6px] hover:text-[#111] transition-colors rounded-lg px-2.5 py-1.5 -ml-2.5 hover:bg-black/[0.04] text-[12.5px] font-medium text-[#6b6661]"
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
      aria-hidden="true"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />

      <!--
        .sides — the left and right rectangular side panels of the envelope.
        Animation: scaleY [0.95 → 1] in 0.3 s easeOut, fires immediately on hover.
        transform-origin: center (matches original inline style).
      -->
      <path
        class="sides"
        d="M16 20h3a1 1 0 0 0 1 -1v-14a1 1 0 0 0 -1 -1h-3v16z"
        style="transform-origin: center"
      />
      <path
        class="sides"
        d="M5 20h3v-16h-3a1 1 0 0 0 -1 1v14a1 1 0 0 0 1 1z"
        style="transform-origin: center"
      />

      <!--
        .envelope-top — the V-fold crease at the top of the envelope.
        Animation: pathLength [0 → 1] + opacity [0 → 1] in 0.4 s easeOut.
        Fires immediately on hover (no delay).
      -->
      <path class="envelope-top" d="M16 4l-4 4l-4 -4" pathLength="1" />

      <!--
        .envelope-flap — the large diagonal "flap" line across the envelope face.
        Animation: pathLength [0 → 1] + opacity [0 → 1] in 0.5 s easeOut.
        Original uses `await` before this call, so it starts only after
        envelope-top finishes → animation-delay: 0.4s.
      -->
      <path class="envelope-flap" d="M4 6.5l8 7.5l8 -7.5" pathLength="1" />
    </svg>
    Email
  </a>
</template>

<script setup>
  // No script logic needed — animation is purely CSS-driven.
</script>

<style scoped>
  /* ─── Rest state ────────────────────────────────────────────────────────────
 *
 * All paths fully visible at rest (matches initial: {pathLength:1, opacity:1}).
 *
 * .envelope-top / .envelope-flap use the same stroke-dasharray trick as
 * the LinkedIn lines: pathLength="1" normalises path length to 1.
 *   stroke-dasharray: 1  → one dash spanning the whole path
 *   stroke-dashoffset: 0 → dash at start → visible
 *
 * .sides are always at full scale (no dashoffset needed, scaleY only).
 */
  .envelope-top,
  .envelope-flap {
    stroke-dasharray: 1;
    stroke-dashoffset: 0;
    opacity: 1;
  }

  /* ─── Hover animations ──────────────────────────────────────────────────────
 *
 * Original Framer Motion sequence:
 *
 *   animate(".envelope-top",  {pathLength:[0,1], opacity:[0,1]}, {duration:.4, ease:"easeOut"})
 *   await  ".envelope-top" finishes (0.4 s)
 *   animate(".envelope-flap", {pathLength:[0,1], opacity:[0,1]}, {duration:.5, ease:"easeOut"})
 *   animate(".sides",          {scaleY:[.95,1]},                  {duration:.3, ease:"easeOut"})
 *
 * CSS mapping:
 *   .envelope-top  → env-draw-top   0.4 s easeOut, no delay
 *   .envelope-flap → env-draw-flap  0.5 s easeOut, delay 0.4 s  (= await)
 *   .sides         → env-sides-pop  0.3 s easeOut, no delay
 */

  /* envelope top crease: draw + fade in */
  .email-link:hover .envelope-top {
    animation: env-draw-top 0.4s cubic-bezier(0, 0, 0.58, 1) forwards;
  }

  @keyframes env-draw-top {
    from {
      stroke-dashoffset: 1;
      opacity: 0;
    }
    to {
      stroke-dashoffset: 0;
      opacity: 1;
    }
  }

  /* envelope flap: draw + fade in, delayed until top finishes */
  .email-link:hover .envelope-flap {
    animation: env-draw-flap 0.5s cubic-bezier(0, 0, 0.58, 1) 0.4s forwards;
    /*
   * Without fill-mode we'd see the flap instantly appear before the
   * animation starts. Set stroke-dashoffset + opacity to hidden during
   * the delay period via animation-fill-mode: backwards (implicit with
   * 'forwards' when combined with a delay — we use explicit initial values
   * below to be safe).
   */
    stroke-dashoffset: 1;
    opacity: 0;
  }

  @keyframes env-draw-flap {
    from {
      stroke-dashoffset: 1;
      opacity: 0;
    }
    to {
      stroke-dashoffset: 0;
      opacity: 1;
    }
  }

  /* sides: subtle vertical scale pop */
  .email-link:hover .sides {
    animation: env-sides-pop 0.3s cubic-bezier(0, 0, 0.58, 1) forwards;
  }

  @keyframes env-sides-pop {
    from {
      transform: scaleY(0.95);
    }
    to {
      transform: scaleY(1);
    }
  }

  /*
 * Hover-end: browser removes :hover → animations are cancelled →
 * all properties snap back to their declared defaults (dashoffset: 0,
 * opacity: 1, scaleY: 1) — matching the original's
 * animate(".envelope-top, .envelope-flap, .sides", {pathLength:1,opacity:1,scaleY:1}, {duration:.2})
 */
</style>
