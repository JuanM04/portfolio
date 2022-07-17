/** @jsxImportSource solid-js */
import { createEffect } from "solid-js"
import { createStore } from "solid-js/store"
import type { FormProps } from "./types"

type AuthType = "nopass" | "WEP" | "WPA" | "WPA2-EAP"

// https://github.com/zxing/zxing/wiki/Barcode-Contents#wi-fi-network-config-android-ios-11
export function WiFiInput({ onChange }: FormProps) {
  const [state, setState] = createStore({
    ssid: "",
    auth: "WPA2-EAP" as AuthType,
    password: "",
    hidden: false,
  })

  createEffect(() => {
    const props = [
      `T:${state.auth}`,
      `S:${state.ssid}`,
      state.auth !== "nopass" && `P:${state.password}`,
      state.hidden && "H:true",
    ]
      .filter(Boolean)
      .join(";")

    onChange(`WIFI:${props};;`)
  })

  return (
    <>
      <div>
        <label for="ssid" class="form-label">
          SSID
        </label>
        <br />
        <input
          id="ssid"
          type="text"
          value={state.ssid}
          class="form-input"
          onInput={e => setState("ssid", e.currentTarget.value)}
        />
      </div>
      <div>
        <label for="password" class="form-label">
          Password
        </label>
        <br />
        <input
          id="password"
          type="password"
          value={state.password}
          class="form-input"
          onInput={e => setState("password", e.currentTarget.value)}
        />
      </div>

      <div>
        <label for="auth" class="form-label">
          Authentication
        </label>
        <br />
        <select
          id="auth"
          value={state.auth}
          class="form-input w-full"
          onChange={e => setState("auth", e.currentTarget.value as AuthType)}
        >
          <option value="nopass">No password</option>
          <option value="WEP">WEP</option>
          <option value="WPA">WPA</option>
          <option value="WPA2-EAP">WPA2-EAP</option>
        </select>
      </div>

      <div class="flex items-center justify-between">
        <label for="hidden">Hidden</label>
        <input
          id="hidden"
          type="checkbox"
          checked={state.hidden}
          onInput={e => setState("hidden", e.currentTarget.checked)}
        />
      </div>
    </>
  )
}
