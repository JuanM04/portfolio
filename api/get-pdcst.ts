import type { VercelApiHandler } from "@vercel/node"
import { compareDesc, subMonths } from "date-fns"
import SuperJSON from "superjson"
import { Parser } from "xml2js"
import fetch from "node-fetch"

import { EpisodeType, episodeSchema } from "../src/apps/pdcst/schemas"

interface FeedItem {
  type?: "xml" | "json"
  url: string
  parser: (feed: any) => EpisodeType[]
}

const dateInRage = (date: string | Date) =>
  compareDesc(
    typeof date === "string" ? new Date(date) : date,
    subMonths(new Date(), 1) // one month ago
  ) <= 0

const pubDateInRage = (episode: any) => dateInRage(episode.pubDate)

const decodeHTMLEntities = (encoded: string) =>
  encoded.replace(/&#\d+;/g, (entity) =>
    String.fromCharCode(parseInt(entity.slice(2, -1), 10))
  )

const anchorPodcast = (
  id: string,
  transform?: (episode: EpisodeType) => EpisodeType
): FeedItem => ({
  url: `https://anchor.fm/s/${id}/podcast/rss`,
  parser: (feed) => {
    const { channel } = feed.rss
    let items = channel.item

    if (!Array.isArray(channel.item)) {
      items = [items]
    }

    return items.filter(pubDateInRage).map((episode: any) => {
      const result: EpisodeType = {
        podcast: channel.title,
        title: episode.title,
        notes: episode.description,
        cover: episode["itunes:image"].$.href,
        source: episode.enclosure.$.url,
        releaseDate: new Date(episode.pubDate),
        episode: [
          parseInt(episode["itunes:season"]),
          parseInt(episode["itunes:episode"]),
        ],
      }

      if (transform) return transform(result)
      else return result
    })
  },
})

const relayFmPodcast = (id: string): FeedItem => ({
  url: `https://www.relay.fm/${id}/feed`,
  parser: (feed) => {
    const { channel } = feed.rss

    return channel.item.filter(pubDateInRage).map(
      (episode: any): EpisodeType => ({
        podcast: channel.title,
        title: episode["itunes:title"],
        notes: episode["content:encoded"],
        cover: episode["itunes:image"].$.href,
        source: episode.enclosure.$.url,
        releaseDate: new Date(episode.pubDate),
        episode: [1, parseInt(episode["itunes:episode"])],
      })
    )
  },
})

const feeds: FeedItem[] = [
  {
    url: "https://feeds.simplecast.com/bbt_sv9A",
    parser({ rss: { channel } }) {
      return channel.item
        .filter(pubDateInRage)
        .map((episode: any): EpisodeType => {
          // OfflineTV Podcast #12 - Brodin Plett
          let title = episode.title.split(" - ").slice(1).join(" - ")

          return {
            podcast: "OfflineTV Poscast",
            title,
            notes: episode.description,
            cover: channel.image.url,
            source: episode.enclosure.$.url,
            releaseDate: new Date(episode.pubDate),
            episode: [
              parseInt(episode["itunes:season"]),
              parseInt(episode["itunes:episode"]),
            ],
          }
        })
    },
  },
  anchorPodcast("36af2d10"), // After
  anchorPodcast("3bf1dbd8"), // Charlemos
  {
    url: "http://feeds.codenewbie.org/devnews_podcast.xml",
    parser({ rss: { channel } }) {
      return channel.item
        .filter(pubDateInRage)
        .map((episode: any): EpisodeType => {
          const [meta, title] = episode.title.split(" - ", 2)
          const [s, e] = meta.split(":")

          return {
            podcast: "DevNews",
            title: title,
            notes: episode.description,
            cover: channel.image.url,
            source: episode.enclosure.$.url,
            releaseDate: new Date(episode.pubDate),
            episode: [parseInt(s.substr(1)), parseInt(e.substr(1))],
          }
        })
    },
  },
  anchorPodcast("1b6ba5b0"), // They're Just Movies
  relayFmPodcast("cortex"),
  {
    url: "https://sysarmy.com/polemicaenvar.xml",
    parser({ rss: { channel } }) {
      return channel.item
        .filter(pubDateInRage)
        .map((episode: any): EpisodeType => {
          // S04E30
          const metaRaw = episode.title.split(" - ")[1]

          return {
            podcast: "Polémica en /var",
            // Polémica en /var - S04E30 - Lo que google se llevó
            title: decodeHTMLEntities(episode.title.split(" - ").pop()),
            notes: episode.description,
            cover: episode["itunes:image"]?.$?.href,
            source: episode.enclosure?.$?.url,
            releaseDate: new Date(episode.pubDate),
            episode:
              typeof metaRaw === "string" && metaRaw.length === 6
                ? [parseInt(metaRaw.slice(1, 3)), parseInt(metaRaw.slice(4))]
                : [9, 99],
          }
        })
    },
  },
  // {
  //   url: "https://feeds.transistor.fm/oh-la-humanidad",
  //   parser({ rss: { channel } }) {
  //     return channel.item.filter(pubDateInRage).map(
  //       (episode: any): EpisodeType => ({
  //         podcast: "Oh, la humanidad",
  //         title: episode.title,
  //         notes: episode.description,
  //         cover: episode["itunes:image"]?.$?.href,
  //         source: episode.enclosure?.$?.url,
  //         releaseDate: new Date(episode.pubDate),
  //         episode: [1, parseInt(episode["itunes:episode"])],
  //       })
  //     )
  //   },
  // },
  // {
  //   url: "https://feeds.resonaterecordings.com/codesandbox-podcast",
  //   parser({ rss: { channel } }) {
  //     return channel.item.filter(pubDateInRage).map(
  //       (episode: any): EpisodeType => ({
  //         podcast: "The CodeSandbox Podcast",
  //         title: episode.title,
  //         notes: episode.description,
  //         cover: channel.image.url,
  //         source: episode.enclosure?.$?.url,
  //         releaseDate: new Date(episode.pubDate),
  //         episode: [
  //           parseInt(episode["itunes:season"]),
  //           parseInt(episode["itunes:episode"]),
  //         ],
  //       })
  //     )
  //   },
  // },
  // {
  //   url: "https://feeds.resonaterecordings.com/version-one-with-maurice-cherry",
  //   parser({ rss: { channel } }) {
  //     return channel.item.filter(pubDateInRage).map(
  //       (episode: any): EpisodeType => ({
  //         podcast: "Version One"
  //         title: episode.title,
  //         notes: episode.description,
  //         cover: channel.image.url,
  //         source: episode.enclosure?.$?.url,
  //         releaseDate: new Date(episode.pubDate),
  //         episode: [
  //           parseInt(episode["itunes:season"]),
  //           parseInt(episode["itunes:episode"]),
  //         ],
  //       })
  //     )
  //   },
  // },
  anchorPodcast("5aa7d44c"), // Me mudo al campo
  anchorPodcast("583b4e00"), // Cenital
  anchorPodcast("62d12970"), // Trash Taste
  relayFmPodcast("flashback"),
  relayFmPodcast("automators"),
  anchorPodcast("630e5728"), // Tecito de Letras
  {
    url: "https://feeds.simplecast.com/9YNI3WaL",
    parser({ rss: { channel } }) {
      return channel.item
        .filter(pubDateInRage)
        .map((episode: any): EpisodeType => {
          // 318: Opposing Squirrel Vibes
          let title = episode.title.split(": ").slice(1).join(": ")

          return {
            podcast: "Dear Hank & John",
            title,
            notes: episode.description,
            cover: channel.image.url,
            source: episode.enclosure.$.url,
            releaseDate: new Date(episode.pubDate),
            episode: [1, parseInt(episode["itunes:episode"])],
          }
        })
    },
  },
  {
    type: "json",
    url: "https://syntax.fm/api/shows",
    parser(episodes: any[]) {
      return episodes
        .filter((episode) => dateInRage(episode.date))
        .map(
          (episode): EpisodeType => ({
            podcast: "Syntax",
            title: episode.title,
            notes: episode.html,
            cover:
              "https://ssl-static.libsyn.com/p/assets/7/9/0/7/790703531a3c8eca/iTunes_Artwork.png",
            source: episode.url,
            releaseDate: new Date(episode.date),
            episode: [1, episode.number],
          })
        )
    },
  },
]

const handler: VercelApiHandler = async (_req, res) => {
  const xmlParser = new Parser({ explicitArray: false })

  const feedsData = await Promise.all(
    feeds.map(async (feed) => {
      try {
        const res = await fetch(feed.url)

        let data: any

        if (feed.type === "json") {
          data = await res.json()
        } else {
          const body = await res.text()
          data = await xmlParser.parseStringPromise(body)
        }

        const parsedData = feed.parser(data)

        return parsedData.filter((episode) => {
          const { success } = episodeSchema.safeParse(episode)
          if (!success) {
            console.warn(
              "This episode doesn't match the schema:\n" +
                SuperJSON.stringify(episode)
            )
          }

          return success
        })
      } catch (error) {
        console.error(feed.url, error)
        return []
      }
    })
  )

  const episodes = feedsData
    .reduce((episodes, feed) => [...episodes, ...feed], [])
    .filter((episode) => dateInRage(episode.releaseDate))
    .sort((a, b) => compareDesc(a.releaseDate, b.releaseDate))
    .map((episode) => ({
      ...episode,
      cover: "/api/optimize-cover?src=" + encodeURIComponent(episode.cover),
    }))

  res.setHeader("Content-Type", "application/json")
  res.send(SuperJSON.stringify(episodes))
}

export default handler
