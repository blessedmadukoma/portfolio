<script setup lang="ts">
  const props = defineProps<{
    src?: string;
    alt?: string;
    title?: string;
    width?: string | number;
    height?: string | number;
  }>();
  const isFocused = ref(false);

  function closeFocus() {
    isFocused.value = false;
  }

  function onKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") closeFocus();
  }

  watch(isFocused, (focused) => {
    if (focused) window.addEventListener("keydown", onKeydown);
    else window.removeEventListener("keydown", onKeydown);
  });

  onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));

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
  <button
    type="button"
    class="block cursor-zoom-in"
    :aria-label="`Focus image: ${alt ?? 'figure'}`"
    @click="isFocused = true"
  >
    <img
      :src="resolvedSrc"
      :alt="alt ?? ''"
      :title="title"
      :width="width"
      :height="height"
      class="rounded-lg max-w-full"
      loading="lazy"
    />
  </button>

  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isFocused"
        class="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/75 p-5 backdrop-blur-[2px]"
        role="dialog"
        aria-modal="true"
        :aria-label="alt ?? 'Focused figure'"
        @click.self="closeFocus"
      >
        <button
          type="button"
          class="absolute right-5 top-5 rounded-md bg-white/10 px-3 py-2 text-sm text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white"
          @click="closeFocus"
        >
          Close
        </button>
        <img
          :src="resolvedSrc"
          :alt="alt ?? ''"
          class="max-h-[88vh] max-w-[92vw] cursor-zoom-out rounded-lg shadow-2xl"
          @click="closeFocus"
        />
      </div>
    </Transition>
  </Teleport>
</template>
