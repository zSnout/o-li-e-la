import { clsx } from "../../../lib/clsx"
import { defineExt } from "../../define"
import type { Text } from "../../types"

export const ext = defineExt<{
  b: boolean
  i: boolean
  u: boolean
  x: boolean
  content: Text
}>()("text", "fmt", {
  render(data, slideshow) {
    return (
      <span
        class={clsx(
          data.b && "font-semibold text-z-heading",
          data.i && "italic",
          data.u && "underline underline-offset-2",
          data.x && "line-through",
        )}
      >
        {slideshow.Text(data.content)}
      </span>
    )
  },
})

export function fmt(
  text: Text,
  {
    b = false,
    i = false,
    u = false,
    x = false,
  }: {
    b?: boolean
    i?: boolean
    u?: boolean
    x?: boolean
  },
): Text {
  return ["fmt", { text, b, i, u, x }]
}
