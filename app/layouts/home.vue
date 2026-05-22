<template>
  <main
    class="flex flex-col h-screen overflow-hidden bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 theme-transition"
  >
    <div
      class="flex-1 flex flex-col h-full max-w-6xl mx-auto w-full px-4 pt-8 pb-4"
    >
      <slot />
    </div>
  </main>
</template>
