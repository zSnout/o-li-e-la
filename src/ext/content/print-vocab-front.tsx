import { For } from "solid-js"
import { defineExt, unimpl } from "../../lib/define"
import { VocabVis, type Content, type Vocab } from "../../lib/types"

export const ext = defineExt<readonly Vocab[]>()(
  "content",
  "print-vocab-front",
  {
    vocab(data, exts, proxy) {
      for (const vocab of data) {
        exts.VocabVocab(vocab, proxy, VocabVis.EX)
      }
    },
    entry(): undefined {},
    presenter: unimpl,
    slide: unimpl,
    print(data, exts) {
      return (
        <div class="grid grid-cols-[auto,1fr] items-baseline gap-x-4">
          <For each={data}>
            {(word) => (
              <>
                <p class="font-bold text-z-heading">
                  {exts.VocabPartIcon(word)} {exts.VocabPartWord(word)}
                </p>
                <p class="font-ex-eng">{exts.VocabPartDefnShort(word)}</p>
              </>
            )}
          </For>
        </div>
      )
    },
  },
)

export function definePrintVocabFront(vocab: readonly Vocab[]): Content {
  return ["print-vocab-front", vocab]
}
