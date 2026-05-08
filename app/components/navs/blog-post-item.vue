<script setup lang="ts">
  import type { PostNode, PostType } from "~/composables/useBlogPosts";
  import { formatDate } from "~/composables/useBlogPosts";

  defineProps<{ post: PostNode; type: PostType }>();

  const THEMES: Record<
    PostType,
    { border: string; hoverBorder: string; hoverShadow: string; label: string }
  > = {
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
  <a
    :href="`https://mblessed.hashnode.dev/${post.slug}`"
    target="_blank"
    rel="noopener noreferrer"
    class="relative overflow-hidden rounded-xl border transition-[border-color,box-shadow] duration-300 mb-2 last:mb-0 group block"
    :class="[THEMES[type].border, THEMES[type].hoverBorder, THEMES[type].hoverShadow]"
  >
    <!-- Watermark -->
    <svg
      v-if="type === 'hashnode'"
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
      v-else-if="type === 'x-article'"
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
      v-else-if="type === 'medium'"
      class="absolute -right-1 -bottom-4 text-[72px] font-serif text-black/[0.04] dark:text-white/[0.04] leading-none select-none pointer-events-none"
      aria-hidden="true"
    >
      M
    </div>

    <!-- External-link hover button -->
    <div
      class="absolute right-3 top-3 z-10 w-7 h-7 rounded-full border border-zinc-200 dark:border-zinc-600 bg-white/90 dark:bg-zinc-800/90 flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
    >
      <svg
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

    <!-- Main row -->
    <div class="flex items-start space-x-3 px-3 pt-3 pb-3">
      <!-- Thumbnail -->
      <div
        class="w-14 h-14 rounded-md overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex-shrink-0 mt-0.5"
      >
        <img
          v-if="post.coverImage?.url"
          :src="post.coverImage.url"
          :alt="post.title"
          class="w-full h-full object-cover"
        />
        <div v-else class="w-full h-full flex items-center justify-center">
          <svg
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
          <svg
            v-if="type === 'hashnode'"
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
            v-else-if="type === 'x-article'"
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
            v-else-if="type === 'medium'"
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
          {{ THEMES[type].label }}
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
            class="hidden md:block text-xs text-zinc-500 dark:text-zinc-400 whitespace-nowrap flex-shrink-0"
          >
            {{ formatDate(post.publishedAt) }}
          </p>
        </div>

        <!-- Read-time + views + tags -->
        <div class="flex flex-wrap items-center gap-1.5 pt-0.5">
          <span
            class="flex items-center gap-1 px-2 py-[2px] rounded-full text-[11px] font-medium text-zinc-500 dark:text-zinc-400 bg-white/70 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700"
          >
            <icons-book />
            {{ post.readTimeInMinutes }} min read
          </span>

          <span
            class="px-2 py-[2px] rounded-full text-[11px] font-medium text-zinc-500 dark:text-zinc-400 bg-white/70 dark:bg-zinc-800/70 border border-zinc-200 dark:border-zinc-700"
          >
            {{ post.views.toLocaleString() }} reads
          </span>

          <span
            v-for="(tag, i) in post.tags.slice(0, 3)"
            :key="tag.slug"
            class="px-2 py-[2px] border border-zinc-200 dark:border-zinc-700 rounded-full text-[11px] font-medium text-zinc-500 dark:text-zinc-400 bg-white/80 dark:bg-zinc-800/80"
            :class="i === 2 ? 'hidden md:inline-flex' : ''"
          >
            #{{ tag.name }}
          </span>

          <!-- Mobile date -->
          <p class="md:hidden text-[11px] text-zinc-400 dark:text-zinc-500 ml-auto">
            {{ formatDate(post.publishedAt) }}
          </p>
        </div>
      </div>
    </div>
  </a>
</template>
