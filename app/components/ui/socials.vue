<script setup lang="ts">
  const activeSocialIndex = ref(-1);
  let socialTimer: ReturnType<typeof setInterval> | undefined;

  onMounted(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const activateNext = () => {
      activeSocialIndex.value = (activeSocialIndex.value + 1) % 6;
    };

    activateNext();
    socialTimer = window.setInterval(activateNext, 2_000);
  });

  onBeforeUnmount(() => {
    if (socialTimer) window.clearInterval(socialTimer);
  });
</script>

<template>
  <div class="flex flex-wrap items-center gap-x-2 gap-y-1">
    <icons-email :class="{ 'is-socially-active': activeSocialIndex === 0 }" />
    <icons-github :class="{ 'is-socially-active': activeSocialIndex === 1 }" />
    <icons-linkedin :class="{ 'is-socially-active': activeSocialIndex === 2 }" />
    <icons-writing :class="{ 'is-socially-active': activeSocialIndex === 3 }" />
    <icons-scholar :class="{ 'is-socially-active': activeSocialIndex === 4 }" />
    <icons-cv :class="{ 'is-socially-active': activeSocialIndex === 5 }" />
  </div>
</template>
