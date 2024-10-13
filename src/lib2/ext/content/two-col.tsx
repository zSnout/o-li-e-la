import { For } from "solid-js"
import { clsx } from "../../clsx"
import { defineExt } from "../../define"
import type { Content } from "../../types"

export const ext = defineExt<[items: Content[][], center: boolean]>()(
  "content",
  "two_col",
  {
    slide(data, exts) {
      return (
        <div
          class={clsx(
            "grid w-full flex-1 grid-cols-2 gap-x-4 gap-y-[0.5625rem]",
            data[1] ? "text-center" : "",
          )}
        >
          <For each={data[0]}>
            {(e) => (
              <div>
                <For each={e}>{(e) => exts.ContentSlide(e)}</For>
              </div>
            )}
          </For>
        </div>
      )
    },
    print(data, exts) {
      return (
        <div
          class={clsx(
            "grid w-full grid-cols-2 gap-4",
            data[1] ? "text-center" : "",
          )}
        >
          <For each={data[0]}>
            {(e) => (
              <div>
                <For each={e}>{(e) => exts.ContentPrint(e)}</For>
              </div>
            )}
          </For>
        </div>
      )
    },
    presenter(data, exts) {
      return (
        <For each={data[0]}>
          {(e) => <For each={e}>{(e) => exts.ContentPresenter(e)}</For>}
        </For>
      )
    },
    entry(data, exts, filter) {
      return (
        <For each={data[0]}>
          {(e) => <For each={e}>{(e) => exts.ContentEntry(e, filter)}</For>}
        </For>
      )
    },
  },
)

export function defineTwoCol(blocks: Content[][], center = false): Content {
  return ["two_col", [blocks, center]]
}
