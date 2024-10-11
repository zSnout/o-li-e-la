import { defineExt } from "../../define"
import type { Content, Text } from "../../types"

export const ext = defineExt<Text>()("content", "title", {
  slide(data, exts) {
    return (
      <h1 class="mb-8 text-balance font-ex-title text-4xl text-z-heading last:mb-0">
        {exts.Text(data)}
      </h1>
    )
  },
  print(data, exts) {
    return (
      <h1 class="mb-4 flex text-balance text-center font-ex-title text-xl text-z-heading last:mb-0">
        {exts.Text(data)}
      </h1>
    )
  },
  entry(data, exts) {
    return exts.TextEntry(data)
  },
  presenter(): undefined {},
})

export function title(text: Text): Content {
  return ["title", text]
}
