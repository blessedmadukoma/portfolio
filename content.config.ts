import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    blog: defineCollection({
      type: "page",
      source: "blog/**",
      schema: z.object({
        slug: z.string().optional(),
        date: z.string().optional(),
        tags: z.array(z.string()).optional(),
        image: z.string().optional(),
        readingTime: z.number().optional(),
        views: z.number().int().nonnegative().optional(),
        // Historical import metadata. Hashnode is not queried at runtime.
        source: z.literal("hashnode").optional(),
        hashnodeId: z.string().optional(),
        draft: z.boolean().optional().default(false),
      }),
    }),
  },
});
