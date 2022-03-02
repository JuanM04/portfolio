import { createSignal, createComputed, onCleanup, onMount } from "solid-js"
import styles from "./Slider.module.css"

function getClickPosition(event: PointerEvent, slider: HTMLDivElement): number {
  const sliderLeft = slider.getBoundingClientRect().left
  const sliderRight = slider.getBoundingClientRect().right
  const pointer = event.clientX

  if (pointer <= sliderLeft) return 0
  if (pointer >= sliderRight) return 1
  return (pointer - sliderLeft) / (sliderRight - sliderLeft)
}

export const Slider = (props: {
  value: number
  classList?: {
    [k: string]: boolean | undefined
  }
  onChange?: (value: number) => void
}) => {
  const [seeking, setSeeking] = createSignal(false)
  const [trackValue, setTrackValue] = createSignal(0)

  let sliderRef: HTMLDivElement

  createComputed(() => {
    // update the local copy whenever the parent updates
    if (!seeking()) setTrackValue(props.value)
  })

  const endSeeking = (e: PointerEvent) => {
    if (!seeking()) return

    setSeeking(false)
    const newValue = getClickPosition(e, sliderRef)
    props.onChange?.(newValue)
    setTrackValue(newValue)
  }

  const seek = (e: PointerEvent) => {
    if (seeking()) setTrackValue(getClickPosition(e, sliderRef))
  }

  onMount(() => {
    document.addEventListener("pointerup", endSeeking)
    document.addEventListener("pointercancel", endSeeking)
    document.addEventListener("pointermove", seek)

    onCleanup(() => {
      document.removeEventListener("pointerup", endSeeking)
      document.removeEventListener("pointercancel", endSeeking)
      document.removeEventListener("pointermove", seek)
    })
  })

  return (
    <div
      role="slider"
      ref={ref => (sliderRef = ref)}
      classList={{ ...props.classList, [styles.container]: true }}
      onPointerDown={e => {
        setSeeking(true)
        setTrackValue(getClickPosition(e, sliderRef))
      }}
    >
      <div
        class={styles.track}
        style={{
          background: `linear-gradient(to right, var(--accent) ${trackValue() * 100}%, var(--bg) ${
            trackValue() * 100
          }%)`,
        }}
      />
      <div
        class={styles.thumb}
        style={{
          left: `${trackValue() * 100}%`,
        }}
      />
    </div>
  )
}
