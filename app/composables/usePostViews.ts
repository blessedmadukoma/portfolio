export function usePostViews(slug: string) {
  const { data } = useFetch<{ views: number }>(`/api/views/${slug}`);
  const views = computed(() => data.value?.views ?? null);

  async function recordView() {
    if (document.visibilityState !== "visible") return;

    const key = `viewed:${slug}`;
    const oneDay = 24 * 60 * 60 * 1000;
    try {
      const lastViewedAt = Number(localStorage.getItem(key) ?? 0);
      if (Date.now() - lastViewedAt < oneDay) return;
    } catch {
      // The server-side cookie still deduplicates views if storage is blocked.
    }

    try {
      data.value = await $fetch<{ views: number }>(`/api/views/${slug}`, {
        method: "POST",
      });
      try {
        localStorage.setItem(key, String(Date.now()));
      } catch {
        // The count succeeded. Local storage is only a request optimisation.
      }
    } catch {
      // Keep the last successfully loaded count. A later visit can retry.
    }
  }

  return { views, recordView };
}
