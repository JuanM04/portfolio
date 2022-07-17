/** @jsxImportSource solid-js */
import { createEffect } from "solid-js"
import { createStore } from "solid-js/store"
import type { FormProps } from "./types"

// https://github.com/zxing/zxing/wiki/Barcode-Contents#e-mail-address
export function EmailInput({ onChange }: FormProps) {
  const [state, setState] = createStore({ address: "", cc: "", bcc: "", subject: "", body: "" })

  createEffect(() => {
    const query = [
      state.cc.length > 0 && `cc=${state.cc}`,
      state.bcc.length > 0 && `bcc=${state.bcc}`,
      state.subject.length > 0 && `subject=${encodeURIComponent(state.subject)}`,
      state.body.length > 0 && `body=${encodeURIComponent(state.body)}`,
    ]
      .filter(Boolean)
      .join("&")

    let uri = `mailto:${state.address}`
    if (query.length > 0) uri += `?${query}`

    onChange(uri)
  })

  return (
    <>
      <div class="col-span-full">
        <label for="mail" class="form-label">
          Email address
        </label>
        <br />
        <input
          id="mail"
          type="email"
          value={state.address}
          class="form-input"
          onInput={e => setState("address", e.currentTarget.value)}
        />
      </div>

      <div>
        <label for="cc" class="form-label">
          CC (optional)
        </label>
        <br />
        <input
          id="cc"
          type="email"
          value={state.cc}
          placeholder="a@example.com,b@example.com"
          class="form-input"
          onInput={e => setState("cc", e.currentTarget.value)}
        />
      </div>
      <div>
        <label for="bcc" class="form-label">
          BCC (optional)
        </label>
        <br />
        <input
          id="bcc"
          type="email"
          value={state.bcc}
          placeholder="a@example.com,b@example.com"
          class="form-input"
          onInput={e => setState("bcc", e.currentTarget.value)}
        />
      </div>

      <div class="col-span-full">
        <label for="subject" class="form-label">
          Subject (optional)
        </label>
        <br />
        <input
          id="subject"
          type="text"
          value={state.subject}
          class="form-input"
          onInput={e => setState("subject", e.currentTarget.value)}
        />
      </div>

      <div class="col-span-full">
        <label for="body" class="form-label">
          Body (optional)
        </label>
        <br />
        <textarea
          id="body"
          value={state.body}
          rows={5}
          class="form-input"
          onInput={e => setState("body", e.currentTarget.value)}
        />
      </div>
    </>
  )
}
