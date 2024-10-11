import { For } from "solid-js"
import { defineExt } from "../../define"
import type { Aside, Vocab } from "../../types"

export const ext = defineExt<readonly Vocab[]>()("aside", "vocab", {
  slide(data, slideshow) {
    return (
      <ul class="wx-80 hx-[calc(540px_-_2rem)] my-4 flex flex-col gap-4 border-l border-z py-4 pl-6 pr-8 text-lg">
        <For each={data}>{(word) => slideshow.Vocab(word)}</For>
      </ul>
    )
  },
  presenter(data, slideshow) {
    return <For each={data}>{(word) => slideshow.VocabPresenter(word)}</For>
  },
  entry(): undefined {},
})

export function vocab(...words: readonly Vocab[]): Aside {
  return ["vocab", words]
}
