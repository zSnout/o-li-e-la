import { text, type TextParams } from "../text"
import type { AtLeastOneMut, InfoListUl, ListEntry, ToContent } from "../types"

export interface Done extends ToContent<InfoListUl> {
  li(...text: TextParams): Done
}

export function ul(...li: TextParams) {
  const items: AtLeastOneMut<ListEntry> = [{ text: text(...li) }]

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
