import { For, Show } from "solid-js"
import { clsx } from "../../clsx"
import { defineExt } from "../../define"
import type { Aside, Content, Slide } from "../../types"

export const ext = defineExt<{
  content: readonly Content[]
  aside?: Aside
  centered?: boolean
}>()("slide", "standard", {
  render(data, exts) {
    return (
      <article class="size-slide relative flex bg-white text-2xl text-z contain-strict">
        <main
          class={clsx(
            "w-full px-8 py-12",
            data.centered &&
              "flex flex-col items-center justify-center text-center",
          )}
        >
          <div>
            <For each={data.content}>{(e) => exts.ContentSlide(e)}</For>
          </div>
        </main>
        <Show when={data.aside}>{exts.AsideSlide(data.aside!)}</Show>
      </article>
    )
  },
  entry(data, exts) {
    const res = data.content.map((content) => exts.ContentEntry(content))
    if (data.aside) {
      res.push(exts.AsideEntry(data.aside))
    }
    return res
  },
  presenter(data, exts) {
    const res = data.content.map((content) => exts.ContentPresenter(content))
    if (data.aside) {
      res.push(exts.AsidePresenter(data.aside))
    }
    return res
  },
})

export function standard(
  content: readonly Content[],
  aside?: Aside,
  centered?: boolean,
): Slide {
  return ["standard", { content, aside, centered }]
}
