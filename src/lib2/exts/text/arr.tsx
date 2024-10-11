import { For } from "solid-js"
import { defineExt } from "../../define"
import type { Text } from "../../types"

export const ext = defineExt<readonly Text[]>()("text", "arr", {
  render(data, slideshow) {
    return <For each={data}>{(x) => slideshow.Text(x)}</For>
  },
})

export function arr(text: readonly Text[]): Text {
  return ["arr", text]
}
