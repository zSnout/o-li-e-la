import { For } from "solid-js"
import { defineExt } from "../../lib/define"
import { VocabVis, type Aside, type Vocab } from "../../lib/types"

export const ext = defineExt<readonly Vocab[]>()("aside", "vocab_review", {
  vocab(data, exts, proxy) {
    for (const word of data) {
      exts.VocabVocab(word, proxy, VocabVis.EX)
    }
  },
  slide(data, exts) {
    return (
      <div class="wx-80 hx-[calc(540px_-_2rem)] my-4 flex flex-col border-l border-z py-4 pl-6 pr-8 text-lg">
        <table>
          <tbody>
            <For
              each={data}
              fallback={
                <tr>
                  <td class="font-ex-eng italic text-z-subtitle">
                    No vocabulary taught in this section.
                  </td>
                </tr>
              }
            >
              {(word) => (
                <tr>
                  <td class="pr-4 font-ex-eng">
                    <span class="font-semibold text-z-heading">
                      {exts.VocabPartWord(word)}
                    </span>
                  </td>
                  <td class="font-ex-eng text-z">
                    {exts.VocabPartDefnShort(word)}
                  </td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </div>
    )
  },
  presenter(data, exts) {
    return <For each={data}>{(word) => exts.VocabPresenter(word)}</For>
  },
  entry(data, exts, filter) {
    return <For each={data}>{(x) => exts.VocabEntry(x, filter)}</For>
  },
})

export function defineVocabReview(words: readonly Vocab[]): Aside {
  return ["vocab_review", words]
}
