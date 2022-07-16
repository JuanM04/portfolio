/** @jsxImportSource solid-js */
import { createMemo, createSignal } from "solid-js"

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
      class="max-w-md w-full h-full bg-red-500"
      onClick={() => {
        setTimestamps(prev => {
          const now = new Date().getTime()
          if (prev) return [now, prev[0]]
          else return [now, now]
        })
      }}
    >
      <div class="flex justify-center items-baseline py-12 text-display font-bold">
        <span class="text-5xl text-white">{bpm()}</span>
        <span class="text-sm text-red-100">BPM</span>
      </div>
    </button>
  )
}
