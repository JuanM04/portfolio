/** @jsxImportSource solid-js */
import { createSignal } from "solid-js"
import type { FormProps } from "./types"

export function TextInput({ onChange }: FormProps) {
  const [value, setValue] = createSignal("")

  return (
    <div class="col-span-full">
      <label for="text" class="form-label">
        Text
      </label>
      <br />
      <textarea
        id="text"
        class="form-input"
        rows={5}
        value={value()}
        onInput={e => {
          const value = e.currentTarget.value
          setValue(value)
          onChange(value)
        }}
      />
    </div>
  )
}
