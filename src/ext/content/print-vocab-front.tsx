import { For } from "solid-js"
import { defineExt, unimpl } from "../../lib/define"
import type { Content, Vocab } from "../../lib/types"

export const ext = defineExt<readonly Vocab[]>()(
  "content",
  "print-vocab-front",
  {
    entry: unimpl,
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
