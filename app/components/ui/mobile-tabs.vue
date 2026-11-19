<template>
  <!-- Below md only. The tabs scroll with the page until they reach the top
       of the screen, then they stay there, as on the old home page. The row
       runs to the screen edges. -->
  <div
    class="sticky top-0 z-20 -mx-4 border-b border-zinc-200 bg-white/95 py-2 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/95 md:hidden"
  >
    <ui-site-tabs bare />
  </div>
</template>
