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

  // responsive icon width: 48 on small screens, 110 from md and up
  const iconWidth = ref<number>(60);

  const updateIconWidth = () => {
    if (typeof window === "undefined") {
      iconWidth.value = 110;
      return;
    }
    // Tailwind md breakpoint ~768px
    iconWidth.value = window.innerWidth >= 768 ? 110 : 60;
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
  <div class="border-t border-zinc-200 dark:border-zinc-800 pt-2 md:pt-5">
    <div class="flex justify-between items-center sm:items-center gap-6">
      <!-- Left: links and greeting -->
      <div class="flex flex-col gap-1 text-sm text-zinc-500 dark:text-zinc-400">
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
        <p>
          Inspired by
          <a
            href="https://www.chizi.app/"
            target="_blank"
            rel="noopener noreferrer"
            class="text-zinc-600 dark:text-zinc-300 underline transition-colors"
            >Chizi</a
          >
          &amp;
          <a
            href="https://janvi.me"
            target="_blank"
            rel="noopener noreferrer"
            class="text-zinc-600 dark:text-zinc-300 underline transition-colors"
            >Janvi</a
          >
        </p>
      </div>

      <!-- Right: memoji + spinning name -->
      <div class="flex items-end mr-4 pb-1">
        <div class="relative w-10 h-10 md:w-20 md:h-20">
          <img
            src="../../assets/imgs/memoji.png"
            alt="Memoji"
            class="w-10 h-10 md:w-20 md:h-20 rounded-full border-2 border-zinc-200 dark:border-zinc-700"
          />
          <div
            class="absolute -top-[61px] -left-2.5 md:-top-[42px] md:-left-3.5 animate-spin-slow"
          >
            <icons-name :width="String(iconWidth)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
