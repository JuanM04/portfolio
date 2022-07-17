/** @jsxImportSource solid-js */
import { createEffect } from "solid-js"
import { createStore } from "solid-js/store"
import type { FormProps } from "./types"

type Mode = "video" | "audio"

// https://github.com/zxing/zxing/wiki/Barcode-Contents#smsmmsfacetime
export function FacetimeInput({ onChange }: FormProps) {
  const [state, setState] = createStore({ contact: "", mode: "video" as Mode })

  createEffect(() => {
    const prefix = state.mode === "video" ? "facetime" : "facetime-audio"
    onChange(`${prefix}:${state.contact}`)
  })

  return (
    <>
      <div class="col-span-full">
        <label for="contact" class="form-label">
          Number / Apple ID email
        </label>
        <br />
        <input
          id="contact"
          type="text"
          value={state.contact}
          class="form-input"
          onInput={e => {
            const value = e.currentTarget.value
            setState("contact", value)
          }}
        />
      </div>

      <label for="mode">Mode</label>
      <select
        class="form-input"
        value={state.mode}
        onChange={e => setState("mode", e.currentTarget.value as Mode)}
      >
        <option value="audio">Audio</option>
        <option value="video">Video</option>
      </select>
    </>
  )
}
