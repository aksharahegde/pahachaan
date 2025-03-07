import { defineContentConfig, defineCollection, z } from "@nuxt/content";
import { asSeoCollection } from "@nuxtjs/seo/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: "blog/*.md",
    }),
    projects: defineCollection({
      type: "page",
      source: "projects/*.md",
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
