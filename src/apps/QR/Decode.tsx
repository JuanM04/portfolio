/** @jsxImportSource solid-js */
import { createSignal, For, onMount, Show } from "solid-js"
import { BrowserQRCodeReader } from "@zxing/browser"

const codeReader = new BrowserQRCodeReader()

export function Decode() {
  const [source, setSource] = createSignal<string>("")
  const [sources, setSources] = createSignal<MediaDeviceInfo[] | null>(null)
  const [stopFn, setStopFn] = createSignal<(() => void) | null>(null)
  const [output, setOutput] = createSignal("Waiting for input...")

  onMount(async () => {
    const devices = await BrowserQRCodeReader.listVideoInputDevices()
    setSources(devices)
    if (devices.length > 0) setSource(devices[0].deviceId)
  })

  return (
    <section>
      <div class="flex flex-col sm:flex-row gap-8">
        <div
          id="qr-decode-box"
          class="bg-white border-8 border-red-500 max-w-xs w-full mx-auto aspect-[9/16] sm:aspect-square sm:w-52"
        />

        <div class="grow">
          <h4 class="font-bold text-display mb-2">Output</h4>

          <pre>{output()}</pre>
        </div>
      </div>

      <div class="grid sm:grid-cols-2 gap-8 mt-4">
        <div>
          <h4 class="font-bold text-display mb-2">From camera</h4>

          <Show when={sources()} fallback={<p>Loading input sources...</p>}>
            {sources =>
              sources.length === 0 ? (
                <p>No sources were found</p>
              ) : (
                <div class="flex">
                  <select
                    class="form-input grow"
                    value={source()}
                    onChange={e => setSource(e.currentTarget.value)}
                  >
                    <For each={sources}>
                      {source => <option value={source.deviceId}>{source.label}</option>}
                    </For>
                  </select>
                  {stopFn() ? (
                    <button
                      class="bg-red-500 hover:bg-red-400 text-white px-2 py-1"
                      onClick={() => {
                        stopFn()!()
                        setStopFn(null)
                      }}
                    >
                      Stop
                    </button>
                  ) : (
                    <button
                      class="bg-red-500 hover:bg-red-400 text-white px-2 py-1"
                      onClick={async () => {
                        const video = document.createElement("video")
                        video.style.width = "100%"
                        video.style.height = "100%"

                        document.getElementById("qr-decode-box")!.replaceChildren(video)
                        const controls = await codeReader.decodeFromVideoDevice(
                          source(),
                          video,
                          result => {
                            if (result) {
                              navigator.vibrate(200)
                              setOutput(result.text)
                            }
                          }
                        )

                        setStopFn(() => {
                          return () => void controls.stop()
                        })
                      }}
                    >
                      Start
                    </button>
                  )}
                </div>
              )
            }
          </Show>
        </div>

        <div>
          <h4 class="font-bold text-display mb-2">From image</h4>
          <input
            type="file"
            accept="image/*"
            onChange={async e => {
              if (stopFn()) stopFn()!()

              const file = e.currentTarget.files?.[0]
              if (!file) return

              const img = document.createElement("img")
              img.style.width = "100%"
              img.style.height = "100%"
              img.src = URL.createObjectURL(file)

              document.getElementById("qr-decode-box")!.replaceChildren(img)

              try {
                const result = await codeReader.decodeFromImageElement(img)
                setOutput(result.text)
              } catch (error) {
                console.error(error)
                setOutput("Error decoding image")
              }
            }}
          />
        </div>
      </div>
    </section>
  )
}
