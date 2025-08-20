export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/main.css"],
  modules: [
    "@nuxt/image",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",

    [
      "@nuxtjs/apollo",
      {
        clients: {
          default: {
            httpEndpoint: "https://gql.hashnode.com",
            // httpEndpoint: "https://spacex-production.up.railway.app",
            credentials: "same-origin",
            proxyCookies: true,
          },
          httpLinkOptions: {
            headers: {
              Authorization: process.env.NEXT_PUBLIC_API_HASHNODE_TOKEN,
            },
          },
        },
      },
    ],
  ],
  ssr: true,
  colorMode: {
    classSuffix: "",
  },
});
