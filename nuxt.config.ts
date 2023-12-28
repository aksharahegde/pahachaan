// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  modules: [
    "@nuxt/ui",
    "@nuxt/content",
    "@nuxtjs/google-fonts",
    "@vueuse/nuxt",
  ],
  ui: {
    icons: ["simple-icons", "solar"],
  },
  content: {
    highlight: {
      theme: "github-dark",
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
      baseURL: process.env.DOMAIN_URL,
      ownerName: process.env.OWNER_NAME,
    }
  }
});
