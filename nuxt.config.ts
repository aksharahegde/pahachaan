// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  experimental: {
    payloadExtraction: "client",
    writeEarlyHints: true,
    defaults: {
      nuxtLink: {
        prefetchOn: {
          interaction: true,
          visibility: false,
        },
      },
    },
  },
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  modules: [
    "@nuxt/ui",
    "@vueuse/nuxt",
    "@nuxtjs/seo",
    "@nuxt/image",
    "@nuxt/fonts",
    "@nuxt/content",
    "nuxt-llms",
    "nuxt-studio",
  ],

  css: ["~/assets/css/main.css"],

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      htmlAttrs: {
        lang: "en",
      },
      bodyAttrs: {
        class: "antialiased bg-gray-50 dark:bg-gray-900 min-h-screen font-sans",
      },
      script:
        process.env.NODE_ENV === "production"
          ? [
              {
                key: "umami",
                defer: true,
                async: true,
                tagPosition: "bodyClose",
                src:
                  process.env.NUXT_PUBLIC_UMAMI_SCRIPT_URL ||
                  "https://cloud.umami.is/script.js",
                "data-website-id":
                  process.env.NUXT_PUBLIC_UMAMI_WEBSITE_ID ||
                  "9a02a74f-1f55-4936-866b-e00fb826f667",
              },
            ]
          : [],
    },
  },

  routeRules: {
    "/": { prerender: true },
    "/uses": { prerender: true },
    "/resources": { prerender: true },
    "/blog/**": { swr: 3600 },
    "/projects": { swr: 3600 },
    "/shop": { swr: 3600 },
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

  studio: {
    // Studio admin route (default: '/_studio')
    route: process.env.STUDIO_ROUTE,
    repository: {
      provider: "github",
      owner: process.env.STUDIO_GITHUB_OWNER as string,
      repo: process.env.STUDIO_GITHUB_REPO as string,
      branch: process.env.STUDIO_GITHUB_BRANCH_NAME,
      rootDir: "",
    },
  },

  runtimeConfig: {
    public: {
      statusSiteSlug: process.env.STATUS_SITE_SLUG,
      baseURL: process.env.NUXT_PUBLIC_SITE_URL,
      ownerName: process.env.OWNER_NAME,
      analyticsClientId: process.env.ANALYTICS_CLIENT_ID,
      umamiScriptUrl:
        process.env.NUXT_PUBLIC_UMAMI_SCRIPT_URL ||
        "https://cloud.umami.is/script.js",
      umamiWebsiteId:
        process.env.NUXT_PUBLIC_UMAMI_WEBSITE_ID ||
        "9a02a74f-1f55-4936-866b-e00fb826f667",
      twitter: process.env.TWITTER_HANDLE,
    },
  },

  site: {
    url: process.env.NUXT_PUBLIC_SITE_URL,
    name: process.env.OWNER_NAME,
    description: `Portfolio and blog of ${process.env.OWNER_NAME}`,
  },

  schemaOrg: {
    identity: "Person",
  },
  llms: {
    domain: process.env.NUXT_PUBLIC_SITE_URL,
    title: process.env.OWNER_NAME,
    description: `A portfolio website of ${process.env.OWNER_NAME}`,
  },
  seo: {
    treeShakeUseSeoMeta: false,
  },
  vite: {
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        'tailwindcss/colors',
        '@unhead/schema-org/vue',
      ],
    },
  },

  compatibilityDate: "2025-01-28",
});
