/** @jsxImportSource solid-js */
import { createMemo, createSignal } from "solid-js"

type Timestamps = [current: number, previous: number] | null

function median(inputs: number[]) {
  if (inputs.length === 0) return 0

  let values = [...inputs]
  values.sort((a, b) => a - b)

  var half = Math.floor(values.length / 2)

  if (values.length % 2) return values[half]

  return (values[half - 1] + values[half]) / 2.0
}

export function Measure() {
  const [timestamps, setTimestamps] = createSignal<Timestamps>(null, {
    equals: false,
  })
  const [_, setPreviousBPM] = createSignal<number[]>([], {
    equals: false,
  })

  const bpm = createMemo(() => {
    const time = timestamps()
    if (!time) return 0

    const diffInSeconds = (time[0] - time[1]) / 1000
    if (diffInSeconds <= 0 || diffInSeconds > 60) {
      setPreviousBPM([])
      return 0
    }

    const newBPM = 60 / diffInSeconds
    const allBPMS = setPreviousBPM(previousBPM =>
      previousBPM.length < 10 ? [...previousBPM, newBPM] : [...previousBPM.slice(1), newBPM]
    )

    return Math.round(median(allBPMS))
  })

  return (
    <button
      class="max-w-md block my-4 mx-auto w-full h-full bg-red-500"
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
