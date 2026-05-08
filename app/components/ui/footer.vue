<script lang="ts" setup>
  import { onBeforeUnmount, onMounted, ref } from "vue";

  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const date = new Date();
  const day = weekday[date.getDay()];
  const year = date.getFullYear();

  const iconWidth = ref<number>(36);

  const updateIconWidth = () => {
    if (typeof window === "undefined") {
      iconWidth.value = 60;
      return;
    }
    iconWidth.value = window.innerWidth >= 768 ? 60 : 36;
  };

  onMounted(() => {
    updateIconWidth();
    window.addEventListener("resize", updateIconWidth);
  });

  onBeforeUnmount(() => {
    window.removeEventListener("resize", updateIconWidth);
  });
</script>

<template>
  <div class="border-t border-zinc-200 dark:border-zinc-800 pt-1 md:pt-3">
    <div class="flex justify-between items-center gap-6">
      <!-- Left: links and greeting -->
      <div
        class="flex flex-col gap-0.5 text-xs text-zinc-500 dark:text-zinc-400"
      >
        <a
          href="https://mblessed.space"
          target="_blank"
          rel="noopener noreferrer"
          class="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          mblessed.space &copy; {{ year }}
        </a>
        <p>
          Have a wonderful
          <span class="font-medium text-zinc-900 dark:text-zinc-100">{{
            day
          }}</span>
          🚀
        </p>
      </div>

      <!-- Right: memoji + spinning name -->
      <div class="flex items-end mr-2 pb-1">
        <div class="relative w-6 h-6 md:w-10 md:h-10">
          <img
            src="../../assets/imgs/memoji.png"
            alt="Memoji"
            class="w-6 h-6 md:w-10 md:h-10 rounded-full border-2 border-zinc-200 dark:border-zinc-700"
          />
          <div
            class="absolute -top-1.5 -left-1.5 md:-top-[10px] md:-left-[10px] animate-spin-slow"
          >
            <icons-name :width="String(iconWidth)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
