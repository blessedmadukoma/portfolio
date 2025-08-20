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
          httpLinkOptions: {
            httpEndpoint: "https://gql.hashnode.com",
            headers: {
              Authorization: process.env.NUXT_PUBLIC_API_HASHNODE_TOKEN,
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
