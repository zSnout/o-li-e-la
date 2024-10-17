import { For } from "solid-js"
import { defineExt } from "../../lib/define"
import type { Text } from "../../lib/types"

export const ext = defineExt<readonly Text[]>()("text", "arr", {
  vocab(data, exts, proxy, vis) {
    for (const el of data) {
      exts.TextVocab(el, proxy, vis)
    }
  },
  render(data, exts) {
    return <For each={data}>{(x) => exts.Text(x)}</For>
  },
  renderChallenge(data, exts) {
    return <For each={data}>{(x) => exts.TextChallenge(x)}</For>
  },
  entry(data, exts, filter) {
    return <For each={data}>{(x) => exts.TextEntry(x, filter)}</For>
  },
  entryNote(data, exts, filter) {
    return <For each={data}>{(x) => exts.TextEntryNote(x, filter)}</For>
  },
})

export function arr(text: readonly Text[]): Text {
  return ["arr", text]
}
