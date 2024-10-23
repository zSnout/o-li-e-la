import { defineExt } from "../../lib/define"
import type { Text } from "../../lib/types"

// `tok` is more of a semantic highlighter than something which applies actual
// changes. Its main purpose is to properly mark toki pona words as referenced
// in vocab entries.

export const ext = defineExt<Text>()("text", "tok", {
  vocab(data, exts, proxy, vis) {
    exts.TextVocab(data, proxy, vis.asRefInner())
  },
  render(data, exts) {
    return exts.Text(data)
  },
  renderChallenge(data, exts) {
    return exts.TextChallenge(data)
  },
  entry(data, exts, filter) {
    return exts.TextEntry(data, filter)
  },
  entryNote(data, exts, filter) {
    return exts.TextEntryNote(data, filter)
  },
})

export function defineSemanticTok(text: Text): Text {
  return ["tok", text]
}
