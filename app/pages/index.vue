<template>
  <section class="min-h-screen flex flex-col overflow-hidden py-2 space-y-8">
    <section class="space-y-2">
      <ui-hero />
      <ui-socials />
    </section>

    <section class="flex-1 overflow-auto">
      <ui-content />
    </section>

    <section>
      <ui-footer />
    </section>
  </section>
</template>
