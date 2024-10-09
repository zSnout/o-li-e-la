import { For, untrack } from "solid-js"
import { definePlugin } from "../define"
import type { Text } from "../types"

export const plugin = definePlugin("text", "arr", {
  render(data: readonly Text[], slideshow) {
    return <For each={data}>{(x) => untrack(() => slideshow.Text(x))}</For>
  },
})
