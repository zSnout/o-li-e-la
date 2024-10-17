import { defineExt } from "../../lib/define"
import { type Content, type Text } from "../../lib/types"
import { styledTok } from "../text/styled"

export const ext = defineExt<Text>()("content", "sitelen-pona", {
  vocab() {
    // sitelen pona does not count as an exemplifying use
  },
  slide(data, exts) {
    return (
      <p class="my-8 text-center font-sp-sans text-5xl">{exts.Text(data)}</p>
    )
  },
  entry(data, exts, filter) {
    return exts.TextEntry(data, filter)
  },
  presenter(): undefined {},
  print(data, exts) {
    return (
      <p class="my-8 text-center font-sp-sans text-3xl">{exts.Text(data)}</p>
    )
  },
})

export function defineSitelenPona([text]: TemplateStringsArray): Content {
  return ["sitelen-pona", styledTok(text!)]
}
