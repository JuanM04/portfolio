import { z } from "zod"

export const episodeSchema = z.object({
  podcast: z.string(),
  title: z.string(),
  notes: z.string().nullable(),
  cover: z.string(),
  source: z.string().url(),
  releaseDate: z.date(),
  episode: z.tuple([z.number().int().nonnegative(), z.number().int().nonnegative()]),
})

export type EpisodeType = z.infer<typeof episodeSchema>
