import { For } from "solid-js"
import { defineExt } from "../../define"
import type { Content } from "../../types"

export const ext = defineExt<readonly Content[]>()("print", "standard", {
  entry(data, exts, filter) {
    return <For each={data}>{(x) => exts.ContentEntry(x, filter)}</For>
  },
  render(data, exts) {
    return (
      <div class="h-screen w-full break-inside-avoid bg-white px-6 py-8 text-z">
        <For each={data}>{(x) => exts.ContentPrint(x)}</For>
      </div>
    )
  },
})
