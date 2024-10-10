import { For } from "solid-js"
import { definePlugin } from "../../define"
import type { Text } from "../../types"

export const plugin = definePlugin<readonly Text[]>()("text", "arr", {
  render(data, slideshow) {
    return <For each={data}>{(x) => slideshow.Text(x)}</For>
  },
})

export function arr(...text: readonly Text[]): Text {
  return ["arr", text]
}
