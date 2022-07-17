/** @jsxImportSource solid-js */
import { createEffect } from "solid-js"
import { createStore } from "solid-js/store"
import type { FormProps } from "./types"

// https://github.com/zxing/zxing/wiki/Barcode-Contents#maps-geographic-information
export function GeolocationInput({ onChange }: FormProps) {
  const [state, setState] = createStore({ latitude: "", longitude: "", query: "" })

  createEffect(() => {
    const latitude = state.latitude.replace(/[^0-9.-]/g, "")
    const longitude = state.longitude.replace(/[^0-9.-]/g, "")
    const query = state.query.trim()

    let uri = `geo:${latitude},${longitude}`
    if (query.length > 0) uri += `:${encodeURIComponent(query)}`

    onChange(uri)
  })

  return (
    <>
      <div>
        <label for="lat" class="form-label">
          Latitude
        </label>
        <br />
        <input
          id="lat"
          type="number"
          value={state.latitude}
          class="form-input"
          onInput={e => setState("latitude", e.currentTarget.value)}
        />
      </div>
      <div>
        <label for="long" class="form-label">
          Longitude
        </label>
        <br />
        <input
          id="long"
          type="number"
          value={state.longitude}
          class="form-input"
          onInput={e => setState("longitude", e.currentTarget.value)}
        />
      </div>

      <div class="col-span-full">
        <label for="long" class="form-label">
          Query (optional)
        </label>
        <br />
        <input
          id="long"
          type="text"
          value={state.query}
          class="form-input"
          onInput={e => setState("query", e.currentTarget.value)}
        />
      </div>
    </>
  )
}
