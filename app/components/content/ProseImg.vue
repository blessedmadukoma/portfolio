<script setup lang="ts">
  const props = defineProps<{
    src?: string;
    alt?: string;
    title?: string;
    width?: string | number;
    height?: string | number;
  }>();

  // Route relative image paths through the server proxy (images live in the
  // private obsidian-vault GitHub repo alongside the .md files).
  const resolvedSrc = computed(() => {
    const src = props.src;
    if (!src) return "";

    // Already absolute — use as-is
    if (/^(https?:)?\/\//.test(src) || src.startsWith("/")) return src;

    // Strip leading "./"
    const clean = src.replace(/^\.\//, "");
    // Obsidian wiki-links produce bare filenames (no "/") — they live in images/
    const withFolder = clean.includes("/") ? clean : `images/${clean}`;
    return `/api/blog-image?path=${encodeURIComponent(`Blogs - Published/${withFolder}`)}`;
  });
</script>

<template>
  <img
    :src="resolvedSrc"
    :alt="alt ?? ''"
    :title="title"
    :width="width"
    :height="height"
    class="rounded-lg max-w-full"
    loading="lazy"
  />
</template>
