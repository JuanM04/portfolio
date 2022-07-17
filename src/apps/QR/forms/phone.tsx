/** @jsxImportSource solid-js */
import { createSignal } from "solid-js"
import type { FormProps } from "./types"

// https://github.com/zxing/zxing/wiki/Barcode-Contents#telephone-numbers
export function PhoneInput({ onChange }: FormProps) {
  const [value, setValue] = createSignal("")

  return (
    <div class="col-span-full">
      <label for="phone" class="form-label">
        Phone
      </label>
      <br />
      <input
        id="phone"
        type="tel"
        class="form-input"
        value={value()}
        onInput={e => {
          const value = e.currentTarget.value
          setValue(value)
          onChange(`tel:${value}`)
        }}
      />
    </div>
  )
}
