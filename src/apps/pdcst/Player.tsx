import { format } from "date-fns"
import { createEffect, createSignal, Show } from "solid-js"

import type { PlayerStore } from "./Pdcst"
import {
  FastForwardIcon,
  MutedIcon,
  PauseIcon,
  PlayIcon,
  RewindIcon,
  StopIcon,
  VolumeIcon,
} from "./icons"
import styles from "./Player.module.css"

interface PlayerState {
  time: number
  duration: number
  loaded: number
  playing: boolean
  muted: boolean
  volume: number
  seekTo: (input: number, mode?: "absolute" | "fraction" | "relative") => void
  play: () => void
  pause: () => void
  setVolume: (volume: number) => void
  mute: () => void
  unmute: () => void
}

function formatTime(seconds: number) {
  seconds = Math.round(seconds)

  if (seconds === 0 || isNaN(seconds)) return "00:00"

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor(seconds / 60 - hours * 60)
  const rest = seconds - minutes * 60 - hours * 3600

  let str = ""

  if (hours > 0) str += `${hours}:`

  if (minutes >= 10) str += `${minutes}:`
  else str += `0${minutes}:`

  if (rest >= 10) str += `${rest}`
  else str += `0${rest}`

  return str
}

export function Player({
  playerStore: [playerStore, { changeEpisode, updateTime }],
}: {
  playerStore: PlayerStore
}) {
  const [player, setPlayer] = createSignal<PlayerState | null>(null)
  const [initialTimeSet, setInitialTimeSet] = createSignal(false)

  createEffect(() => {
    if (initialTimeSet()) return
    const state = player()
    if (!state || state.loaded === 0) return

    state.seekTo(playerStore.time)
    setInitialTimeSet(true)
  })

  createEffect(() => {
    if (
      "mediaSession" in navigator &&
      navigator.mediaSession &&
      player() &&
      playerStore.episode
    ) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: playerStore.episode.title,
        artist: playerStore.episode.podcast.name,
        artwork: [{ src: playerStore.episode.cover }],
      })

      navigator.mediaSession.setActionHandler("pause", () => player()!.pause())
      navigator.mediaSession.setActionHandler("play", () => player()!.play())
      navigator.mediaSession.setActionHandler("seekbackward", () =>
        player()!.seekTo(-30, "relative")
      )
      navigator.mediaSession.setActionHandler("seekforward", () =>
        player()!.seekTo(+30, "relative")
      )
      navigator.mediaSession.setActionHandler(
        "seekto",
        (e) => e.seekTime && player()!.seekTo(e.seekTime)
      )
      navigator.mediaSession.setActionHandler("stop", () => {
        player()!.pause()
        player()!.seekTo(0)
        changeEpisode(null)
      })
    }
  })

  return (
    <section id="player" class={styles.container}>
      <Show
        when={playerStore.episode}
        fallback={
          <p style={{ "text-align": "center" }}>There is no episode playing</p>
        }
      >
        {(episode) => (
          <>
            <div class={styles.info}>
              <img src={episode.cover} alt={episode.podcast.name} />
              <div>
                <p class={styles.title}>{episode.title}</p>
                <p class={styles.meta}>
                  S{episode.episode[0]}:E{episode.episode[1]} —{" "}
                  {format(episode.releaseDate, "d/M/yyyy 'at' HH:mm")}
                </p>
              </div>
            </div>
            {episode.notes && (
              <details class={styles.notes}>
                <summary>Notes</summary>
                <div innerHTML={episode.notes} class={styles.notes} />
              </details>
            )}
            <div class={styles.player}>
              <audio
                controls={false}
                loop={false}
                hidden
                src={episode.source}
                ref={(el) => {
                  setPlayer({
                    duration: el.duration,
                    loaded:
                      el.buffered.length === 0
                        ? 0
                        : el.buffered.end(el.buffered.length - 1),
                    muted: el.muted,
                    playing: !el.paused,
                    time: el.currentTime,
                    volume: el.volume,
                    mute: () => (el.muted = true),
                    unmute: () => (el.muted = false),
                    pause: () => el.pause(),
                    play: () => el.play(),
                    seekTo: (input, mode = "absolute") => {
                      if (mode === "absolute") {
                        el.currentTime = input // seconds
                      } else if (mode === "fraction") {
                        el.currentTime = el.duration * input // 0 <= input <= 1
                      } else {
                        el.currentTime = el.currentTime + input
                      }
                    },
                    setVolume: (volume) => (el.volume = volume),
                  })

                  el.addEventListener("canplay", () => {
                    const state = player()
                    if (state) {
                      setPlayer({
                        ...state,
                        duration: el.duration,
                        loaded:
                          el.buffered.length === 0
                            ? 0
                            : el.buffered.end(el.buffered.length - 1),
                      })
                    }
                  })

                  el.addEventListener("pause", () => {
                    const state = player()
                    if (state) {
                      setPlayer({ ...state, playing: false })
                    }
                  })

                  el.addEventListener("play", () => {
                    const state = player()
                    if (state) {
                      setPlayer({ ...state, playing: true })
                    }
                  })

                  el.addEventListener("timeupdate", () => {
                    const state = player()
                    if (state) {
                      const time = el.currentTime
                      setPlayer({ ...state, time: el.currentTime })
                      if (time) updateTime(time)
                    }
                  })

                  el.addEventListener("volumechange", () => {
                    const state = player()
                    if (state) {
                      setPlayer({ ...state, volume: el.volume })
                    }
                  })
                }}
              />

              <Show when={player()} fallback={<p>Loading player...</p>}>
                {(player) => (
                  <>
                    <div class={styles.time}>
                      <p class={styles.currentTime}>
                        {formatTime(player.time)}
                      </p>
                      <Slider
                        percent={player.time / player.duration}
                        onClick={(n) => player.seekTo(n, "fraction")}
                      />
                      <p class={styles.duration}>
                        {formatTime(player.duration)}
                      </p>
                    </div>
                    <div class={styles.buttons}>
                      <div class={styles.mainButtons}>
                        <RewindIcon
                          onClick={() => player.seekTo(-30, "relative")}
                        />
                        {player.playing ? (
                          <PauseIcon
                            class={styles.playpause}
                            onClick={player.pause}
                          />
                        ) : (
                          <PlayIcon
                            class={styles.playpause}
                            onClick={player.play}
                          />
                        )}
                        <StopIcon onClick={() => changeEpisode(null)} />
                        <FastForwardIcon
                          onClick={() => player.seekTo(+30, "relative")}
                        />
                      </div>
                      <div class={styles.volume}>
                        {player.muted ? (
                          <MutedIcon onClick={player.unmute} />
                        ) : (
                          <VolumeIcon onClick={player.mute} />
                        )}
                        <Slider
                          percent={Math.sqrt(player.volume)}
                          onClick={(n) => player.setVolume(n ** 2)}
                        />
                      </div>
                    </div>
                  </>
                )}
              </Show>
            </div>
          </>
        )}
      </Show>
    </section>
  )
}

const Slider = ({
  onClick,
  percent,
  classList = {},
}: {
  onClick: (n: number) => void
  percent: number
  classList?: {
    [k: string]: boolean | undefined
  }
}) => (
  <div classList={{ ...classList, [styles.slider]: true }}>
    <div style={{ width: percent * 100 + "%" }} />
    <div
      onClick={(e) => {
        const width = e.currentTarget.offsetWidth
        const x = e.offsetX

        onClick(x / width)
      }}
    />
  </div>
)
