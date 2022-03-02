import { format } from "date-fns"
import { createEffect, createSignal, Show } from "solid-js"

import { Slider } from "./Slider"
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
  const [player, setPlayer] = createSignal<PlayerState>({
    duration: 0,
    loaded: 0,
    muted: false,
    playing: false,
    time: 0,
    volume: 1,
    mute: () => {},
    unmute: () => {},
    pause: () => {},
    play: () => {},
    seekTo: () => {},
    setVolume: () => {},
  })
  const [initialTimeSet, setInitialTimeSet] = createSignal(false)

  createEffect(() => {
    if (initialTimeSet()) return
    if (player().loaded === 0) return

    player().seekTo(playerStore.time)
    setInitialTimeSet(true)
  })

  createEffect(() => {
    if (
      "mediaSession" in navigator &&
      navigator.mediaSession &&
      playerStore.episode
    ) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: playerStore.episode.title,
        artist: playerStore.episode.podcast.name,
        artwork: [{ src: playerStore.episode.cover }],
      })

      navigator.mediaSession.setActionHandler("pause", () => player().pause())
      navigator.mediaSession.setActionHandler("play", () => player().play())
      navigator.mediaSession.setActionHandler("seekbackward", () =>
        player().seekTo(-30, "relative")
      )
      navigator.mediaSession.setActionHandler("seekforward", () =>
        player().seekTo(+30, "relative")
      )
      navigator.mediaSession.setActionHandler(
        "seekto",
        (e) => e.seekTime && player().seekTo(e.seekTime)
      )
      navigator.mediaSession.setActionHandler("stop", () => {
        player().pause()
        player().seekTo(0)
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
                  <time dateTime={episode.releaseDate.toISOString()}>
                    {format(episode.releaseDate, "d/M/yyyy 'at' HH:mm")}
                  </time>
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
                autoplay={false}
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
                    setVolume: (volume) => {
                      if (el.muted) el.muted = false
                      el.volume = volume
                    },
                  })

                  el.addEventListener("canplay", () => {
                    setPlayer({
                      ...player(),
                      duration: isNaN(el.duration) ? 0 : el.duration,
                      loaded:
                        el.buffered.length === 0
                          ? 0
                          : el.buffered.end(el.buffered.length - 1),
                    })
                    if (!isNaN(el.duration)) {
                      navigator.mediaSession.setPositionState({
                        duration: el.duration,
                        playbackRate: el.playbackRate,
                        position: el.currentTime,
                      })
                    }
                  })

                  el.addEventListener("pause", () => {
                    setPlayer({ ...player(), playing: false })
                  })

                  el.addEventListener("play", () => {
                    setPlayer({ ...player(), playing: true })
                  })

                  el.addEventListener("timeupdate", () => {
                    const time = el.currentTime
                    setPlayer({ ...player(), time })

                    if (time > 0) updateTime(time)
                    if (!isNaN(el.duration)) {
                      navigator.mediaSession.setPositionState({
                        duration: el.duration,
                        playbackRate: el.playbackRate,
                        position: el.currentTime,
                      })
                    }
                  })

                  el.addEventListener("volumechange", () => {
                    setPlayer({
                      ...player(),
                      volume: el.volume,
                      muted: el.muted,
                    })
                  })
                }}
              />

              <div class={styles.time}>
                <p class={styles.currentTime}>{formatTime(player().time)}</p>
                <Slider
                  value={
                    player().duration > 0
                      ? player().time / player().duration
                      : 0
                  }
                  onChange={(value) => player().seekTo(value, "fraction")}
                />
                <p class={styles.duration}>{formatTime(player().duration)}</p>
              </div>
              <div class={styles.buttons}>
                <div class={styles.mainButtons}>
                  <RewindIcon
                    onClick={() => player().seekTo(-30, "relative")}
                  />
                  {player().playing ? (
                    <PauseIcon
                      class={styles.playpause}
                      onClick={player().pause}
                    />
                  ) : (
                    <PlayIcon
                      class={styles.playpause}
                      onClick={player().play}
                    />
                  )}
                  <StopIcon onClick={() => changeEpisode(null)} />
                  <FastForwardIcon
                    onClick={() => player().seekTo(+30, "relative")}
                  />
                </div>
                <div class={styles.volume}>
                  {player().muted ? (
                    <MutedIcon onClick={player().unmute} />
                  ) : (
                    <VolumeIcon onClick={player().mute} />
                  )}
                  <Slider
                    classList={{ [styles.volumeSlider]: true }}
                    value={player().muted ? 0 : Math.sqrt(player().volume)}
                    onChange={(value) => player().setVolume(value ** 2)}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </Show>
    </section>
  )
}
