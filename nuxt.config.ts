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
    "@vueuse/nuxt",
    "@nuxtjs/seo",
    "@nuxt/fonts",
    "nuxt-visitors",
    "@nuxt/content",
    "nuxt-llms",
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
    build: {
      markdown: {
        highlight: {
          theme: {
            default: "monokai",
          },
        },
        toc: {
          depth: 3,
        },
      },
    },
  },

  ogImage: {
    defaults: {
      renderer: "satori",
    },
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
  llms: {
    domain: process.env.NUXT_PUBLIC_SITE_URL,
    title: process.env.OWNER_NAME,
    description: `A portfolio website of ${process.env.OWNER_NAME}`,
  },
  compatibilityDate: "2025-01-28",
});
