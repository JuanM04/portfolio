/** @jsxImportSource solid-js */
import { createEffect } from "solid-js"
import { createStore } from "solid-js/store"
import type { FormProps } from "./types"

type EncodingType = "MeCard" | "vCard"

// https://github.com/zxing/zxing/wiki/Barcode-Contents#contact-information
export function ContactInput({ onChange }: FormProps) {
  const [state, setState] = createStore({
    address: "",
    bday: "",
    email: "",
    name: "",
    nickname: "",
    note: "",
    phone: "",
    url: "",
    encoding: "MeCard" as EncodingType,
  })

  createEffect(() => {
    const props = [
      state.name.length > 0 && `N:${state.name}`,
      state.nickname.length > 0 && `NICKNAME:${state.nickname}`,
      state.bday.length > 0 && `BDAY:${state.bday.replace(/\D/g, "")}`,
      state.address.length > 0 && `ADR:${state.address}`,
      state.email.length > 0 && `EMAIL:${state.email}`,
      state.phone.length > 0 && `TEL:${state.phone}`,
      state.url.length > 0 && `URL:${state.url}`,
      state.note.length > 0 && `NOTE:${state.note}`,
    ].filter(Boolean)

    if (state.encoding === "MeCard") {
      onChange(`MECARD:${props.join(";")};;`)
    } else {
      onChange(`BEGIN:VCARD\n${props.join("\n")}\nEND:VCARD`)
    }
  })

  return (
    <>
      <div>
        <label for="name" class="form-label">
          Name
        </label>
        <br />
        <input
          id="name"
          type="text"
          value={state.name}
          class="form-input"
          onInput={e => setState("name", e.currentTarget.value)}
        />
      </div>
      <div>
        <label for="nickname" class="form-label">
          Nickname
        </label>
        <br />
        <input
          id="nickname"
          type="text"
          value={state.nickname}
          class="form-input"
          onInput={e => setState("nickname", e.currentTarget.value)}
        />
      </div>

      <div class="col-span-full">
        <label for="phone" class="form-label">
          Phone
        </label>
        <br />
        <input
          id="phone"
          type="tel"
          value={state.phone}
          class="form-input"
          onInput={e => setState("phone", e.currentTarget.value)}
        />
      </div>

      <div>
        <label for="email" class="form-label">
          Email
        </label>
        <br />
        <input
          id="email"
          type="tel"
          value={state.email}
          class="form-input"
          onInput={e => setState("email", e.currentTarget.value)}
        />
      </div>
      <div>
        <label for="url" class="form-label">
          Website
        </label>
        <br />
        <input
          id="url"
          type="url"
          value={state.url}
          class="form-input"
          onInput={e => setState("url", e.currentTarget.value)}
        />
      </div>

      <div class="col-span-full">
        <label for="address" class="form-label">
          Address
        </label>
        <br />
        <input
          id="address"
          type="text"
          value={state.address}
          class="form-input"
          onInput={e => setState("address", e.currentTarget.value)}
        />
      </div>

      <div class="col-span-full">
        <label for="bday" class="form-label">
          Birthday
        </label>
        <br />
        <input
          id="bday"
          type="date"
          value={state.bday}
          class="form-input"
          onInput={e => setState("bday", e.currentTarget.value)}
        />
      </div>

      <div class="col-span-full">
        <label for="notes" class="form-label">
          Notes
        </label>
        <br />
        <textarea
          id="notes"
          value={state.note}
          rows={5}
          class="form-input"
          onInput={e => setState("note", e.currentTarget.value)}
        />
      </div>

      <label for="notes">Encoding</label>
      <select
        class="form-input"
        value={state.encoding}
        onChange={e => setState("encoding", e.currentTarget.value as EncodingType)}
      >
        <option value="MeCard">MeCard</option>
        <option value="vCard">vCard</option>
      </select>
    </>
  )
}
