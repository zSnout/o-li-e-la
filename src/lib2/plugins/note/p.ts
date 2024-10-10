import { definePlugin } from "../../define"
import type { Note, Text } from "../../types"

export const plugin = definePlugin<Text>()("note", "p", {
  presenter(data, slideshow) {
    return slideshow.Text(data)
  },
})

export function noteP(text: Text): Note {
  return ["p", text]
}
