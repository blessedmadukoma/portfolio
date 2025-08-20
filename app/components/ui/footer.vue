<script lang="ts" setup>
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
  let day = weekday[date.getDay()];
  let year = date.getFullYear();
</script>

<template>
  <div class="relative bottom-0 w-full dark:text-gray-300 text-sm">
    <nav>
      <ul class="flex justify-between items-center space-x-4">
        <li class="flex flex-col">
          <a
            href="https://mblessed.space"
            target="_blank"
            class="text-blue-500 hover:underline"
            >mblessed.space</a
          >
          <p>
            <span class="">
              Have a wonderful
              <!-- <span class="text-white">{{ day }}</span> 🚀 -->
              <span class="font-bold">{{ day }}</span> 🚀
            </span>
          </p>
          <p>
            Inspired by
            <a
              href="https://www.chizi.app/"
              target="_blank"
              class="text-blue-800 hover:underline"
              >Chizi</a
            >
            &
            <a
              href="https://janvi.me"
              target="_blank"
              class="text-blue-800 hover:underline"
              >Janvi</a
            >
          </p>
        </li>
        <li>
          <div class="flex justify-between text-end items-end">
            <!-- <div class="hidden md:block text-[#939196] text-xs md:text-base">
              &copy;{{ year }}.
            </div> -->

            <div
              class="text-[#939196] text-center flex flex-col items-center mr-4 mb-4"
            >
              <div class="relative">
                <img
                  src="../../assets/imgs/memoji.png"
                  alt="Memoji"
                  class="w-20 h-20 rounded-full border-2 border-gray-300 dark:border-gray-600"
                />

                <div
                  class="absolute -bottom-[42px] -left-[14px] animate-spin-slow"
                >
                  <icons-name width="110" />
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </nav>
  </div>
</template>
