import { defineExt } from "../../define"
import type { Text } from "../../types"
import { fmt, type FmtParams } from "./fmt"

export const ext = defineExt<[href: string, content: Text]>()(
  "text",
  "linked",
  {
    render(data, exts) {
      return (
        <a href={data[0]} class="text-z-link underline underline-offset-2">
          {exts.Text(data[1])}
        </a>
      )
    },
    renderChallenge(data, exts) {
      return (
        <a href={data[0]} class="text-z-link underline underline-offset-2">
          {exts.Text(data[1])}
        </a>
      )
    },
    entry(data, exts) {
      return (
        <>
          {/* entry for link itself */}
          {exts.TextEntry(data[1])}
        </>
      )
    },
  },
)

export function defineLinked(href: string, content: Text): Text {
  return ["linked", [href, content]]
}

export function link([href]: readonly string[]) {
  return (...text: FmtParams) => defineLinked(href!, fmt(...text))
}
