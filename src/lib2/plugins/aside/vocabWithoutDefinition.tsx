import { For } from "solid-js"
import { definePlugin } from "../../define"
import type { Aside, Vocab } from "../../types"

export const plugin = definePlugin<readonly Vocab[]>()(
  "aside",
  "vocab_no_defn",
  {
    slide(data, slideshow) {
      return (
        <ul class="wx-80 hx-[calc(540px_-_2rem)] my-4 flex flex-col gap-2 border-l border-z py-4 pl-6 pr-8 text-lg">
          <For each={data}>
            {(word) => slideshow.VocabWithoutDefinition(word)}
          </For>
        </ul>
      )
    },
    presenter(data, slideshow) {
      return <For each={data}>{(word) => slideshow.VocabPresenter(word)}</For>
    },
    entry(): undefined {},
  },
)

export function vocabWithoutDefinition(...words: readonly Vocab[]): Aside {
  return ["vocab_no_defn", words]
}
