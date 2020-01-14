import React, { useState, useEffect, useRef } from "react"
import SEO from "../components/seo"
import styled from "styled-components"

const StyledDiv = styled.div`
  width: 100%;
  height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;

  p {
    font-size: 10vw;
    font-weight: 100;
    text-align: center;

    @media (max-width: 800px) {
      font-size: 33vw;
    }

    .measure {
      font-size: 2vw;
      font-style: italic;

      @media (max-width: 800px) {
        font-size: 5vw;
      }
    }
  }
`

const maxTaps = 10
let lastTap = Date.now()

export default () => {
  const [bpm, setBpm] = useState(0)
  const [taps, setTaps] = useState([])

  useInterval(() => {
    if (taps.length < 2) return setBpm(0)
    if (Date.now() - lastTap >= 3000) setTaps([])

    let tapsDifference = taps.map((tap, i) => i > 0 && tap - taps[i - 1])
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
    <StyledDiv onClick={addTap}>
      <p>
        <span className="bpm">{bpm}</span>
        <span className="measure">bpm</span>
      </p>
    </StyledDiv>
  )
}

function useInterval(callback, delay) {
  const savedCallback = useRef()

  // Remember the latest callback.
  useEffect(() => {
    savedCallback.current = callback
  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current()
    }
    if (delay !== null) {
      let id = setInterval(tick, delay)
      return () => clearInterval(id)
    }
  }, [delay])
}
