import { definePlugin } from "../../define"
import type { Text } from "../../types"

export const plugin = definePlugin<{
  classes: string
  content: Text
}>()("text", "color", {
  render(data, slideshow) {
    return <span class={data.classes}>{slideshow.Text(data.content)}</span>
  },
})

export function styled(classes: string, content: Text): Text {
  return ["color", { classes, content }]
}
