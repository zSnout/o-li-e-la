import { For } from "solid-js"
import { defineExt } from "../../define"
import type { Text } from "../../types"

export const ext = defineExt<readonly Text[]>()("text", "arr", {
  render(data, exts) {
    return <For each={data}>{(x) => exts.Text(x)}</For>
  },
  renderChallenge(data, exts) {
    return <For each={data}>{(x) => exts.TextChallenge(x)}</For>
  },
  entry(data, exts) {
    return <For each={data}>{(x) => exts.TextEntry(x)}</For>
  },
})

export function arr(text: readonly Text[]): Text {
  return ["arr", text]
}
