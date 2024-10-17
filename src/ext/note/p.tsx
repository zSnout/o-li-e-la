import { defineExt } from "../../lib/define"
import { type Note, type Text } from "../../lib/types"
import { VocabVis } from "../../lib/vocab"

export const ext = defineExt<Text>()("note", "p", {
  vocab(data, exts, proxy) {
    exts.TextVocab(data, proxy, VocabVis.NOTE)
  },
  presenter(data, exts) {
    return <p class="font-sans text-z">{exts.Text(data)}</p>
  },
  entry(data, exts, filter) {
    return exts.TextEntryNote(data, filter)
  },
})

export function note(text: Text): Note {
  return ["p", text]
}
