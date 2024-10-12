import { defineExt } from "../../define"
import type { Content, Text } from "../../types"
import { fmt, type TextParams } from "../text/fmt"

export const ext = defineExt<Text>()("content", "title", {
  slide(data, exts) {
    return (
      <h1 class="my-8 text-balance font-ex-title text-4xl text-z-heading first:mt-0 last:mb-0">
        {exts.Text(data)}
      </h1>
    )
  },
  print(data, exts) {
    return (
      <h1 class="my-4 flex text-balance text-center font-ex-title text-xl text-z-heading first:mt-0 last:mb-0">
        {exts.Text(data)}
      </h1>
    )
  },
  entry(data, exts) {
    return exts.TextEntry(data)
  },
  presenter(): undefined {},
})

export function titleRaw(text: Text): Content {
  return ["title", text]
}

export function title(...text: TextParams): Content {
  return titleRaw(fmt(...text))
}
