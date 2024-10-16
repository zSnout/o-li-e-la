import { defineExt } from "../../lib/define"
import type { Note, Text } from "../../lib/types"

export const ext = defineExt<Text>()("note", "p", {
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
