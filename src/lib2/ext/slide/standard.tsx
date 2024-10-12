import { For, Show } from "solid-js"
import { clsx } from "../../clsx"
import { defineExt } from "../../define"
import type { Aside, Content, Note, Slide } from "../../types"

export const ext = defineExt<
  [
    content: readonly Content[],
    notes: readonly Note[],
    aside: Aside | null,
    centered: boolean,
  ]
>()("slide", "standard", {
  render(data, exts) {
    return (
      <article class="size-slide relative flex bg-white text-2xl text-z contain-strict">
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
  entry(data, exts) {
    return (
      <>
        <For each={data[0]}>{(x) => exts.ContentEntry(x)}</For>
        <Show when={data[2]}>{exts.AsideEntry(data[2]!)}</Show>
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
