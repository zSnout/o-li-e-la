import { defineExt } from "../../define"
import type { Content, Text } from "../../types"

export const ext = defineExt<[content: Text, index: number]>()(
  "content",
  "title_indexed",
  {
    slide(data, exts) {
      return (
        <h1 class="mb-8 flex font-ex-title text-4xl text-z-heading last:mb-0">
          <span class="flex-1 text-balance text-center font-ex-title">
            {exts.Text(data[0])}
          </span>
          <span class="font-ex-eng text-z-subtitle">#{data[1]}</span>
        </h1>
      )
    },
    print(data, exts) {
      return (
        <h1 class="mb-4 flex text-xl text-z-heading last:mb-0">
          <span class="flex-1 text-balance text-center font-ex-title">
            {exts.Text(data[0])}
          </span>
          <span class="font-ex-eng text-z-subtitle">#{data[1]}</span>
        </h1>
      )
    },
    entry(data, exts) {
      return exts.TextEntry(data[0])
    },
    presenter() {
      return []
    },
  },
)

export function titleIndexed(text: Text, index: number): Content {
  return ["title_indexed", [text, index]]
}
