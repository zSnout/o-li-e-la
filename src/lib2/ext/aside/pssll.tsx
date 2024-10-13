import { defineExt } from "../../define"
import type { Aside, Text } from "../../types"
import { fmt, type TextParams } from "../text/fmt"

export const ext = defineExt<Text>()("aside", "pssll", {
  entry(data, exts) {
    return exts.TextEntry(data)
  },
  presenter(): undefined {},
  slide(data, exts) {
    return (
      <div class="relative flex aspect-[8/9] h-full items-center bg-z-body-selected px-6 py-8 text-center font-mono text-xl text-z-heading">
        {exts.Text(data)}
      </div>
    )
  },
})

export function pssll(...text: TextParams): Aside {
  return ["pssll", fmt(...text)]
}
