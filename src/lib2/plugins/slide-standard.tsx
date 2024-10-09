import { For, Show } from "solid-js"
import { clsx } from "../clsx"
import { definePluginByData } from "../define"
import type { Aside, Content } from "../types"

export const plugin = definePluginByData<
  "slide",
  "@slideshow",
  {
    content: readonly Content[]
    aside?: Aside
    centered?: boolean
  }
>("slide", "@slideshow", {
  render(data, slideshow) {
    return (
      <article class="size-slide flex bg-white text-2xl text-z">
        <main
          class={clsx(
            "w-full px-8 py-12",
            data.centered &&
              "flex flex-col items-center justify-center text-center",
          )}
        >
          <div>
            <For each={data.content}>{(e) => slideshow.ContentSlide(e)}</For>
          </div>
        </main>
        <Show when={data.aside}>{slideshow.AsideSlide(data.aside!)}</Show>
      </article>
    )
  },
  collect(data, slideshow) {
    const res = data.content.map((content) => slideshow.ContentCollect(content))
    if (data.aside) {
      res.push(slideshow.AsideCollect(data.aside))
    }
    return res
  },
  presenter(data, slideshow) {
    const res = data.content.map((content) =>
      slideshow.ContentPresenter(content),
    )
    if (data.aside) {
      res.push(slideshow.AsidePresenter(data.aside))
    }
    return res
  },
})
