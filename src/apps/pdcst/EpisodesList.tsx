import { createResource, For } from "solid-js"
import { formatRelative } from "date-fns"
import SuperJSON from "superjson"

import { episodeSchema } from "./schemas"
import type { PlayerStore } from "./Pdcst"
import styles from "./EpisodesList.module.css"

const fetcher = async () => {
  const res = await fetch("/api/get-pdcst")
  const raw = await res.text()
  const parsed = SuperJSON.parse(raw)
  return episodeSchema.array().parse(parsed)
}

export function EpisodesList({
  playerStore: [player, { changeEpisode }],
}: {
  playerStore: PlayerStore
}) {
  const [data] = createResource(fetcher)

  if (data.error) return <p>There has been an error fetching the episodes</p>

  return (
    <section id="episodes">
      <ul class={styles.list}>
        <For each={!data.loading && data()} fallback={<p>Loading...</p>}>
          {(episode) => (
            <li
              classList={{
                [styles.episode]: true,
                [styles.playing]: player.episode?.source === episode.source,
              }}
              onClick={() => {
                changeEpisode(episode)
                location.hash = "player"
              }}
            >
              <img src={episode.cover} alt={episode.podcast.name} />
              <div>
                <p class={styles.title}>{episode.title}</p>
                <p class={styles.meta}>
                  S{episode.episode[0]}:E{episode.episode[1]} —{" "}
                  {formatRelative(episode.releaseDate, new Date())}
                </p>
              </div>
            </li>
          )}
        </For>
      </ul>
    </section>
  )
}
