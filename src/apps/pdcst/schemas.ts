import { z } from "zod"

export const podcastSchema = z.object({
  name: z.string(),
  website: z.string().url().nullable(),
  cover: z.string().url(),
})

export const episodeSchema = z.object({
  podcast: podcastSchema,
  title: z.string(),
  notes: z.string().nullable(),
  cover: z.string().url(),
  source: z.string().url(),
  releaseDate: z.date(),
  episode: z.tuple([
    z.number().int().nonnegative(),
    z.number().int().nonnegative(),
  ]),
})

export type PodcastType = z.infer<typeof podcastSchema>
export type EpisodeType = z.infer<typeof episodeSchema>
