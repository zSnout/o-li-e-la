import { For } from "solid-js"
import { defineExt, unimpl } from "../../lib/define"
import type { Content, Vocab } from "../../lib/types"

export const ext = defineExt<readonly Vocab[]>()(
  "content",
  "print-vocab-back",
  {
    entry: unimpl,
    presenter: unimpl,
    slide: unimpl,
    print(data, exts) {
      return (
        <div class="grid grid-cols-[auto,1fr] items-baseline gap-x-4">
          <For
            each={data}
            fallback={
              <p class="col-span-2 font-ex-eng italic text-z-subtitle">
                This sheet does not include any vocabulary.
              </p>
            }
          >
            {(word) => (
              <>
                <p class="font-bold text-z-heading">
                  <span class="inline-block min-w-6">
                    {exts.VocabPartIcon(word)}{" "}
                  </span>
                  {exts.VocabPartWord(word)}
                </p>
                <p class="font-ex-eng">{exts.VocabPartDefnShort(word)}</p>

                <p class="col-span-2 line-clamp-3 pl-6 font-ex-eng text-xs text-z-subtitle">
                  {exts.VocabPartDefnLong(word)}
                </p>
              </>
            )}
          </For>
        </div>
      )
    },
  },
)

export function definePrintVocabBack(vocab: readonly Vocab[]): Content {
  return ["print-vocab-back", vocab]
}
