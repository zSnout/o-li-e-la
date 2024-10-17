import type { Group } from "../lib/slideshow"

interface Deck {
  title: string
  load(): Promise<{ default: Group[] }>
}

export const decks = {
  "conlangs/intro": {
    title: "Intro to Conlangs",
    load: () => import("./misc/conlangs"),
  },
  tok: {
    title: "toki pona",
    load: () => import("./toki-pona"),
  },
} satisfies Record<string, Deck>
