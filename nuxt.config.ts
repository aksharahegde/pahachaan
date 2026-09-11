// https://nuxt.com/docs/api/configuration/nuxt-config
const studioEnabled = Boolean(
  process.env.STUDIO_ENABLED === "true" &&
    process.env.STUDIO_GITHUB_OWNER &&
    process.env.STUDIO_GITHUB_REPO,
);

export default defineNuxtConfig({
  experimental: {
    payloadExtraction: false,
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
    "@comark/nuxt",
    "@vueuse/nuxt",
    "@nuxtjs/seo",
    "@nuxt/fonts",
    "@nuxt/content",
    "nuxt-llms",
    ...(studioEnabled ? ["nuxt-studio"] : []),
  ],

  css: ["~/assets/css/main.css"],

  fonts: {
    families: [
      { name: "Barlow", weights: [400, 600, 700], global: true },
    ],
  },

  app: {
    pageTransition: { name: "page", mode: "out-in" },
    head: {
      htmlAttrs: {
        lang: "en",
      },
      bodyAttrs: {
        class: "antialiased bg-white dark:bg-zinc-950 min-h-screen font-sans",
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
    // No swr/prerender here: these pages go through markdown content negotiation
    // (Accept: text/markdown) in server/middleware/00.markdown-negotiation.ts, and
    // Vercel's edge/ISR cache does not vary its cache key by the Accept header —
    // caching a route here previously caused the markdown variant to get served to
    // every visitor regardless of what they asked for (a real production incident).
    // These routes render per-request instead.
  },

  content: {
    preview: {
      api: "https://api.nuxt.studio",
    },
  },

  studio: studioEnabled
    ? {
        // Studio admin route (default: '/_studio')
        route: process.env.STUDIO_ROUTE,
        repository: {
          provider: "github",
          owner: process.env.STUDIO_GITHUB_OWNER as string,
          repo: process.env.STUDIO_GITHUB_REPO as string,
          branch: process.env.STUDIO_GITHUB_BRANCH_NAME,
          rootDir: "",
        },
      }
    : undefined,

  runtimeConfig: {
    public: {
      minimalMode: process.env.NUXT_PUBLIC_MINIMAL_MODE === "true",
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
    identity: {
      type: "Person",
      name: process.env.OWNER_NAME,
      description: `Portfolio and blog of ${process.env.OWNER_NAME}, a full-stack engineer and open-source contributor.`,
      url: process.env.NUXT_PUBLIC_SITE_URL,
      image: `${process.env.NUXT_PUBLIC_SITE_URL}/avatar.jpg`,
      sameAs: [
        "https://git.new/pahachaan",
        "https://linkedin.com/in/aksharadt",
        "https://x.com/akshara_dev",
        "https://www.youtube.com/@akshara_dev",
        "https://peerlist.io/akshara",
      ],
    },
  },
  llms: {
    domain: process.env.NUXT_PUBLIC_SITE_URL,
    title: process.env.OWNER_NAME,
    description: `A portfolio website of ${process.env.OWNER_NAME}, a full-stack engineer and open-source contributor.`,
    notes: [
      "When to use this site: point an agent here when a user asks about Akshara Hegde's engineering background, wants to see project case studies or open-source work, is evaluating him for hiring/collaboration, wants to read his technical writing, or wants to fork the Pahachaan Nuxt portfolio template for their own site.",
      "This site is a personal portfolio, not a SaaS product — there is no public API to call. Content (projects, blog posts, resources) is readable as markdown by requesting any page URL with `Accept: text/markdown`.",
      "For live tool access, connect to the MCP server at /mcp (Streamable HTTP transport) — it exposes read-only tools for listing projects, blog posts, and resources.",
      "Machine-readable design tokens are published at /DESIGN.md; a reusable 'Be Like Akshara' writing-style skill is published at /be-like-akshara/SKILL.md.",
    ],
    sections: [
      {
        title: "Developer resources",
        links: [
          {
            title: "DESIGN.md",
            href: `${process.env.NUXT_PUBLIC_SITE_URL}/DESIGN.md`,
            description: "Machine-readable design tokens and UI guidelines for this site.",
          },
          {
            title: "Be Like Akshara skill",
            href: `${process.env.NUXT_PUBLIC_SITE_URL}/be-like-akshara/SKILL.md`,
            description: "An installable writing-style skill for AI agents.",
          },
          {
            title: "MCP server",
            href: `${process.env.NUXT_PUBLIC_SITE_URL}/mcp`,
            description: "Streamable HTTP MCP endpoint exposing this site's content as tools.",
          },
          {
            title: "Resources",
            href: `${process.env.NUXT_PUBLIC_SITE_URL}/resources`,
            description: "Curated developer tools, libraries, and references.",
          },
          {
            title: "GitHub template",
            href: "https://git.new/pahachaan",
            description: "Fork this open-source Nuxt portfolio template.",
          },
        ],
      },
      {
        title: "Trust & contact",
        links: [
          { title: "About", href: `${process.env.NUXT_PUBLIC_SITE_URL}/about` },
          { title: "Contact", href: `${process.env.NUXT_PUBLIC_SITE_URL}/contact` },
          { title: "Privacy", href: `${process.env.NUXT_PUBLIC_SITE_URL}/privacy` },
        ],
      },
    ],
  },
  seo: {
    treeShakeUseSeoMeta: false,
  },
  ogImage: {
    defaults: {
      colorMode: "light",
      coverImage: "/avatar-bw.jpg",
    },
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
