import { definePlugin } from "../../define"
import type { Text } from "../../types"

export const plugin = definePlugin<string>()("text", "", {
  render(data) {
    return data
  },
})

export function str(text: string): Text {
  return ["", text]
}
