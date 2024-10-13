import { Show } from "solid-js"
import { clsx } from "../../clsx"
import { defineExt } from "../../define"
import type { Content, Text } from "../../types"
import { fmt, type FmtParams } from "../text/fmt"

export const ext = defineExt<
  [content: Text, index: number | null, center: boolean]
>()("content", "title", {
  slide(data, exts) {
    return (
      <h1 class="my-8 flex font-ex-title text-4xl text-z-heading first:mt-0 last:mb-0">
        <span
          class={clsx(
            "flex-1 text-balance font-ex-title",
            data[2] && "text-center",
          )}
        >
          {exts.Text(data[0])}
        </span>
        <Show when={data[1] != null}>
          <span class="font-ex-eng text-z-subtitle">#{data[1]}</span>
        </Show>
      </h1>
    )
  },
  print(data, exts) {
    return (
      <h1 class="my-4 flex text-xl text-z-heading first:mt-0 last:mb-0">
        <span class="flex-1 text-balance text-center font-ex-title">
          {exts.Text(data[0])}
        </span>
        <Show when={data[1] != null}>
          <span class="font-ex-eng text-z-subtitle">#{data[1]}</span>
        </Show>
      </h1>
    )
  },
  entry(data, exts) {
    return exts.TextEntry(data[0])
  },
  presenter(): undefined {},
})

export function titleRaw(
  text: Text,
  index: number | null = null,
  center = false,
): Content {
  return ["title", [text, index, center]]
}

export function title(...text: FmtParams): Content {
  return titleRaw(fmt(...text))
}
