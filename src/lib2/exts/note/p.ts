import { defineExt } from "../../define"
import type { Note, Text } from "../../types"

export const ext = defineExt<Text>()("note", "p", {
  presenter(data, slideshow) {
    return slideshow.Text(data)
  },
})

export function noteP(text: Text): Note {
  return ["p", text]
}
