import { For } from "solid-js"
import { definePlugin } from "../../define"
import { finishAll, type Content, type Into, type Text } from "../../types"

export const plugin = definePlugin<readonly Text[]>()("content", "ul", {
  slide(data, slideshow) {
    return (
      <ul class="my-4 px-4 font-ex-eng">
        <For each={data}>
          {(item) => (
            <li class="flex items-baseline gap-4">
              <span class="inline-block size-2.5 min-w-2.5 -translate-y-0.5 rounded-full bg-z-text-dimmed group-[]/small:size-2 group-[]/small:min-w-2" />
              <span>{slideshow.Text(item)}</span>
            </li>
          )}
        </For>
      </ul>
    )
  },
  print(data, slideshow) {
    return (
      <ul class="my-4 px-4 font-ex-eng">
        <For each={data}>
          {(item) => (
            <li class="flex items-baseline gap-4">
              <span class="inline-block size-2 min-w-2 -translate-y-0.5 rounded-full bg-z-text-dimmed" />
              <span>{slideshow.Text(item)}</span>
            </li>
          )}
        </For>
      </ul>
    )
  },
  entry(): undefined {},
  presenter(): undefined {},
})

export function ul(text: readonly Into<Text>[]): Content {
  return ["ul", finishAll(text)]
}
