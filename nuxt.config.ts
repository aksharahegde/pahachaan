// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  nitro: {
    experimental: {
      websocket: true,
    },
  },

  modules: [
    "@nuxt/ui",
    "@nuxt/content",
    "@vueuse/nuxt",
    "@nuxthq/studio",
    "@nuxtjs/seo",
    "@nuxt/image",
    "@nuxt/fonts",
    "@nuxthub/core",
    "nuxt-visitors",
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

  content: {
    preview: {
      api: "https://api.nuxt.studio",
    },
    highlight: {
      theme: "slack-dark",
    },
    experimental: {
      search: true as any,
    },
  },

  ogImage: {
    compatibility: { prerender: { chromium: false } },
  },

  runtimeConfig: {
    public: {
      statusSiteSlug: process.env.STATUS_SITE_SLUG,
      baseURL: process.env.NUXT_PUBLIC_SITE_URL,
      ownerName: process.env.OWNER_NAME,
      analyticsClientId: process.env.ANALYTICS_CLIENT_ID,
      twitter: process.env.TWITTER_HANDLE,
    },
  },

  site: {
    name: process.env.OWNER_NAME,
  },
  compatibilityDate: "2025-01-28",
});
