import { defineExt } from "../../define"
import type { Note, Text } from "../../types"

export const ext = defineExt<Text>()("note", "p", {
  presenter(data, exts) {
    return exts.Text(data)
  },
})

export function note(text: Text): Note {
  return ["p", text]
}
