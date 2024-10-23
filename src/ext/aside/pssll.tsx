import { defineExt } from "../../lib/define"
import type { Aside, Text } from "../../lib/types"
import { fmt, type FmtParams } from "../text/fmt"

export const ext = defineExt<Text>()("aside", "pssll", {
  vocab() {
    // TODO: maybe this should be counted as pssll vocabulary
  },
  entry(data, exts, filter) {
    return exts.TextEntry(data, filter)
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

export function pssll(...text: FmtParams): Aside {
  return ["pssll", fmt(...text)]
}
