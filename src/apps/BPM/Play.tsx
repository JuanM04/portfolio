/** @jsxImportSource solid-js */
import { createSignal } from "solid-js"

type Playing = ReturnType<typeof setInterval> | false

const MAX_BPM = 420
const MIN_BPM = 1

export function Play() {
  const [bpm, setBpm] = createSignal(60)
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
    <div>
      <div class="text-display flex items-center justify-center gap-x-2">
        <button
          class="font-black text-3xl p-2"
          onClick={() => {
            const newBPM = bpm() - 10
            if (newBPM < MIN_BPM) updateBpm(MIN_BPM)
            else updateBpm(newBPM)
          }}
        >
          -
        </button>
        <input
          class="font-bold text-5xl w-20 text-center bg-transparent outline-none no-spinner focus:border-b border-current"
          type="number"
          value={bpm()}
          max={420}
          placeholder="60"
          min={1}
          onChange={e => {
            const input = e.currentTarget.value.replace(/\D/, "")
            if (input === "") {
              updateBpm(60)
              return
            }

            const value = parseInt(input)
            if (!isFinite(value)) return

            if (value > MAX_BPM) updateBpm(MAX_BPM)
            else if (value < MIN_BPM) updateBpm(MIN_BPM)
            else updateBpm(value)
          }}
        />
        <button
          class="font-black text-3xl p-2"
          onClick={() => {
            const newBPM = bpm() + 10
            if (newBPM > MAX_BPM) updateBpm(MAX_BPM)
            else updateBpm(newBPM)
          }}
        >
          +
        </button>
      </div>

      <button
        class={[
          "flex items-center justify-center gap-x-2 mx-auto py-1 px-2 mt-2",
          playing() ? "text-white bg-red-500" : "bg-stone-200 dark:bg-stone-700",
        ].join(" ")}
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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="w-5 h-5 fill-current"
        >
          {playing() ? (
            <>
              <rect x="6" y="4" width="4" height="16" />
              <rect x="14" y="4" width="4" height="16" />
            </>
          ) : (
            <polygon points="5 3 19 12 5 21 5 3" />
          )}
        </svg>
        <span>{playing() ? "Pause" : "Play"}</span>
      </button>
    </div>
  )
}
