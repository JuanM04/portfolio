/** @jsxImportSource solid-js */
import { createEffect } from "solid-js"
import { createStore } from "solid-js/store"
import type { FormProps } from "./types"

export function WhatsAppInput({ onChange }: FormProps) {
  const [state, setState] = createStore({ number: "", text: "" })

  createEffect(() => {
    const text = state.text.trim()

    let uri = `https://wa.me/${state.number.replace(/\D/g, "")}`
    if (text.length > 0) uri += `?text=${encodeURIComponent(text)}`

    onChange(uri)
  })

  return (
    <>
      <div class="col-span-full">
        <label for="number" class="form-label">
          Phone number
        </label>
        <br />
        <input
          id="number"
          type="tel"
          value={state.number}
          class="form-input"
          onInput={e => setState("number", e.currentTarget.value)}
        />
      </div>

      <div class="col-span-full">
        <label for="message" class="form-label">
          Message (optional)
        </label>
        <br />
        <textarea
          id="message"
          class="form-input"
          rows={5}
          value={state.text}
          onInput={e => setState("text", e.currentTarget.value)}
        />
      </div>
    </>
  )
}
