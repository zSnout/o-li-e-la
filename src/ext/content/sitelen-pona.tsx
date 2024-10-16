import { defineExt } from "../../lib/define"
import type { Content, Text } from "../../lib/types"
import { styledTok } from "../text/styled"

export const ext = defineExt<Text>()("content", "sitelen-pona", {
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
