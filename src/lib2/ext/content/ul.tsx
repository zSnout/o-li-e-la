import { For, type JSX } from "solid-js"
import { defineExt } from "../../define"
import type { Exts } from "../../exts"
import { finishAll, type Content, type Into, type Text } from "../../types"

function UlInner(data: readonly Text[], exts: Exts, Marker: () => JSX.Element) {
  return (
    <ul class="my-4 px-4 font-ex-eng first:mt-0 last:mb-0">
      <For each={data}>
        {(item) => (
          <li class="flex items-baseline gap-4">
            <Marker />
            <span>{exts.Text(item)}</span>
          </li>
        )}
      </For>
    </ul>
  )
}

export const ext = defineExt<readonly Text[]>()("content", "ul", {
  slide(data, exts) {
    return UlInner(data, exts, () => (
      <span class="inline-block size-2.5 min-w-2.5 -translate-y-0.5 rounded-full bg-z-text-dimmed group-[]/small:size-2 group-[]/small:min-w-2" />
    ))
  },
  print(data, exts) {
    return UlInner(data, exts, () => (
      <span class="inline-block size-2 min-w-2 -translate-y-0.5 rounded-full bg-z-text-dimmed" />
    ))
  },
  entry(data, exts, filter) {
    return <For each={data}>{(x) => exts.TextEntry(x, filter)}</For>
  },
  presenter(): undefined {},
})

export function ul(text: readonly Into<Text>[]): Content {
  return ["ul", finishAll(text)]
}
