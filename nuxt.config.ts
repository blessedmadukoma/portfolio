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
      views: process.env.VERCEL
        ? { driver: "vercel-kv" } // Vercel KV in production
        : { driver: "fs", base: "./.data/views" }, // local dev
    },
  },
});
