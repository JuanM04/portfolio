import { useState, useEffect, useRef } from "react"

import { Layout } from "components"
import styles from "styles/bpm"

const maxTaps = 10
let lastTap = Date.now()

export default () => {
  const [bpm, setBpm] = useState("0")
  const [taps, setTaps] = useState<number[]>([])

  useInterval(() => {
    if (taps.length < 2) return setBpm("0")
    if (Date.now() - lastTap >= 3000) setTaps([])

    let tapsDifference = taps.map((tap, i) => (i > 0 ? tap - taps[i - 1] : 0))
    let tapsReduced = tapsDifference.reduce(
      (accum, tap) => accum + tap / 1000,
      0
    )

    let finalBpm = 60 / (tapsReduced / (taps.length - 1))

    setBpm(finalBpm.toFixed(1))
  }, 500)

  function addTap() {
    const tap = (lastTap = Date.now())

    if (taps.length === maxTaps) setTaps(taps.slice(1).concat([tap]))
    else setTaps(taps.concat([tap]))
  }

  return (
    <Layout title="BPM">
      <div className={styles.container} onClick={addTap}>
        <p>
          {bpm}
          <span>bpm</span>
        </p>
      </div>
    </Layout>
  )
}

function useInterval(callback: Function, delay: number) {
  const savedCallback = useRef<Function>()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      if (typeof savedCallback.current !== "undefined") savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
