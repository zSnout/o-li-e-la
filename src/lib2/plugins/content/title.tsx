import { definePlugin } from "../../define"
import type { Content, Text } from "../../types"

export const plugin = definePlugin<Text>()("content", "title", {
  slide(data, slideshow) {
    return (
      <h1 class="mb-8 text-balance font-ex-title text-4xl text-z-heading last:mb-0">
        {slideshow.Text(data)}
      </h1>
    )
  },
  print(data, slideshow) {
    return (
      <h1 class="mb-4 flex text-balance text-center font-ex-title text-xl text-z-heading last:mb-0">
        {slideshow.Text(data)}
      </h1>
    )
  },
  entry() {
    return undefined
  },
  presenter() {
    return []
  },
})

export function title(text: Text): Content {
  return ["title", text]
}
