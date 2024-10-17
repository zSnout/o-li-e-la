import { For } from "solid-js"
import { defineExt } from "../../lib/define"
import type { Content, Note, Slide } from "../../lib/types"

export const ext = defineExt<
  [content: readonly Content[], notes: readonly Note[]]
>()("slide", "no_pad", {
  render(data, exts) {
    return (
      <article class="size-slide relative flex bg-z-body text-2xl text-z contain-strict">
        <main class="flex w-full flex-col items-center justify-center text-center">
          <div class="w-full">
            <For each={data[0]}>{(e) => exts.ContentSlide(e)}</For>
          </div>
        </main>
      </article>
    )
  },
  entry(data, exts, filter) {
    return (
      <>
        <For each={data[0]}>{(x) => exts.ContentEntry(x, filter)}</For>
        <For each={data[1]}>{(x) => exts.NoteEntry(x, filter)}</For>
      </>
    )
  },
  presenter(data, exts) {
    return (
      <>
        <For each={data[0]}>{(x) => exts.ContentPresenter(x)}</For>
        <For each={data[1]}>{(x) => exts.NotePresenter(x)}</For>
      </>
    )
  },
})

export function defineNoPad(
  content: readonly Content[],
  notes: readonly Note[],
): Slide {
  return ["no_pad", [content, notes]]
}
