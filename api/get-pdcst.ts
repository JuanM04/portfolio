import type { VercelApiHandler } from "@vercel/node"
import { compareDesc, subMonths } from "date-fns"
import SuperJSON from "superjson"
import { Parser } from "xml2js"
import fetch from "node-fetch"

import {
  EpisodeType,
  PodcastType,
  episodeSchema,
} from "../src/apps/pdcst/schemas"

interface FeedItem {
  url: string
  parser: (feed: any) => EpisodeType[]
}

const anchorPodcast =
  (
    podcast: Omit<PodcastType, "cover">,
    transform?: (episode: EpisodeType) => EpisodeType
  ): FeedItem["parser"] =>
  (feed) => {
    const { channel } = feed.rss
    let items = channel.item

    if (!Array.isArray(channel.item)) {
      items = [items]
    }

    return items.map((episode: any) => {
      const result: EpisodeType = {
        title: episode.title,
        notes: episode.description,
        cover: episode["itunes:image"].$.href,
        source: episode.enclosure.$.url,
        releaseDate: new Date(episode.pubDate),
        episode: [
          parseInt(episode["itunes:season"]),
          parseInt(episode["itunes:episode"]),
        ],
        podcast: {
          ...podcast,
          cover: channel.image.url,
        },
      }

      if (transform) return transform(result)
      else return result
    })
  }

const relayFmPodcast = (id: string): FeedItem => ({
  url: `https://www.relay.fm/${id}/feed`,
  parser: (feed) => {
    const { channel } = feed.rss

    return channel.item.map(
      (episode: any): EpisodeType => ({
        title: episode["itunes:title"],
        notes: episode["content:encoded"],
        cover: episode["itunes:image"].$.href,
        source: episode.enclosure.$.url,
        releaseDate: new Date(episode.pubDate),
        episode: [1, parseInt(episode["itunes:episode"])],
        podcast: {
          name: channel.title,
          website: `https://www.relay.fm/${id}`,
          cover: channel["itunes:image"].$.href,
        },
      })
    )
  },
})

const transistorPodcast =
  (
    podcast: Omit<PodcastType, "cover">,
    transform?: (episode: EpisodeType) => EpisodeType
  ): FeedItem["parser"] =>
  (feed) => {
    const { channel } = feed.rss

    return channel.item.map((episode: any) => {
      const result: EpisodeType = {
        title: episode.title,
        notes: episode.description,
        cover: episode["itunes:image"]?.$?.href,
        source: episode.enclosure?.$?.url,
        releaseDate: new Date(episode.pubDate),
        episode: [1, parseInt(episode["itunes:episode"])],
        podcast: { ...podcast, cover: channel.image.url },
      }

      if (transform) return transform(result)
      else return result
    })
  }

const decodeHTMLEntities = (encoded: string) =>
  encoded.replace(/&#\d+;/g, (entity) =>
    String.fromCharCode(parseInt(entity.slice(2, -1), 10))
  )

const feeds: FeedItem[] = [
  {
    url: "https://feeds.simplecast.com/bbt_sv9A",
    parser({ rss: { channel } }) {
      const podcast: PodcastType = {
        name: "OfflineTV Podcast",
        website: "https://www.youtube.com/channel/UCuaIy5fmf85DkOnUUdn4ihQ",
        cover: channel.image.url,
      }

      return channel.item.map((episode: any): EpisodeType => {
        // OfflineTV Podcast #12 - Brodin Plett
        let title = episode.title.split(" - ").slice(1).join(" - ")

        return {
          title,
          notes: episode.description,
          cover: channel.image.url,
          source: episode.enclosure.$.url,
          releaseDate: new Date(episode.pubDate),
          episode: [
            parseInt(episode["itunes:season"]),
            parseInt(episode["itunes:episode"]),
          ],
          podcast,
        }
      })
    },
  },
  {
    url: "https://anchor.fm/s/36af2d10/podcast/rss",
    parser: anchorPodcast({
      name: "After",
      website:
        "https://www.youtube.com/playlist?list=PLIQa0LGiOQmUTsldxXnzizv4TMx-qbgrU",
    }),
  },
  {
    url: "https://anchor.fm/s/3bf1dbd8/podcast/rss",
    parser: anchorPodcast({
      name: "Charlemos",
      website: "https://www.twitch.tv/flansquatch",
    }),
  },
  {
    url: "http://feeds.codenewbie.org/devnews_podcast.xml",
    parser({ rss: { channel } }) {
      const podcast: PodcastType = {
        name: "DevNews",
        website: "https://devpods.dev/podcasts/devnews",
        cover: channel.image.url,
      }

      return channel.item.map((episode: any): EpisodeType => {
        const [meta, title] = episode.title.split(" - ", 2)
        const [s, e] = meta.split(":")

        return {
          title: title,
          notes: episode.description,
          cover: channel.image.url,
          source: episode.enclosure.$.url,
          releaseDate: new Date(episode.pubDate),
          episode: [parseInt(s.substr(1)), parseInt(e.substr(1))],
          podcast,
        }
      })
    },
  },
  {
    url: "https://carpoolcritics.libsyn.com/rss",
    parser: anchorPodcast({
      name: "Carpool Critics",
      website: "https://www.youtube.com/channel/UCt-oJR5teQIjOAxCmIQvcgA",
    }),
  },
  relayFmPodcast("cortex"),
  {
    url: "https://sysarmy.com/polemicaenvar.xml",
    parser({ rss: { channel } }) {
      const podcast: PodcastType = {
        name: "Polémica en /var",
        website: "https://www.youtube.com/sysarmyar",
        cover: channel.image.url,
      }

      return channel.item.map((episode: any): EpisodeType => {
        // S04E30
        const metaRaw = episode.title.split(" - ")[1]

        return {
          // Polémica en /var - S04E30 - Lo que google se llevó
          title: decodeHTMLEntities(episode.title.split(" - ").pop()),
          notes: episode.description,
          cover: episode["itunes:image"]?.$?.href,
          source: episode.enclosure?.$?.url,
          releaseDate: new Date(episode.pubDate),
          episode:
            typeof metaRaw === "string" && metaRaw.length === 6
              ? [parseInt(metaRaw.substr(1, 2)), parseInt(metaRaw.substr(4))]
              : [9, 99],
          podcast,
        }
      })
    },
  },
  {
    url: "https://feeds.transistor.fm/oh-la-humanidad",
    parser: transistorPodcast({
      name: "Oh, la humanidad",
      website: "https://elgatoylacaja.com/podcast/oh-la-humanidad",
    }),
  },
  {
    url: "https://feeds.resonaterecordings.com/codesandbox-podcast",
    parser({ rss: { channel } }) {
      const podcast: PodcastType = {
        name: "The CodeSandbox Podcast",
        website: "https://codesandbox.io/podcasts/codesandbox-podcast",
        cover: channel.image.url,
      }

      return channel.item.map(
        (episode: any): EpisodeType => ({
          title: episode.title,
          notes: episode.description,
          cover: channel.image.url,
          source: episode.enclosure?.$?.url,
          releaseDate: new Date(episode.pubDate),
          episode: [
            parseInt(episode["itunes:season"]),
            parseInt(episode["itunes:episode"]),
          ],
          podcast,
        })
      )
    },
  },
  {
    url: "https://feeds.resonaterecordings.com/version-one-with-maurice-cherry",
    parser({ rss: { channel } }) {
      const podcast: PodcastType = {
        name: "Version One",
        website: "https://codesandbox.io/podcasts/version-one",
        cover: channel.image.url,
      }

      return channel.item.map(
        (episode: any): EpisodeType => ({
          title: episode.title,
          notes: episode.description,
          cover: channel.image.url,
          source: episode.enclosure?.$?.url,
          releaseDate: new Date(episode.pubDate),
          episode: [
            parseInt(episode["itunes:season"]),
            parseInt(episode["itunes:episode"]),
          ],
          podcast,
        })
      )
    },
  },
  {
    url: "https://anchor.fm/s/5aa7d44c/podcast/rss",
    parser: anchorPodcast({
      name: "Me mudo al campo",
      website: "https://anchor.fm/me-mudo-al-campo",
    }),
  },
  {
    url: "https://anchor.fm/s/583b4e00/podcast/rss",
    parser: anchorPodcast({
      name: "Cenital",
      website: "https://cenital.com",
    }),
  },
  {
    url: "https://anchor.fm/s/62d12970/podcast/rss",
    parser: anchorPodcast({
      name: "Trash Taste",
      website: "https://trashtaste.com",
    }),
  },
  relayFmPodcast("flashback"),
  relayFmPodcast("automators"),
  {
    url: "https://anchor.fm/s/630e5728/podcast/rss",
    parser: anchorPodcast({
      name: "Tecito de Letras",
      website: "https://anchor.fm/agustina-garcia4",
    }),
  },
  {
    url: "https://feeds.simplecast.com/9YNI3WaL",
    parser({ rss: { channel } }) {
      const podcast: PodcastType = {
        name: "Dear Hank & John",
        website: "https://www.youtube.com/channel/UCuaIy5fmf85DkOnUUdn4ihQ",
        cover: channel.image.url,
      }

      return channel.item.map((episode: any): EpisodeType => {
        // 318: Opposing Squirrel Vibes
        let title = episode.title.split(": ").slice(1).join(": ")

        return {
          title,
          notes: episode.description,
          cover: channel.image.url,
          source: episode.enclosure.$.url,
          releaseDate: new Date(episode.pubDate),
          episode: [1, parseInt(episode["itunes:episode"])],
          podcast,
        }
      })
    },
  },
]

const handler: VercelApiHandler = async (_req, res) => {
  const releaseLimit = subMonths(new Date(), 1) // one month ago
  const xmlParser = new Parser({ explicitArray: false })

  const feedsData = await Promise.all(
    feeds.map(async (feed) => {
      try {
        const res = await fetch(feed.url)
        const body = await res.text()
        const data = await xmlParser.parseStringPromise(body)

        const parsedData = feed.parser(data)

        return parsedData.filter(
          (episode) => episodeSchema.safeParse(episode).success
        )
      } catch (error) {
        console.error(feed.url, error)
        return []
      }
    })
  )

  const episodes = feedsData
    .reduce((episodes, feed) => [...episodes, ...feed], [])
    .filter((episode) => compareDesc(episode.releaseDate, releaseLimit) <= 0)
    .sort((a, b) => compareDesc(a.releaseDate, b.releaseDate))

  res.setHeader("Content-Type", "application/json")
  res.send(SuperJSON.stringify(episodes))
}

export default handler
