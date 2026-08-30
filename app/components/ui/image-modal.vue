<script setup lang="ts">
  const props = withDefaults(
    defineProps<{
      src: string;
      alt?: string;
    }>(),
    { alt: "Expanded image" },
  );

  const emit = defineEmits<{ close: [] }>();

  const close = () => emit("close");

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape") close();
  };

  onMounted(() => window.addEventListener("keydown", onKeydown));
  onBeforeUnmount(() => window.removeEventListener("keydown", onKeydown));
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/75 p-5 backdrop-blur-sm"
        role="dialog"
        aria-modal="true"
        :aria-label="alt"
        @click.self="close"
      >
        <div class="pointer-events-none relative inline-block max-h-[88vh] max-w-[92vw]">
          <button
            type="button"
            class="pointer-events-auto absolute right-0 -top-7 text-sm text-white/80 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
            @click="close"
          >
            Close ✕
          </button>
          <img
            :src="src"
            :alt="alt"
            class="pointer-events-auto block max-h-[88vh] max-w-[92vw] rounded-lg shadow-2xl"
            @click.stop
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
