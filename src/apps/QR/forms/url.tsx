/** @jsxImportSource solid-js */
import { createSignal } from "solid-js"
import type { FormProps } from "./types"

// https://github.com/zxing/zxing/wiki/Barcode-Contents#url
export function URLInput({ onChange }: FormProps) {
  const [value, setValue] = createSignal("")

  return (
    <div class="col-span-full">
      <label for="url" class="form-label">
        URL
      </label>
      <br />
      <input
        id="url"
        type="url"
        class="form-input"
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
