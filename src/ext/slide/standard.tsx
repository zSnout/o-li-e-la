import { For, Show } from "solid-js"
import { clsx } from "../../lib/clsx"
import { defineExt } from "../../lib/define"
import type { Aside, Content, Note, Slide } from "../../lib/types"

export const ext = defineExt<
  [
    content: readonly Content[],
    notes: readonly Note[],
    aside: Aside | null,
    centered: boolean,
  ]
>()("slide", "standard", {
  vocab(data, exts, proxy) {
    for (const content of data[0]) {
      exts.ContentVocab(content, proxy)
    }
    for (const note of data[1]) {
      exts.NoteVocab(note, proxy)
    }
    if (data[2]) {
      exts.AsideVocab(data[2], proxy)
    }
  },
  render(data, exts) {
    return (
      <article class="size-slide relative flex bg-z-body text-2xl text-z contain-strict">
        <main
          class={clsx(
            "w-full px-8 py-12",
            data[3] && "flex flex-col items-center justify-center text-center",
          )}
        >
          <div>
            <For each={data[0]}>{(e) => exts.ContentSlide(e)}</For>
          </div>
        </main>
        <Show when={data[2]}>{exts.AsideSlide(data[2]!)}</Show>
      </article>
    )
  },
  entry(data, exts, filter) {
    return (
      <>
        <For each={data[0]}>{(x) => exts.ContentEntry(x, filter)}</For>
        <Show when={data[2]}>{exts.AsideEntry(data[2]!, filter)}</Show>
        <For each={data[1]}>{(x) => exts.NoteEntry(x, filter)}</For>
      </>
    )
  },
  presenter(data, exts) {
    return (
      <>
        <For each={data[0]}>{(x) => exts.ContentPresenter(x)}</For>
        <For each={data[1]}>{(x) => exts.NotePresenter(x)}</For>
        <Show when={data[2]}>{exts.AsidePresenter(data[2]!)}</Show>
      </>
    )
  },
})

export function standard(
  content: readonly Content[],
  notes: readonly Note[],
  aside?: Aside,
  centered?: boolean,
): Slide {
  return ["standard", [content, notes, aside ?? null, !!centered]]
}
