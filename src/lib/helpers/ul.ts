import { text, type TextParams } from "../text"
import type {
  AtLeastOneMutable,
  InfoListUl,
  ListEntry,
  ToContent,
} from "../types"

export interface Done extends ToContent<InfoListUl> {
  li(...text: TextParams): Done
}

export function ul(...li: TextParams) {
  const items: AtLeastOneMutable<ListEntry> = [{ text: text(...li) }]

  const Done: Done = {
    finalize() {
      return { type: "ul", items }
    },
    li(...li) {
      items.push({ text: text(...li) })
      return Done
    },
  }

  return Done
}
