import { defineExt } from "../../define"
import type { Content, Text } from "../../types"

export const ext = defineExt<Text>()("content", "p", {
  slide(data, exts) {
    return (
      <p class="my-4 font-ex-eng first:mt-0 last:mb-0">{exts.Text(data)}</p>
    )
  },
  print(data, exts) {
    return (
      <p class="my-4 font-ex-eng first:mt-0 last:mb-0">{exts.Text(data)}</p>
    )
  },
  entry(data, exts, filter) {
    return exts.TextEntry(data, filter)
  },
  presenter() {
    return []
  },
})

export function p(text: Text): Content {
  return ["p", text]
}
