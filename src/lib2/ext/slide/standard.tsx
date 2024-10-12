import { For, Show } from "solid-js"
import { clsx } from "../../clsx"
import { defineExt } from "../../define"
import type { Aside, Content, Slide } from "../../types"

export const ext = defineExt<
  [content: readonly Content[], aside: Aside | null, centered: boolean]
>()("slide", "standard", {
  render(data, exts) {
    return (
      <article class="size-slide relative flex bg-white text-2xl text-z contain-strict">
        <main
          class={clsx(
            "w-full px-8 py-12",
            data[2] && "flex flex-col items-center justify-center text-center",
          )}
        >
          <div>
            <For each={data[0]}>{(e) => exts.ContentSlide(e)}</For>
          </div>
        </main>
        <Show when={data[1]}>{exts.AsideSlide(data[1]!)}</Show>
      </article>
    )
  },
  entry(data, exts) {
    const res = data[0].map((content) => exts.ContentEntry(content))
    if (data[1]) {
      res.push(exts.AsideEntry(data[1]))
    }
    return res
  },
  presenter(data, exts) {
    const res = data[0].map((content) => exts.ContentPresenter(content))
    if (data[1]) {
      res.push(exts.AsidePresenter(data[1]))
    }
    return res
  },
})

export function standard(
  content: readonly Content[],
  aside?: Aside,
  centered?: boolean,
): Slide {
  return ["standard", [content, aside ?? null, !!centered]]
}
