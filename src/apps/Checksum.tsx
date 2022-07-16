/** @jsxImportSource solid-js */
import { createSignal, For, Match, Switch } from "solid-js"
import { md5, sha1, sha256, sha512 } from "hash-wasm"

type Hash = [alg: string, hash: string]
async function getHashes(file: File): Promise<Hash[]> {
  const data = new Uint8Array(await file.arrayBuffer())

  return [
    ["MD5", await md5(data)],
    ["SHA-1", await sha1(data)],
    ["SHA-256", await sha256(data)],
    ["SHA-512", await sha512(data)],
  ]
}

function isStatus<T extends Status["type"]>(
  state: Status,
  status: T
): Extract<Status, { type: T }> | false {
  // @ts-ignore
  if (state.type === status) return state
  else return false
}

type Status =
  | { type: "WAIT-FILE" }
  | { type: "GENERATING" }
  | { type: "ERROR" }
  | { type: "SUCCESS"; hashes: Hash[] }

export function Checksum() {
  const [status, setStatus] = createSignal<Status>({ type: "WAIT-FILE" })

  return (
    <div>
      <input
        type="file"
        class="
          block w-full my-8 text-sm text-stone-500
          cursor-pointer file:cursor-pointer
          file:mr-4 file:py-2 file:px-4 file:border-0
          file:text-sm file:font-semibold
          file:bg-red-500 file:text-white
          hover:file:bg-red-600 file:transition-colors"
        onChange={async e => {
          if (!e.currentTarget.files || e.currentTarget.files.length === 0) return

          const file = e.currentTarget.files[0]
          setStatus({ type: "GENERATING" })
          try {
            const hashes = await getHashes(file)
            setStatus({ type: "SUCCESS", hashes })
          } catch (error) {
            console.error(error)
            setStatus({ type: "ERROR" })
          }
        }}
      />

      <Switch>
        <Match when={status().type === "GENERATING"}>
          <div>Generating...</div>
        </Match>
        <Match when={status().type === "ERROR"}>
          <div>Error</div>
        </Match>
        <Match when={isStatus(status(), "SUCCESS")}>
          {status => (
            <table>
              <thead>
                <tr class="border-b border-red-500">
                  <th class="text-center px-2">Algorithm</th>
                  <th class="text-left px-2">Hash</th>
                </tr>
              </thead>
              <tbody>
                <For each={status.hashes}>
                  {([alg, hash]) => (
                    <tr>
                      <td class="text-center py-2 px-2">{alg}</td>
                      <td class="text-left py-2 px-2">
                        {hash
                          .split("")
                          .reduce((str, c, i) => (i % 4 === 0 ? `${str} ${c}` : `${str}${c}`), "")
                          .trim()}
                      </td>
                    </tr>
                  )}
                </For>
              </tbody>
            </table>
          )}
        </Match>
      </Switch>
    </div>
  )
}
