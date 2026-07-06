<script lang="ts" setup>
  import { onBeforeUnmount, onMounted, ref } from "vue";

  interface TocLink {
    id: string;
    text: string;
    depth: number;
    children?: TocLink[];
  }

  const props = defineProps<{
    links: TocLink[];
  }>();

  const activeId = ref<string | null>(null);
  let observer: IntersectionObserver | null = null;

  const flatten = (links: TocLink[]): TocLink[] =>
    links.flatMap((link) => [link, ...(link.children ? flatten(link.children) : [])]);

  onMounted(() => {
    const headings = flatten(props.links)
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => el !== null);

    if (!headings.length) return;

    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) activeId.value = visible.target.id;
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );

    headings.forEach((heading) => observer!.observe(heading));
  });

  onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <nav
    v-if="links.length"
    aria-label="Table of contents"
    class="hidden md:block sticky top-8 self-start max-h-[calc(100vh-4rem)] overflow-y-auto pr-2"
  >
    <p
      class="text-xs font-bold uppercase tracking-[0.14em] text-zinc-400 dark:text-zinc-500 mb-2"
    >
      On this page
    </p>
    <ul class="space-y-1 text-sm border-l border-zinc-200 dark:border-zinc-800">
      <li v-for="link in links" :key="link.id">
        <a
          :href="`#${link.id}`"
          class="block pl-3 -ml-px border-l-2 py-1 transition-colors"
          :class="
            activeId === link.id
              ? 'border-zinc-900 dark:border-zinc-100 text-zinc-900 dark:text-zinc-100 font-medium'
              : 'border-transparent text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
          "
          @click="activeId = link.id"
        >
          {{ link.text }}
        </a>
        <ul v-if="link.children?.length" class="ml-3 space-y-1">
          <li v-for="child in link.children" :key="child.id">
            <a
              :href="`#${child.id}`"
              class="block pl-3 py-0.5 text-xs transition-colors"
              :class="
                activeId === child.id
                  ? 'text-zinc-900 dark:text-zinc-100 font-medium'
                  : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200'
              "
              @click="activeId = child.id"
            >
              {{ child.text }}
            </a>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
