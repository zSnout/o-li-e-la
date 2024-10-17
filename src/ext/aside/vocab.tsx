import { For } from "solid-js"
import { VocabVis } from "src/lib/vocab"
import { defineExt } from "../../lib/define"
import type { Aside, Vocab } from "../../lib/types"

export const ext = defineExt<readonly Vocab[]>()("aside", "vocab", {
  vocab(data, exts, proxy) {
    for (const word of data) {
      exts.VocabVocab(word, proxy, VocabVis.EX)
    }
  },
  slide(data, exts) {
    return (
      <ul class="wx-80 hx-[calc(540px_-_2rem)] my-4 flex flex-col gap-4 border-l border-z py-4 pl-6 pr-8 text-lg">
        <For each={data}>{(word) => exts.Vocab(word)}</For>
      </ul>
    )
  },
  presenter(data, exts) {
    return <For each={data}>{(word) => exts.VocabPresenter(word)}</For>
  },
  entry(data, exts, filter) {
    return <For each={data}>{(x) => exts.VocabEntry(x, filter)}</For>
  },
})

export function vocab(words: readonly Vocab[]): Aside {
  return ["vocab", words]
}
