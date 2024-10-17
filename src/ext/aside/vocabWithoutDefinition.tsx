import { For } from "solid-js"
import { defineExt } from "../../lib/define"
import type { Aside, Vocab } from "../../lib/types"

export const ext = defineExt<readonly Vocab[]>()("aside", "vocab_no_defn", {
  vocab() {
    // TODO: `VocabWithoutDefinition` could theoretically include vocab words in it
  },
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
