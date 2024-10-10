import { definePlugin } from "../../define"
import type { Content, Text } from "../../types"

export const plugin = definePlugin<Text>()("content", "p", {
  slide(data, slideshow) {
    return (
      <p class="my-4 font-ex-eng first:mt-0 last:mb-0">
        {slideshow.Text(data)}
      </p>
    )
  },
  print(data, slideshow) {
    return (
      <p class="my-4 font-ex-eng first:mt-0 last:mb-0">
        {slideshow.Text(data)}
      </p>
    )
  },
  entry() {
    return undefined
  },
  presenter() {
    return []
  },
})

export function p(text: Text): Content {
  return ["p", text]
}
