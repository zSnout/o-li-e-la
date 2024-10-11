import { For } from "solid-js"
import { defineExt } from "../../define"
import { finishAll, type Content, type Into, type Text } from "../../types"

export const ext = defineExt<readonly Text[]>()("content", "ul", {
  slide(data, exts) {
    return (
      <ul class="my-4 px-4 font-ex-eng">
        <For each={data}>
          {(item) => (
            <li class="flex items-baseline gap-4">
              <span class="inline-block size-2.5 min-w-2.5 -translate-y-0.5 rounded-full bg-z-text-dimmed group-[]/small:size-2 group-[]/small:min-w-2" />
              <span>{exts.Text(item)}</span>
            </li>
          )}
        </For>
      </ul>
    )
  },
  print(data, exts) {
    return (
      <ul class="my-4 px-4 font-ex-eng">
        <For each={data}>
          {(item) => (
            <li class="flex items-baseline gap-4">
              <span class="inline-block size-2 min-w-2 -translate-y-0.5 rounded-full bg-z-text-dimmed" />
              <span>{exts.Text(item)}</span>
            </li>
          )}
        </For>
      </ul>
    )
  },
  entry(data, exts) {
    return <For each={data}>{(x) => exts.TextEntry(x)}</For>
  },
  presenter(): undefined {},
})

export function ul(text: readonly Into<Text>[]): Content {
  return ["ul", finishAll(text)]
}
