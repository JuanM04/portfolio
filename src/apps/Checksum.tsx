/** @jsxImportSource solid-js */
import { createSignal, For, Match, Switch } from "solid-js"
import { md5, sha1, sha256, sha512 } from "hash-wasm"

type Hash = [alg: string, hash: string]
async function getHashes(file: File): Promise<Hash[]> {
  const data = new Uint8Array(await file.arrayBuffer())

  const hashes = await Promise.all([md5(data), sha1(data), sha256(data), sha512(data)])

  return [
    ["MD5", hashes[0]],
    ["SHA-1", hashes[1]],
    ["SHA-256", hashes[2]],
    ["SHA-512", hashes[3]],
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
        class="my-8"
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
