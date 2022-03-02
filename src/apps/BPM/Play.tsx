import { createSignal } from "solid-js"
import styles from "./Play.module.css"

type Playing = ReturnType<typeof setInterval> | false

export function Play() {
  const [bpm, setBpm] = createSignal(120)
  const [playing, setPlaying] = createSignal<Playing>(false)

  const playBeat = () => {
    const audio = new Audio("/assets/metronome.wav")
    audio.play()
  }

  const getBeatInterval = (bpm: number) => setInterval(playBeat, (60 / bpm) * 1000)

  const updateBpm = (bpm: number) => {
    setBpm(bpm)
    const handle = playing()
    if (typeof handle === "number") {
      clearInterval(handle)
      setPlaying(getBeatInterval(bpm))
    }
  }

  return (
    <section>
      <div class={styles.inputs}>
        <input
          class={styles.slider}
          type="range"
          min={1}
          max={420}
          step={1}
          value={bpm()}
          onInput={e => updateBpm(e.currentTarget.valueAsNumber)}
        />
        <input
          class={styles.text}
          type="number"
          value={bpm()}
          onInput={e => {
            const value = e.currentTarget.valueAsNumber
            if (isFinite(value) && value % 1 === 0 && value > 0 && value <= 420) {
              updateBpm(value)
            }
          }}
        />
      </div>

      <div class={styles.playpause}>
        <button
          onClick={() =>
            setPlaying(playing => {
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
