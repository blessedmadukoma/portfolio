<script setup lang="ts">
  import { decodeContactReference } from "#shared/utils/canary";
  import type { CanaryHit } from "~~/server/utils/canary-store";

  definePageMeta({ layout: "default" });

  useHead({
    title: "Canary",
    meta: [{ name: "robots", content: "noindex, nofollow" }],
  });

  const route = useRoute();
  const key = computed(() => String(route.query.key ?? ""));

  const { data, error } = await useFetch<{ hits: CanaryHit[] }>("/api/canary", {
    query: { key },
  });

  const hits = computed(() => data.value?.hits ?? []);

  function formatTime(value: string) {
    if (!value) return "";
    return new Date(value).toLocaleString("en-GB", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  }

  function fetchedAt(reference: string) {
    const decoded = decodeContactReference(reference);
    return decoded ? formatTime(decoded.toISOString()) : "";
  }
</script>

<template>
  <div class="max-w-6xl mx-auto w-full px-4 py-10">
    <h1 class="text-lg font-semibold">Canary</h1>

    <p v-if="error" class="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
      Not found.
    </p>

    <template v-else>
      <p class="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        {{ hits.length }} recorded {{ hits.length === 1 ? "hit" : "hits" }},
        newest first.
      </p>

      <p
        v-if="!hits.length"
        class="mt-6 text-sm text-zinc-500 dark:text-zinc-400"
      >
        Nothing recorded yet.
      </p>

      <div v-else class="mt-6 overflow-x-auto">
        <table class="w-full text-left text-[13px] border-collapse">
          <thead
            class="text-zinc-500 dark:text-zinc-400 border-b border-zinc-200 dark:border-zinc-800"
          >
            <tr>
              <th class="py-2 pr-4 font-medium whitespace-nowrap">Beacon</th>
              <th class="py-2 pr-4 font-medium whitespace-nowrap">
                Page fetched
              </th>
              <th class="py-2 pr-4 font-medium">Name</th>
              <th class="py-2 pr-4 font-medium">Organisation</th>
              <th class="py-2 pr-4 font-medium">Site</th>
              <th class="py-2 pr-4 font-medium">Purpose</th>
              <th class="py-2 pr-4 font-medium whitespace-nowrap">IP</th>
              <th class="py-2 pr-4 font-medium">User agent</th>
              <th class="py-2 pr-4 font-medium whitespace-nowrap">Ref</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(hit, index) in hits"
              :key="`${hit.at}-${index}`"
              class="border-b border-zinc-100 dark:border-zinc-900 align-top"
            >
              <td class="py-2 pr-4 whitespace-nowrap">{{ formatTime(hit.at) }}</td>
              <td class="py-2 pr-4 whitespace-nowrap text-zinc-500 dark:text-zinc-400">
                {{ fetchedAt(hit.ref) }}
              </td>
              <td class="py-2 pr-4">{{ hit.name }}</td>
              <td class="py-2 pr-4">{{ hit.org }}</td>
              <td class="py-2 pr-4 break-all">{{ hit.site }}</td>
              <td class="py-2 pr-4">{{ hit.purpose }}</td>
              <td class="py-2 pr-4 whitespace-nowrap">{{ hit.ip }}</td>
              <td class="py-2 pr-4 text-zinc-500 dark:text-zinc-400 break-all">
                {{ hit.userAgent }}
              </td>
              <td class="py-2 pr-4 whitespace-nowrap text-zinc-500 dark:text-zinc-400">
                {{ hit.ref }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </template>
  </div>
</template>
