import type { Group } from "../lib/slideshow"

interface Deck {
  title: string
  load(): Promise<{ default: Group[] }>
  hidden?: boolean
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
  "tok/drafts": {
    title: "toki pona + drafts",
    load: () => import("./toki-pona/drafts"),
    hidden: true,
  },
} satisfies Record<string, Deck>
