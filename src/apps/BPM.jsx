import { createMemo, createSignal } from "solid-js"
import styles from "./BPM.module.css"

export function BPM() {
  const [timestamps, setTimestamps] = createSignal(null, { equals: false })

  const bpm = createMemo(() => {
    const time = timestamps()
    if (!time) return 0

    const diffInSeconds = (time[0] - time[1]) / 1000
    if (diffInSeconds <= 0 || diffInSeconds > 60) return 0

    return Math.round(60 / diffInSeconds)
  })

  return (
    <div
      class={styles.button}
      role="button"
      onClick={() => {
        setTimestamps((prev) => {
          const now = new Date().getTime()
          if (prev) return [now, prev[0]]
          else return [now, now]
        })
      }}
    >
      <div>
        <span className={styles.value}>{bpm()}</span>
        <span className={styles.label}>BPM</span>
      </div>
    </div>
  )
}
