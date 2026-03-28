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
	vite: {
		optimizeDeps: {
			include: ["@vue/devtools-core", "@vue/devtools-kit"],
		},
	},
});
