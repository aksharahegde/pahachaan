// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxtjs/google-fonts",
    "@vueuse/nuxt",
    "@nuxtseo/module",
    "nuxt-simple-sitemap",
  ],
  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      htmlAttrs: {
        lang: "en",
      },
      bodyAttrs: {
        class: "antialiased bg-gray-50 dark:bg-black min-h-screen",
      },
    },
  },
  ui: {
    icons: ["simple-icons", "solar"],
  },
  content: {
    highlight: {
      theme: "slack-dark",
    },
    experimental: {
      search: true as any,
    },
  },
  googleFonts: {
    display: "swap",
    families: {
      "Fira+Code": [300, 400, 500, 600],
    },
  },
  runtimeConfig: {
    public: {
      statusSiteSlug: process.env.STATUS_SITE_SLUG,
      baseURL: process.env.NUXT_PUBLIC_SITE_URL,
      ownerName: process.env.OWNER_NAME,
    },
  },
  site: {
    name: process.env.OWNER_NAME,
  },
});
