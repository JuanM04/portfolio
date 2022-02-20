import { createMemo, createSignal } from "solid-js"
import styles from "./BPM.module.css"

type Timestamps = [current: number, previous: number] | null
type Playing = ReturnType<typeof setInterval> | false

export function MeasureBPM() {
  const [timestamps, setTimestamps] = createSignal<Timestamps>(null, {
    equals: false,
  })

  const bpm = createMemo(() => {
    const time = timestamps()
    if (!time) return 0

    const diffInSeconds = (time[0] - time[1]) / 1000
    if (diffInSeconds <= 0 || diffInSeconds > 60) return 0

    return Math.round(60 / diffInSeconds)
  })

  return (
    <button
      class={styles.measure}
      onClick={() => {
        setTimestamps((prev) => {
          const now = new Date().getTime()
          if (prev) return [now, prev[0]]
          else return [now, now]
        })
      }}
    >
      <div>
        <span class={styles.value}>{bpm()}</span>
        <span class={styles.label}>BPM</span>
      </div>
    </button>
  )
}

export function PlayBPM() {
  const [bpm, setBpm] = createSignal(120)
  const [playing, setPlaying] = createSignal<Playing>(false)

  const playBeat = () => {
    const audio = new Audio("/assets/metronome.wav")
    audio.play()
  }

  const getBeatInterval = (bpm: number) =>
    setInterval(playBeat, (60 / bpm) * 1000)

  const updateBpm = (bpm: number) => {
    setBpm(bpm)
    const handle = playing()
    if (typeof handle === "number") {
      clearInterval(handle)
      setPlaying(getBeatInterval(bpm))
    }
  }

  return (
    <section class={styles.play}>
      <div class={styles.inputs}>
        <input
          class={styles.slider}
          type="range"
          min={1}
          max={420}
          step={1}
          value={bpm()}
          onInput={(e) => updateBpm(e.currentTarget.valueAsNumber)}
        />
        <input
          class={styles.text}
          type="number"
          value={bpm()}
          onInput={(e) => {
            const value = e.currentTarget.valueAsNumber
            if (
              isFinite(value) &&
              value % 1 === 0 &&
              value > 0 &&
              value <= 420
            ) {
              updateBpm(value)
            }
          }}
        />
      </div>

      <div class={styles.playpause}>
        <button
          onClick={() =>
            setPlaying((playing) => {
              if (typeof playing === "number") {
                clearInterval(playing)
                return false
              } else {
                playBeat()
                const interval = getBeatInterval(bpm())
                return interval
              }
            })
          }
        >
          {playing() ? (
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
              Pause
            </span>
          ) : (
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
              Play
            </span>
          )}
        </button>
      </div>
    </section>
  )
}
