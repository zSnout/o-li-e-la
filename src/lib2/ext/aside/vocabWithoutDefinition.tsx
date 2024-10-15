import { For } from "solid-js"
import { defineExt } from "../../define"
import type { Aside, Vocab } from "../../types"

export const ext = defineExt<readonly Vocab[]>()("aside", "vocab_no_defn", {
  slide(data, exts) {
    return (
      <ul class="wx-80 hx-[calc(540px_-_2rem)] my-4 flex flex-col gap-2 border-l border-z py-4 pl-6 pr-8 text-lg">
        <For each={data}>{(word) => exts.VocabWithoutDefinition(word)}</For>
      </ul>
    )
  },
  presenter(data, exts) {
    return <For each={data}>{(word) => exts.VocabPresenter(word)}</For>
  },
  entry(): undefined {},
})

export function vocabWithoutDefinition(words: readonly Vocab[]): Aside {
  return ["vocab_no_defn", words]
}
