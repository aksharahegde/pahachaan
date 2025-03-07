import { defineContentConfig, defineCollection, z } from "@nuxt/content";
import { asSeoCollection } from "@nuxtjs/seo/content";

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
    content: defineCollection({
      type: "page",
      source: "*.md",
    }),
    footer: defineCollection({
      type: "data",
      source: "footer.json",
      schema: z.object({
        github: z.string(),
        blog: z.string(),
      }),
    }),
    seo: defineCollection(
      asSeoCollection({
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
      })
    ),
  },
});
