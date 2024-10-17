import { For } from "solid-js"
import { VocabVis } from "src/lib/vocab"
import { defineExt } from "../../lib/define"
import type { Content, TextOf, TokEng } from "../../lib/types"
import { styledEng, styledTok } from "../text/styled"

export const ext = defineExt<TokEng[]>()("content", "ex/aligned", {
  vocab(data, exts, proxy) {
    for (const [tok, eng] of data) {
      exts.TextVocab(tok, proxy, VocabVis.EX)
      exts.TextVocab(eng, proxy, VocabVis.EX)
    }
  },
  slide(data, exts) {
    return (
      <div class="my-4 grid grid-cols-2 gap-x-8">
        <For each={data}>
          {(entry) => (
            <>
              <p class="text-right font-ex-tok font-semibold">
                {exts.Text(entry[0])}
              </p>
              <p class="font-ex-eng">{exts.Text(entry[1])}</p>
            </>
          )}
        </For>
      </div>
    )
  },
  entry(data, exts, filter) {
    return (
      <For each={data}>
        {(entry) => (
          <>
            {exts.TextEntry(entry[0], filter)}
            {exts.TextEntry(entry[1], filter)}
          </>
        )}
      </For>
    )
  },
  presenter(): undefined {},
  print(data, exts) {
    return (
      <div class="my-4 grid grid-cols-2 gap-x-8">
        <For each={data}>
          {(entry) => (
            <>
              <p class="text-right font-ex-tok font-semibold">
                {exts.Text(entry[0])}
              </p>
              <p class="font-ex-eng">{exts.Text(entry[1])}</p>
            </>
          )}
        </For>
      </div>
    )
  },
})

export function aligned(items: TokEng[]): Content {
  return ["ex/aligned", items]
}

export interface NeedsEng {
  eng(text: TemplateStringsArray): Done
}

export interface Done {
  tok(text: TemplateStringsArray): NeedsEng
  done(): Content
}

export function builderAligned([tok]: TemplateStringsArray): NeedsEng {
  return {
    eng([eng]) {
      const items: [TextOf<"tok">, TextOf<"eng">][] = [
        [styledTok(tok!), styledEng(eng!)],
      ]
      const result: Done = {
        done() {
          return aligned(items)
        },
        tok([tok]) {
          return {
            eng([eng]) {
              items.push([styledTok(tok!), styledEng(eng!)])
              return result
            },
          }
        },
      }
      return result
    },
  }
}
