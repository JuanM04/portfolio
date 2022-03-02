import { createMemo, createSignal } from "solid-js"
import styles from "./Measure.module.css"

type Timestamps = [current: number, previous: number] | null

export function Measure() {
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
      class={styles.button}
      onClick={() => {
        setTimestamps(prev => {
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
