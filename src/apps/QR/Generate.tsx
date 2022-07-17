/** @jsxImportSource solid-js */
import { createMemo, createSignal, Match, Switch } from "solid-js"
import { CalendarInput } from "./forms/calendar"
import { ContactInput } from "./forms/contact"
import { EmailInput } from "./forms/email"
import { FacetimeInput } from "./forms/facetime"
import { GeolocationInput } from "./forms/geo"
import { PhoneInput } from "./forms/phone"
import { PlayStoreInput } from "./forms/playstore"
import { SMSInput } from "./forms/sms"
import { TextInput } from "./forms/text"
import { URLInput } from "./forms/url"
import { WhatsAppInput } from "./forms/whatsapp"
import { WiFiInput } from "./forms/wifi"
import { BrowserQRCodeSvgWriter } from "@zxing/browser"

type QRType =
  | "calendar"
  | "contact"
  | "email"
  | "facetime"
  | "geo"
  | "phone"
  | "playstore"
  | "sms"
  | "text"
  | "url"
  | "whatsapp"
  | "wifi"

const codeWriter = new BrowserQRCodeSvgWriter()

export function Generate() {
  const [qrValue, setQRValue] = createSignal("")
  const [type, setType] = createSignal<QRType>("url")

  const qrSVG = createMemo(() => {
    return codeWriter.write(qrValue() || "juanm04", 192, 192)
  })

  const getQRBlob = () => {
    let svg = qrSVG().outerHTML
    svg = svg.replace("<svg ", '<svg xmlns="http://www.w3.org/2000/svg" ')
    return new Blob([svg], { type: "image/svg+xml;charset=utf-8" })
  }

  return (
    <section class="flex flex-col-reverse sm:flex-row gap-8">
      <div class="w-min mx-auto">
        <div class="bg-white border-8 border-red-500 h-min w-min" innerHTML={qrSVG().outerHTML} />

        <table class="w-full mt-2">
          <tbody>
            <tr>
              <td>PNG 128px</td>
              <td class="text-center">
                <CopyButton onClick={() => svgToPng(getQRBlob(), 128).then(copyBlob)} />
                <DownloadButton
                  onClick={() =>
                    svgToPng(getQRBlob(), 128).then(blob => downloadBlob(blob, "qr-128px.png"))
                  }
                />
              </td>
            </tr>
            <tr>
              <td>PNG 256px</td>
              <td class="text-center">
                <CopyButton onClick={() => svgToPng(getQRBlob(), 256).then(copyBlob)} />
                <DownloadButton
                  onClick={() =>
                    svgToPng(getQRBlob(), 256).then(blob => downloadBlob(blob, "qr-256px.png"))
                  }
                />
              </td>
            </tr>
            <tr>
              <td>PNG 1024px</td>
              <td class="text-center">
                <CopyButton onClick={() => svgToPng(getQRBlob(), 1024).then(copyBlob)} />
                <DownloadButton
                  onClick={() =>
                    svgToPng(getQRBlob(), 1024).then(blob => downloadBlob(blob, "qr-1024px.png"))
                  }
                />
              </td>
            </tr>
            <tr>
              <td>SVG</td>
              <td class="text-center">
                <DownloadButton onClick={() => downloadBlob(getQRBlob(), "qr.svg")} />
              </td>
            </tr>
            <tr>
              <td>URI</td>
              <td class="text-center">
                <CopyButton onClick={() => navigator.clipboard.writeText(qrValue())} />
                <ExternalButton onClick={() => window.open(qrValue())} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="grid grid-cols-2 gap-4 h-min w-full">
        <label for="content-selector">Content Type</label>
        <select
          id="content-selector"
          class="form-input"
          value={type()}
          onChange={e => setType(e.currentTarget.value as QRType)}
        >
          <option value="calendar">Calendar</option>
          <option value="contact">Contact</option>
          <option value="email">Email</option>
          <option value="facetime">Facetime</option>
          <option value="geo">Geolocation</option>
          <option value="phone">Phone</option>
          <option value="playstore">Play Store</option>
          <option value="sms">SMS</option>
          <option value="text">Text</option>
          <option value="url">URL</option>
          <option value="whatsapp">WhatsApp</option>
          <option value="wifi">WiFi network</option>
        </select>

        <hr class="col-span-full" />

        <Switch>
          <Match when={type() === "calendar"}>
            <CalendarInput onChange={setQRValue} />
          </Match>
          <Match when={type() === "contact"}>
            <ContactInput onChange={setQRValue} />
          </Match>
          <Match when={type() === "email"}>
            <EmailInput onChange={setQRValue} />
          </Match>
          <Match when={type() === "facetime"}>
            <FacetimeInput onChange={setQRValue} />
          </Match>
          <Match when={type() === "geo"}>
            <GeolocationInput onChange={setQRValue} />
          </Match>
          <Match when={type() === "phone"}>
            <PhoneInput onChange={setQRValue} />
          </Match>
          <Match when={type() === "playstore"}>
            <PlayStoreInput onChange={setQRValue} />
          </Match>
          <Match when={type() === "sms"}>
            <SMSInput onChange={setQRValue} />
          </Match>
          <Match when={type() === "text"}>
            <TextInput onChange={setQRValue} />
          </Match>
          <Match when={type() === "url"}>
            <URLInput onChange={setQRValue} />
          </Match>
          <Match when={type() === "whatsapp"}>
            <WhatsAppInput onChange={setQRValue} />
          </Match>
          <Match when={type() === "wifi"}>
            <WiFiInput onChange={setQRValue} />
          </Match>
        </Switch>
      </div>
    </section>
  )
}

function svgToPng(svg: Blob, size: number) {
  return new Promise<Blob>((resolve, reject) => {
    const src = URL.createObjectURL(svg)

    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = size
      canvas.height = size
      const ctx = canvas.getContext("2d")!
      ctx.drawImage(img, 0, 0, size, size)

      URL.revokeObjectURL(src)

      canvas.toBlob(blob => resolve(blob!), "image/png", 1)
    }
    img.onerror = (...args) => {
      console.log(args)
      reject(new Error("Failed to load SVG"))
    }
    img.src = src
  })
}

async function copyBlob(blob: Blob) {
  return navigator.clipboard.write([
    new ClipboardItem({
      [blob.type]: blob,
    }),
  ])
}

function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

const CopyButton = ({ onClick }: { onClick?: () => void }) => (
  <button class="mx-1 hover:text-red-500 transition-colors" title="Copy" onClick={onClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
      class="w-6 h-6"
    >
      <path
        fill="currentColor"
        d="M2 4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v4h4a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-4H4a2 2 0 0 1-2-2V4zm8 12v4h10V10h-4v4a2 2 0 0 1-2 2h-4zm4-2V4H4v10h10z"
      />
    </svg>
  </button>
)

const DownloadButton = ({ onClick }: { onClick?: () => void }) => (
  <button class="mx-1 hover:text-red-500 transition-colors" title="Download" onClick={onClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
      class="w-6 h-6"
    >
      <path
        fill="currentColor"
        d="M12 2a1 1 0 0 1 1 1v10.586l2.293-2.293a1 1 0 0 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 1 1 1.414-1.414L11 13.586V3a1 1 0 0 1 1-1zM5 17a1 1 0 0 1 1 1v2h12v-2a1 1 0 1 1 2 0v2a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2a1 1 0 0 1 1-1z"
      />
    </svg>
  </button>
)

const ExternalButton = ({ onClick }: { onClick?: () => void }) => (
  <button class="mx-1 hover:text-red-500 transition-colors" title="Open" onClick={onClick}>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 24 24"
      class="w-6 h-6"
    >
      <path
        fill="currentColor"
        d="M14 5a1 1 0 1 1 0-2h6a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V6.414l-9.293 9.293a1 1 0 0 1-1.414-1.414L17.586 5H14zM3 7a2 2 0 0 1 2-2h5a1 1 0 1 1 0 2H5v12h12v-5a1 1 0 1 1 2 0v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7z"
      />
    </svg>
  </button>
)
