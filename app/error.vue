<script setup lang="ts">
  import type { NuxtError } from "#app";

  const props = defineProps<{ error: NuxtError }>();

  const notFound = computed(() => props.error.statusCode === 404);
  const code = computed(() => props.error.statusCode || 500);

  useHead({
    title: () =>
      notFound.value
        ? "Page not found | Blessed Madukoma"
        : "Something went wrong | Blessed Madukoma",
  });

  // An error page stays up until the error is cleared, so every way out of
  // it goes through clearError.
  const goTo = (path: string) => clearError({ redirect: path });
  const tryAgain = () => {
    clearError();
    if (import.meta.client) window.location.reload();
  };
</script>

<template>
  <NuxtLayout name="site">
    <section class="flex min-h-[60vh] items-center py-16">
      <div class="max-w-xl space-y-5">
        <p class="font-mono text-sm text-zinc-500 dark:text-zinc-400">
          Error {{ code }}
        </p>
        <h1
          class="text-2xl font-medium tracking-tight text-zinc-900 dark:text-zinc-100"
        >
          {{
            notFound
              ? "This page does not exist."
              : "Something went wrong on my side."
          }}
        </h1>
        <p
          class="text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400 md:text-sm"
        >
          <template v-if="notFound">
            The link may be old, or the page may have moved. Start from the
            home page, or look through my thoughts.
          </template>
          <template v-else>
            The page did not load. Try again in a moment. If it still fails,
            email me at
            <a
              href="mailto:blessedmadukoma@gmail.com"
              class="text-zinc-900 underline underline-offset-4 dark:text-zinc-100"
              >blessedmadukoma@gmail.com</a
            >.
          </template>
        </p>
        <div class="flex flex-wrap gap-2">
          <button
            v-if="!notFound"
            type="button"
            class="inline-flex h-9 items-center rounded-md bg-zinc-900 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-950"
            @click="tryAgain"
          >
            Try again
          </button>
          <button
            type="button"
            class="inline-flex h-9 items-center rounded-md px-4 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-950"
            :class="
              notFound
                ? 'bg-zinc-900 text-white hover:bg-zinc-700 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300'
                : 'border border-zinc-200 text-zinc-700 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800'
            "
            @click="goTo('/')"
          >
            Go to the home page
          </button>
          <button
            v-if="notFound"
            type="button"
            class="inline-flex h-9 items-center rounded-md border border-zinc-200 px-4 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900 focus-visible:ring-offset-2 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800 dark:focus-visible:ring-zinc-100 dark:focus-visible:ring-offset-zinc-950"
            @click="goTo('/blog')"
          >
            Read my thoughts
          </button>
        </div>
      </div>
    </section>
  </NuxtLayout>
</template>
