// The pages in the site header, in order. Each is its own route.
export const SITE_NAV = [
  { label: "Research", to: "/research" },
  { label: "Experience", to: "/experience" },
  { label: "Projects", to: "/projects" },
  { label: "Thoughts", to: "/blog" },
  { label: "Tools", to: "/tools" },
] as const;

// Page widths the site layout supports. A page picks one with
// definePageMeta({ width: "3xl" }); the default is "6xl".
export const PAGE_WIDTHS = {
  "3xl": "max-w-3xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
} as const;

export type PageWidth = keyof typeof PAGE_WIDTHS;
