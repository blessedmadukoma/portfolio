<script setup lang="ts">
  import type { NormalizedPost, PostType } from "~/composables/useBlogPosts";
  import { formatDate } from "~/composables/useBlogPosts";

  defineProps<{ post: NormalizedPost }>();

  const NuxtLink = resolveComponent("NuxtLink");

  const THEMES: Record<
    PostType,
    { border: string; hoverBorder: string; hoverShadow: string; label: string }
  > = {
    native: {
      border: "border-[#e0d9f0] dark:border-[#3a3050]",
      hoverBorder: "hover:border-[#c9bfe8]",
      hoverShadow: "hover:shadow-[0_4px_16px_rgba(120,90,180,0.08)]",
      label: "Obsidian",
    },
    hashnode: {
      border: "border-[#dce8dd] dark:border-[#3a5240]",
      hoverBorder: "hover:border-[#bed4bf]",
      hoverShadow: "hover:shadow-[0_4px_16px_rgba(82,117,91,0.08)]",
      label: "Hashnode",
    },
    "x-article": {
      border: "border-[#e8e4de] dark:border-zinc-700",
      hoverBorder: "hover:border-[#d8d2cb]",
      hoverShadow: "hover:shadow-[0_4px_16px_rgba(0,0,0,0.045)]",
      label: "X Article",
    },
    medium: {
      border: "border-[#eadfcc] dark:border-[#4a3a1e]",
      hoverBorder: "hover:border-[#dfcfaf]",
      hoverShadow: "hover:shadow-[0_4px_16px_rgba(157,120,43,0.08)]",
      label: "Medium Blog",
    },
  };
</script>

<template>
  <component
    :is="post.isExternal ? 'a' : NuxtLink"
    v-bind="
      post.isExternal
        ? { href: post.href, target: '_blank', rel: 'noopener noreferrer' }
        : { to: post.href }
    "
    class="relative overflow-hidden rounded-xl border transition-[border-color,box-shadow] duration-300 mb-2 last:mb-0 group block"
    :class="[
      THEMES[post.type].border,
      THEMES[post.type].hoverBorder,
      THEMES[post.type].hoverShadow,
    ]"
  >
    <!-- Watermark -->
    <icons-obsidian
      v-if="post.type === 'native'"
      :width="64"
      :height="64"
      class="absolute -right-3 -bottom-3 text-black/[0.04] dark:text-white/[0.04] pointer-events-none"
    />
    <svg
      v-else-if="post.type === 'hashnode'"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="absolute -right-3 -bottom-3 h-16 w-16 text-black/[0.04] dark:text-white/[0.04] pointer-events-none"
      aria-hidden="true"
    >
      <path
        d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
      />
      <path d="M8 10v4" />
      <path d="M12 10v2" />
      <path d="M16 10v6" />
    </svg>
    <svg
      v-else-if="post.type === 'x-article'"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      class="absolute -right-2 -bottom-3 h-16 w-16 text-black/[0.04] dark:text-white/[0.04] pointer-events-none"
      aria-hidden="true"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
      <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
    </svg>
    <div
      v-else-if="post.type === 'medium'"
      class="absolute -right-1 -bottom-4 text-[72px] font-serif text-black/[0.04] dark:text-white/[0.04] leading-none select-none pointer-events-none"
      aria-hidden="true"
    >
      M
    </div>

    <!-- Hover button: internal arrow for native, external arrow for others -->
    <div
      class="absolute right-3 top-3 z-10 w-7 h-7 rounded-full border border-zinc-200 dark:border-zinc-600 bg-white/90 dark:bg-zinc-800/90 flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
    >
      <svg
        v-if="!post.isExternal"
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-zinc-600 dark:text-zinc-300"
        aria-hidden="true"
      >
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
      <svg
        v-else
        xmlns="http://www.w3.org/2000/svg"
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="text-zinc-600 dark:text-zinc-300"
        aria-hidden="true"
      >
        <path d="M7 7h10v10" />
        <path d="M7 17 17 7" />
      </svg>
    </div>

    <div class="flex items-start space-x-3 px-3 pt-3 pb-3">
      <!-- Thumbnail -->
      <div
        class="w-14 h-14 rounded-md overflow-hidden flex-shrink-0 mt-0.5"
        :class="
          post.type === 'native'
            ? 'bg-purple-50 dark:bg-purple-900/20'
            : 'bg-zinc-100 dark:bg-zinc-800'
        "
      >
        <img
          v-if="post.image"
          :src="post.image"
          :alt="post.title"
          class="w-full h-full object-cover"
        />
        <div v-else class="w-full h-full flex items-center justify-center">
          <icons-obsidian
            v-if="post.type === 'native'"
            :width="20"
            :height="20"
            class="text-purple-400 dark:text-purple-500"
          />
          <svg
            v-else
            class="w-5 h-5 text-zinc-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
            />
          </svg>
        </div>
      </div>

      <!-- Content -->
      <div class="space-y-1 flex-1 min-w-0 relative z-10">
        <!-- Type badge -->
        <div
          class="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500 mb-1"
        >
          <icons-obsidian v-if="post.type === 'native'" />
          <svg
            v-else-if="post.type === 'hashnode'"
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path
              d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
            />
            <path d="M8 10v4" />
            <path d="M12 10v2" />
            <path d="M16 10v6" />
          </svg>
          <svg
            v-else-if="post.type === 'x-article'"
            viewBox="0 0 24 24"
            width="11"
            height="11"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
            <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
          </svg>
          <svg
            v-else-if="post.type === 'medium'"
            xmlns="http://www.w3.org/2000/svg"
            width="11"
            height="11"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.8"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <path d="M13 21h8" />
            <path
              d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"
            />
          </svg>
          {{ THEMES[post.type].label }}
        </div>

        <!-- Title + date -->
        <div class="flex justify-between items-start gap-2">
          <h3 class="font-medium text-sm min-w-0 flex-1">
            <span
              class="line-clamp-1 text-zinc-600 dark:text-zinc-300 group-hover:text-zinc-900 dark:group-hover:text-zinc-100 group-hover:underline"
            >
              {{ post.title }}
            </span>
          </h3>
          <p
            v-if="post.date"
            class="hidden md:block text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap flex-shrink-0"
          >
            {{ formatDate(post.date) }}
          </p>
        </div>

        <!-- Description (native posts) -->
        <!-- <p
          v-if="post.description"
          class="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1"
        >
          {{ post.description }}
        </p> -->

        <!-- Read-time + views + tags -->
        <div class="flex flex-wrap items-center gap-1.5 pt-0.5">
          <span
            v-if="post.readTimeInMinutes"
            class="flex items-center gap-1 px-2 py-[2px] rounded-full text-[11px] font-medium text-zinc-500 dark:text-zinc-400 bg-white/70 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700"
          >
            <icons-book />
            {{ post.readTimeInMinutes }} minutes
          </span>

          <span
            class="px-2 py-[2px] rounded-full text-[11px] font-medium text-zinc-500 dark:text-zinc-400 bg-white/70 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700"
          >
            {{ (post.views ?? 0).toLocaleString() }} reads
          </span>

          <span
            v-for="(tag, i) in post.tags.slice(0, 3)"
            :key="tag"
            class="px-2 py-[2px] border border-zinc-200 dark:border-zinc-700 rounded-full text-[11px] font-medium text-zinc-500 dark:text-zinc-400 bg-white/80 dark:bg-zinc-800/80"
            :class="i === 2 ? 'hidden md:inline-flex' : ''"
          >
            #{{ tag }}
          </span>

          <!-- Mobile date -->
          <p
            v-if="post.date"
            class="md:hidden text-[11px] text-zinc-400 dark:text-zinc-500 ml-auto"
          >
            {{ formatDate(post.date) }}
          </p>
        </div>
      </div>
    </div>
  </component>
</template>
