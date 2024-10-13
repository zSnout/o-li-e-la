import { defineExt } from "../../define"
import type { Note, Text } from "../../types"

export const ext = defineExt<Text>()("note", "p_small", {
  presenter(data, exts) {
    return <p class="font-sans text-sm text-z-subtitle">{exts.Text(data)}</p>
  },
})

export function defineNoteSmall(text: Text): Note {
  return ["p_small", text]
}
