<template>
  <main
    class="flex min-h-dvh flex-col bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 theme-transition md:h-dvh md:overflow-hidden"
  >
    <!-- Small screens: the whole page scrolls. From md up, the page fits the
         screen and only the tab contents scroll. -->
    <div
      class="flex-1 flex flex-col max-w-6xl mx-auto w-full px-4 pt-8 pb-4 md:h-full md:min-h-0"
    >
      <slot />
    </div>
  </main>
</template>
