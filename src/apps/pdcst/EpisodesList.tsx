import { createResource, For } from "solid-js"
import { formatRelative } from "date-fns"
import SuperJSON from "superjson"

import { episodeSchema } from "./schemas"
import type { PlayerStore } from "./Pdcst"
import styles from "./EpisodesList.module.css"

const fetcher = async () => {
  const res = await fetch("./get-feed")
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
        <For each={!data.loading && data()} fallback={<p>Loading (might take a while)...</p>}>
          {episode => (
            <li
              classList={{
                [styles.episode]: true,
                [styles.playing]: player.episode?.source === episode.source,
              }}
              onClick={() => {
                changeEpisode(episode)
                document.getElementById("player")!.scrollIntoView()
              }}
            >
              <img src={episode.cover} alt={episode.podcast} />
              <div>
                <p class={styles.title}>{episode.title}</p>
                <p class={styles.meta}>
                  S{episode.episode[0]}:E{episode.episode[1]} —{" "}
                  <time dateTime={episode.releaseDate.toISOString()}>
                    {formatRelative(episode.releaseDate, new Date())}
                  </time>
                </p>
              </div>
            </li>
          )}
        </For>
      </ul>
    </section>
  )
}
