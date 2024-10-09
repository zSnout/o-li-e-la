import { untrack } from "solid-js"
import { clsx } from "../../lib/clsx"
import { definePlugin } from "../define"
import type { Text } from "../types"

export const plugin = definePlugin("text", "fmt", {
  render(
    data: {
      b: boolean
      i: boolean
      u: boolean
      x: boolean
      content: Text
    },
    slideshow,
  ) {
    return (
      <span
        class={clsx(
          data.b && "font-semibold text-z-heading",
          data.i && "italic",
          data.u && "underline underline-offset-2",
          data.x && "line-through",
        )}
      >
        {untrack(() => slideshow.Text(data.content))}
      </span>
    )
  },
})
