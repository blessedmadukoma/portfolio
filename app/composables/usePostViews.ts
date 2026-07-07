export function usePostViews(slug: string) {
  const { data } = useFetch<{ views: number }>(`/api/views/${slug}`);
  const views = computed(() => data.value?.views ?? null);

  async function recordView() {
    // sessionStorage persists through refreshes in the same tab but resets
    // when the tab is closed — prevents refresh-inflate without needing cookies.
    const key = `viewed:${slug}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    data.value = await $fetch<{ views: number }>(`/api/views/${slug}`, {
      method: "POST",
    });
  }

  return { views, recordView };
}
