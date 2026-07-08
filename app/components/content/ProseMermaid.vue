<script lang="ts">
  // Module-scoped (not per-instance) so every diagram on the page gets a
  // unique id for mermaid.render, even when several ProseMermaid instances
  // mount at once.
  let idCounter = 0;
</script>

<script setup lang="ts">
  const props = defineProps<{
    code: string;
  }>();

  const colorMode = useColorMode();
  const isDark = computed(() => colorMode.value === "dark");

  const svgHtml = ref("");
  const renderError = ref<string | null>(null);

  const renderDiagram = async () => {
    renderError.value = null;
    try {
      const { default: mermaid } = await import("mermaid");
      mermaid.initialize({
        startOnLoad: false,
        theme: isDark.value ? "dark" : "default",
        securityLevel: "strict",
      });
      const { svg } = await mermaid.render(`mermaid-diagram-${++idCounter}`, props.code);
      svgHtml.value = svg;
    } catch (err) {
      renderError.value = err instanceof Error ? err.message : "Failed to render diagram";
      svgHtml.value = "";
    }
  };

  onMounted(renderDiagram);
  watch(isDark, renderDiagram);
</script>

<template>
  <ClientOnly>
    <div v-if="svgHtml" class="not-prose" v-html="svgHtml" />
    <div
      v-else-if="renderError"
      class="not-prose text-sm text-red-600 dark:text-red-400 border border-red-300 dark:border-red-800 rounded-md p-3"
    >
      <p class="font-medium mb-1">Could not render diagram</p>
      <pre class="whitespace-pre-wrap text-xs opacity-80">{{ code }}</pre>
    </div>
    <template #fallback>
      <pre class="not-prose opacity-60"><code>{{ code }}</code></pre>
    </template>
  </ClientOnly>
</template>
