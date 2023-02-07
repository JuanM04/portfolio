import { z, defineCollection } from "astro:content"

const docsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    lang: z.enum(["en", "es"]).default("en"),
    createdAt: z.date(),
    updatedAt: z.date().optional(),
  }),
})

export const collections = {
  docs: docsCollection,
}
