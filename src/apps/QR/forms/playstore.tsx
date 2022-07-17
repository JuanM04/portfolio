/** @jsxImportSource solid-js */
import { createSignal } from "solid-js"
import type { FormProps } from "./types"

// https://github.com/zxing/zxing/wiki/Barcode-Contents#google-play-store
export function PlayStoreInput({ onChange }: FormProps) {
  const [value, setValue] = createSignal("")

  return (
    <div class="col-span-full">
      <label for="appId" class="form-label">
        Play Store ID
      </label>
      <br />
      <input
        id="appId"
        type="text"
        class="form-input"
        placeholder="org.example.foo"
        value={value()}
        onInput={e => {
          const value = e.currentTarget.value
          setValue(value)
          onChange(`market://details?id=${value}`)
        }}
      />
    </div>
  )
}
