export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: ["@nuxt/image", "@nuxtjs/tailwindcss", "@nuxtjs/color-mode"],
  ssr: true,
  colorMode: {
    classSuffix: "",
  },
});
