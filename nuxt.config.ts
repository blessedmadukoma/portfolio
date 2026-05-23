export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
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
      },
    },
  },
  ssr: true,
  colorMode: {
    classSuffix: "",
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
      views:
        process.env.VERCEL && process.env.KV_REST_API_URL
          ? { driver: "vercel-kv" }
          : process.env.VERCEL
            ? { driver: "memory" } // KV not connected yet — views won't persist but won't crash
            : { driver: "fs", base: "./.data/views" },
    },
  },
});
