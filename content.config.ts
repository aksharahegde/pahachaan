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
        tech: z.array(z.string()).optional(),
        updated: z.string().optional(),
        stars: z.string().optional(),
        forks: z.string().optional(),
      }),
    }),
    labs: defineCollection({
      type: "data",
      source: "labs/*.json",
      schema: z.object({
        title: z.string(),
        icon: z.string(),
        description: z.string(),
        url: z.string().optional(),
        heading: z.string().optional(),
      }),
    }),
    resources: defineCollection({
      type: "data",
      source: "resources/*.json",
      schema: z.object({
        tag: z.string(),
        slug: z.string(),
        links: z.array(
          z.object({
            title: z.string().optional(),
            url: z.string(),
          })
        ),
      }),
    }),
    photos: defineCollection({
      type: "data",
      source: "photos/*.json",
      schema: z.object({
        title: z.string(),
        slug: z.string(),
        description: z.string().optional(),
        photos: z.array(
          z.object({
            slug: z.string().optional(),
            title: z.string(),
            src: z.string(),
            alt: z.string(),
            location: z.string().optional(),
            year: z.string().optional(),
            aspect: z.string().optional(),
            featured: z.boolean().optional(),
          })
        ),
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
        affiliates: z.array(
          z.object({
            title: z.string(),
            description: z.string(),
            url: z.string(),
            cta: z.string(),
            testId: z.string().optional(),
          })
        ),
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
        focus: z.array(z.string()),
        now: z.array(
          z.object({
            label: z.string(),
            title: z.string(),
            icon: z.string(),
          })
        ),
        experiments: z.array(
          z.object({
            id: z.string(),
            title: z.string(),
            description: z.string(),
            meta: z.array(z.string()),
            status: z.string(),
            url: z.string(),
          })
        ),
        toolkit: z.array(
          z.object({
            id: z.string(),
            title: z.string(),
            description: z.string(),
            icon: z.string(),
            url: z.string(),
          })
        ),
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
