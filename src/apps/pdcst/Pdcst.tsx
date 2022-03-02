import { createEffect, onMount } from "solid-js"
import { createStore, Store } from "solid-js/store"
import SuperJSON from "superjson"

import { EpisodesList } from "./EpisodesList"
import { Player } from "./Player"
import type { EpisodeType } from "./schemas"

export interface PlayerStoreData {
  episode: EpisodeType | null
  time: number
}

export interface PlayerStoreSetter {
  changeEpisode: (episode: EpisodeType | null) => void
  updateTime: (time: number) => void
}

export type PlayerStore = [Store<PlayerStoreData>, PlayerStoreSetter]

const storeKey = "pdcst"

export function Pdcst() {
  const [state, setState] = createStore<PlayerStoreData>({
    episode: null,
    time: 0,
  })

  onMount(() => {
    if (typeof localStorage === "undefined") return

    const localData = localStorage.getItem(storeKey)
    if (localData) setState(SuperJSON.parse(localData))
  })

  createEffect(() => localStorage.setItem(storeKey, SuperJSON.stringify(state)))

  const playerStore: PlayerStore = [
    state,
    {
      changeEpisode: episode => setState({ episode, time: 0 }),
      updateTime: time => setState("time", time),
    },
  ]

  return (
    <>
      <Player playerStore={playerStore} />
      <EpisodesList playerStore={playerStore} />
    </>
  )
}
