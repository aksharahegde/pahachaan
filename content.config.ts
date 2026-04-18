import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: "blog/*.md",
      schema: z.object({
        title: z.string(),
        description: z.string(),
        published: z.string(),
        path: z.string(),
        cover: z.string(),
        thumbnail: z.string(),
      }),
    }),
    projects: defineCollection({
      type: "data",
      source: "projects/*.json",
      schema: z.object({
        title: z.string(),
        path: z.string(),
        url: z.string(),
        thumbnail: z.string(),
        thumbnailBg: z.string(),
        thumbnailAlt: z.string(),
        category: z.string(),
        heading: z.string(),
        description: z.string(),
        status: z.string(),
        role: z.string(),
      }),
    }),
    shop: defineCollection({
      type: "data",
      source: "shop/*.json",
      schema: z.object({
        title: z.string(),
        icon: z.string(),
        url: z.string(),
        category: z.string(),
        heading: z.string(),
        description: z.string(),
      }),
    }),
    content: defineCollection({
      type: "page",
      source: "*.md",
      schema: z.object({
        title: z.string(),
        path: z.string(),
      }),
    }),
    footer: defineCollection({
      type: "data",
      source: "footer.json",
      schema: z.object({
        github: z.string(),
        linkedin: z.string(),
        twitter: z.string(),
        blog: z.string(),
        affiliate: z.object({
          title: z.string(),
          description: z.string(),
          url: z.string(),
        }),
      }),
    }),
    seo: defineCollection({
      type: "data",
      source: "seo.json",
      schema: z.object({
        code: z.string(),
        headline: z.string(),
        title: z.string(),
        description: z.string(),
        coverImage: z.string(),
        theme: z.string(),
        colorMode: z.string(),
      }),
    }),
    home: defineCollection({
      type: "data",
      source: "home.json",
      schema: z.object({
        name: z.string(),
        pronouns: z.string(),
        title: z.string(),
        bio: z.string(),
      }),
    }),
    contact: defineCollection({
      type: "data",
      source: "contact.json",
      schema: z.object({
        contact: z.array(
          z.object({
            name: z.string(),
            icon: z.string(),
            url: z.string(),
          })
        ),
      }),
    }),
  },
});
