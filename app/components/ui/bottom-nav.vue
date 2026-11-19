<script setup lang="ts">
  import { SITE_NAV } from "~/data/site-nav";

  // Below md only: a bar that floats at the bottom of the screen, as in a
  // phone app. It has a Home item first, because the section tabs alone give
  // no way back to the home page. The name in the header also links home.
  const ITEMS = [{ label: "Home", to: "/" }, ...SITE_NAV];

  // Icon paths from Lucide (lucide.dev, ISC licence), 24 x 24, stroke only.
  const ICONS: Record<string, string[]> = {
    "/": [
      "M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8",
      "M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
    ],
    "/research": [
      "M10 2v7.527a2 2 0 0 1-.211.896L4.72 20.55a1 1 0 0 0 .9 1.45h12.76a1 1 0 0 0 .9-1.45l-5.069-10.127A2 2 0 0 1 14 9.527V2",
      "M8.5 2h7",
      "M7 16h10",
    ],
    "/experience": [
      "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",
      "M4 6h16a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",
    ],
    "/projects": [
      "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
    ],
    "/blog": [
      "M12 20h9",
      "M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z",
    ],
    "/tools": [
      "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z",
    ],
  };

  const route = useRoute();
  const isActive = (to: string) =>
    to === "/"
      ? route.path === "/"
      : route.path === to || route.path.startsWith(`${to}/`);
</script>

<template>
  <nav
    aria-label="Site sections"
    class="fixed inset-x-0 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-40 flex justify-center px-3 md:hidden"
  >
    <!-- Only the current page shows its label, so the bar fits a 320 px
         screen. The other items show their icon, and their label is for
         screen readers. -->
    <ul
      class="flex w-full max-w-sm items-center gap-1 rounded-2xl border border-zinc-200 bg-zinc-50 p-1.5 shadow-lg shadow-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/40"
    >
      <li
        v-for="item in ITEMS"
        :key="item.to"
        :class="isActive(item.to) ? 'shrink-0' : 'min-w-0 flex-1'"
      >
        <NuxtLink
          :to="item.to"
          :aria-current="isActive(item.to) ? 'page' : undefined"
          :class="[
            'flex h-11 items-center justify-center gap-1.5 rounded-xl px-3 text-[13px] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-zinc-900 dark:focus-visible:ring-zinc-100',
            isActive(item.to)
              ? 'bg-white font-medium text-zinc-900 shadow-sm ring-1 ring-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:ring-zinc-700'
              : 'text-zinc-500 hover:text-zinc-900 active:bg-zinc-200/70 dark:text-zinc-400 dark:hover:text-zinc-100 dark:active:bg-zinc-800',
          ]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="shrink-0"
            aria-hidden="true"
          >
            <path v-for="d in ICONS[item.to]" :key="d" :d="d" />
          </svg>
          <span :class="isActive(item.to) ? 'whitespace-nowrap' : 'sr-only'">
            {{ item.label }}
          </span>
        </NuxtLink>
      </li>
    </ul>
  </nav>
</template>
