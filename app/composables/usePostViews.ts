export function usePostViews(slug: string) {
  const { data, refresh } = useFetch<{ views: number }>(`/api/views/${slug}`);
  const views = computed(() => data.value?.views ?? 0);

  async function recordView() {
    // sessionStorage persists through refreshes in the same tab but resets
    // when the tab is closed — prevents refresh-inflate without needing cookies.
    const key = `viewed:${slug}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    await $fetch(`/api/views/${slug}`, { method: "POST" });
    await refresh();
  }

  return { views, recordView };
}
