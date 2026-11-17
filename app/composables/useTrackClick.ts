// Counts clicks on the links that matter for job applications (email and the
// resume), so I can see whether the site turns visits into contact.
// Only a count per link is stored; no visitor data.
export type TrackedLink = "email" | "resume" | "academic-cv";

export function useTrackClick() {
  return (name: TrackedLink) => {
    if (typeof navigator === "undefined") return;
    const url = `/api/clicks/${name}`;
    try {
      if (navigator.sendBeacon?.(url)) return;
    } catch {
      // Fall through to fetch.
    }
    fetch(url, { method: "POST", keepalive: true }).catch(() => {
      // A lost count must never block the link.
    });
  };
}
