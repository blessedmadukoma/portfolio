<template>
  <a
    href="https://mblessed.hashnode.dev/"
    target="_blank"
    rel="noopener noreferrer"
    class="medium-link flex items-center gap-[6px] hover:text-[#111] transition-colors rounded-lg px-2.5 py-1.5 -ml-2.5 hover:bg-black/[0.04] text-[12.5px] font-medium text-[#6b6661]"
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
      <!--
        Lucide pen-tool icon — same paths as the original site.

        Animation design (original has none; this extends the set's style):
          .pen-body  — the main diagonal shaft + the handle arrow body
                       draws itself in, 0.45 s easeOut (like LinkedIn lines)
          .pen-nib   — the diamond tip at the bottom-right
                       draws in after the shaft, 0.35 s easeOut, delay 0.3 s
          .pen-line  — the small diagonal guide-line from the origin
                       draws in simultaneously with the body, 0.3 s easeOut
          .pen-dot   — the circle at the Bezier anchor point
                       fades + scales in last, 0.25 s easeOut, delay 0.4 s

        All paths start fully visible at rest (stroke-dashoffset: 0).
        On hover the keyframes jump to hidden (dashoffset = 1) then draw to visible.
      -->

      <!-- pen shaft / body -->
      <path
        class="pen-body"
        d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18"
        pathLength="1"
      />

      <!-- diagonal guide line from origin -->
      <path class="pen-line" d="m2.3 2.3 7.286 7.286" pathLength="1" />

      <!-- nib / tip diamond -->
      <path
        class="pen-nib"
        d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z"
        pathLength="1"
      />

      <!-- anchor-point circle -->
      <circle class="pen-dot" cx="11" cy="11" r="2" />
    </svg>
    Hashnode
  </a>
</template>

<script setup>
  // No script logic needed — animation is purely CSS-driven.
</script>

<style scoped>
  /* ─── Rest state: all elements visible ─────────────────────────────────────── */
  .pen-body,
  .pen-line,
  .pen-nib {
    stroke-dasharray: 1;
    stroke-dashoffset: 0; /* fully drawn */
  }

  .pen-dot {
    opacity: 1;
    transform: scale(1);
    transform-origin: 11px 11px; /* circle centre */
  }

  /* ─── Hover animations ───────────────────────────────────────────────────────
 *
 * Sequence mirrors the email icon's staged approach:
 *   0.00 s  pen-body + pen-line  start drawing (0.45 s / 0.30 s)
 *   0.30 s  pen-nib              starts drawing  (0.35 s)
 *   0.40 s  pen-dot              fades + pops in (0.25 s)
 */

  /* shaft: draws first, longest path so gets the most time */
  .medium-link:hover .pen-body {
    animation: pen-draw 0.45s cubic-bezier(0, 0, 0.58, 1) forwards;
  }

  /* guide line: draws simultaneously with shaft, shorter so finishes first */
  .medium-link:hover .pen-line {
    animation: pen-draw 0.3s cubic-bezier(0, 0, 0.58, 1) forwards;
  }

  /* nib: starts once the shaft is well under way */
  .medium-link:hover .pen-nib {
    animation: pen-draw 0.35s cubic-bezier(0, 0, 0.58, 1) 0.3s forwards;
    /* keep hidden during delay */
    stroke-dashoffset: 1;
  }

  /* anchor dot: pops in last */
  .medium-link:hover .pen-dot {
    animation: pen-dot-pop 0.25s cubic-bezier(0, 0, 0.58, 1) 0.4s forwards;
    opacity: 0;
    transform: scale(0.4);
  }

  /* shared draw keyframe (same technique as LinkedIn / Email) */
  @keyframes pen-draw {
    from {
      stroke-dashoffset: 1;
    }
    to {
      stroke-dashoffset: 0;
    }
  }

  /* circle: scale-up + fade-in */
  @keyframes pen-dot-pop {
    from {
      opacity: 0;
      transform: scale(0.4);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  /*
 * Hover-end: :hover removed → animations cancelled → all properties
 * revert to their declared defaults (dashoffset: 0, opacity: 1, scale: 1).
 */
</style>
