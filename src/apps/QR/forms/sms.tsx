/** @jsxImportSource solid-js */
import { createEffect } from "solid-js"
import { createStore } from "solid-js/store"
import type { FormProps } from "./types"

// https://github.com/zxing/zxing/wiki/Barcode-Contents#smsmmsfacetime
export function SMSInput({ onChange }: FormProps) {
  const [state, setState] = createStore({ number: "", message: "" })

  createEffect(() => {
    const message = state.message.trim()

    let uri = `sms:${state.number.replace(/[^0-9+]/g, "")}`
    if (message.length > 0) uri += `:${encodeURIComponent(message)}`

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
          value={state.message}
          onInput={e => setState("message", e.currentTarget.value)}
        />
      </div>
    </>
  )
}
