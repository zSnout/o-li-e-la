import { defineExt } from "../../lib/define"
import type { Text } from "../../lib/types"

export const ext = defineExt<string>()("text", "", {
  render(data) {
    if (data.includes("\n")) {
      return <span class="whitespace-pre-line">{data}</span>
    } else {
      return data
    }
  },
  renderChallenge(data) {
    if (data.includes("\n")) {
      return <span class="whitespace-pre-line">{data}</span>
    } else {
      return data
    }
  },
  entry(): undefined {},
  entryNote(): undefined {},
})

export function str(text: string): Text {
  return ["", text]
}
