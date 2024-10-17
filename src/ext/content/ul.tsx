import { For, type JSX } from "solid-js"
import { VocabVis } from "src/lib/vocab"
import { defineExt } from "../../lib/define"
import type { Exts } from "../../lib/exts"
import { finishAll, type Content, type Into, type Text } from "../../lib/types"

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
  vocab(data, exts, proxy) {
    for (const li of data) {
      exts.TextVocab(li, proxy, VocabVis.DESC)
    }
  },
  slide(data, exts) {
    return UlInner(data, exts, () => (
      <span class="inline-block size-2.5 min-w-2.5 -translate-y-0.5 rounded-full bg-z-text-dimmed [-webkit-print-color-adjust:exact] [print-color-adjust:exact] group-[]/small:size-2 group-[]/small:min-w-2" />
    ))
  },
  print(data, exts) {
    return UlInner(data, exts, () => (
      <span class="inline-block size-2 min-w-2 max-w-2 -translate-y-0.5 rounded-full bg-z-text-dimmed [-webkit-print-color-adjust:exact] [print-color-adjust:exact]" />
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
