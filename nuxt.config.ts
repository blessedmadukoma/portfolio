export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  // Temporary: unminify the production error stack trace so we can pinpoint
  // the still-unresolved hydration crash instead of guessing from minified
  // function names. Safe to remove once the crash is diagnosed and fixed.
  sourcemap: { client: true },
  css: ["~/assets/css/main.css"],
  app: {
    head: {
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap",
        },
      ],
    },
  },
  modules: [
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@vercel/analytics",
    "@nuxt/content",
  ],
  content: {
    build: {
      markdown: {
        highlight: {
          theme: {
            default: "vitesse-light", // light mode
            dark: "vitesse-dark", // dark mode (.dark class from color-mode)
          },
        },
        toc: {
          depth: 3,
          searchDepth: 3,
        },
      },
    },
  },
  ssr: true,
  colorMode: {
    classSuffix: "",
    preference: "system",
  },
  analytics: {
    mode: "production", // or 'auto'
  },
  vite: {
    optimizeDeps: {
      include: ["@vue/devtools-core", "@vue/devtools-kit"],
    },
  },
  nitro: {
    storage: {
      // Production view counts use Vercel KV directly for atomic updates.
      // This filesystem mount supports local development without KV.
      views: { driver: "fs", base: "./.data/views" },
    },
  },
});
