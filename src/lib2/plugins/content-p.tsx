import { untrack } from "solid-js"
import { definePlugin } from "../define"
import type { Text } from "../types"

export const plugin = definePlugin("content", "p", {
  slide(data: { content: Text }, slideshow) {
    return untrack(() => slideshow.Text(data.content))
  },
  sheet(data: { content: Text }, slideshow) {
    return untrack(() => slideshow.Text(data.content))
  },
  presenter(data: { content: Text }, slideshow) {
    return []
  },
})
