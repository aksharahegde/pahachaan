import { defineContentConfig, defineCollection } from '@nuxt/content'


export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: "content/blog/*.md",
    }),
    projects: defineCollection({
      type: "page",
      source: "content/projects/*.md",
    }),
    content: defineCollection({
      type: "page",
      source: "content/*.md",
    }),
    footer: defineCollection({
      type: "page",
      source: "content/footer.json",
    }),
  },
});
