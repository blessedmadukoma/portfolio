<template>
  <header
    class="z-30 bg-white dark:bg-zinc-950 md:border-b md:border-zinc-200 md:dark:border-zinc-800"
  >
    <div class="mx-auto w-full max-w-6xl px-4">
      <!-- From md up: name, tabs in the centre, theme toggle. Below md the
           tabs sit in the page instead (ui-mobile-tabs). -->
      <div
        class="flex h-14 items-center justify-between gap-3 md:grid md:h-16 md:grid-cols-[1fr_auto_1fr]"
      >
        <NuxtLink
          to="/"
          class="justify-self-start rounded-sm text-[15px] font-semibold tracking-tight text-zinc-900 hover:text-zinc-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 dark:text-zinc-100 dark:hover:text-zinc-400 dark:focus-visible:ring-zinc-100"
        >
          Blessed Madukoma
        </NuxtLink>
        <ui-site-tabs class="hidden md:block" />
        <div class="justify-self-end">
          <ui-theme-toggle />
        </div>
      </div>
    </div>
  </header>
</template>
