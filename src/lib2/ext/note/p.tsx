import { defineExt } from "../../define"
import type { Note, Text } from "../../types"

export const ext = defineExt<Text>()("note", "p", {
  presenter(data, exts) {
    return <p class="font-sans text-z">{exts.Text(data)}</p>
  },
})

export function note(text: Text): Note {
  return ["p", text]
}
