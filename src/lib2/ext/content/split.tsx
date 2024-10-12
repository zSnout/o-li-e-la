import { For } from "solid-js"
import { clsx } from "../../clsx"
import { defineExt } from "../../define"
import type { Content } from "../../types"

export const ext = defineExt<
  [lhs: readonly Content[], rhs: readonly Content[], center: boolean]
>()("content", "split", {
  slide(data, exts) {
    return (
      <div
        class={clsx("grid w-full grid-cols-2", data[2] ? "text-center" : "")}
      >
        <div>
          <For each={data[0]}>{(e) => exts.ContentSlide(e)}</For>
        </div>
        <div>
          <For each={data[1]}>{(e) => exts.ContentSlide(e)}</For>
        </div>
      </div>
    )
  },
  print(data, exts) {
    return (
      <div
        class={clsx("grid w-full grid-cols-2", data[2] ? "text-center" : "")}
      >
        <div>
          <For each={data[0]}>{(e) => exts.ContentPrint(e)}</For>
        </div>
        <div>
          <For each={data[1]}>{(e) => exts.ContentPrint(e)}</For>
        </div>
      </div>
    )
  },
  presenter(data, exts) {
    return (
      <>
        <For each={data[0]}>{(e) => exts.ContentPresenter(e)}</For>
        <For each={data[1]}>{(e) => exts.ContentPresenter(e)}</For>
      </>
    )
  },
  entry(data, exts) {
    return (
      <>
        <For each={data[0]}>{(e) => exts.ContentEntry(e)}</For>
        <For each={data[1]}>{(e) => exts.ContentEntry(e)}</For>
      </>
    )
  },
})

export function defineSplit(
  lhs: readonly Content[],
  rhs: readonly Content[],
  center = false,
): Content {
  return ["split", [lhs, rhs, center]]
}
