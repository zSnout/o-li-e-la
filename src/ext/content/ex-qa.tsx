import { For } from "solid-js"
import { VocabVis } from "src/lib/vocab"
import { defineExt, unimpl } from "../../lib/define"
import type { Exts } from "../../lib/exts"
import type { Content, Many, ManyMut, TextOf, TokEng } from "../../lib/types"
import { styledEng, styledTok } from "../text/styled"

export const ext = defineExt<[q: TokEng, ...a: Many<TokEng>]>()(
  "content",
  "ex/qa",
  {
    vocab(data, exts, proxy) {
      for (const [tok, eng] of data) {
        exts.TextVocab(tok, proxy, VocabVis.EX)
        exts.TextVocab(eng, proxy, VocabVis.EX)
      }
    },
    slide: render,
    entry(data, exts, filter) {
      return (
        <For each={data.flat()}>{(text) => exts.TextEntry(text, filter)}</For>
      )
    },
    presenter(): undefined {},
    print: unimpl,
  },
)

function render(data: [q: TokEng, ...a: Many<TokEng>], exts: Exts) {
  if (data.length == 2) {
    return (
      <div class="my-4 grid grid-cols-2 gap-x-8">
        <p class="text-right font-ex-tok font-semibold">
          {exts.Text(data[0][0])}
        </p>
        <p class="font-ex-tok font-semibold">{exts.Text(data[1][0])}</p>
        <p class="text-right font-ex-eng">{exts.Text(data[0][1])}</p>
        <p class="font-ex-eng">{exts.Text(data[1][1])}</p>
      </div>
    )
  }

  return (
    <div class="my-4 flex flex-col">
      <p class="text-center font-ex-tok font-semibold">
        {exts.Text(data[0][0])}
      </p>
      <p class="text-center font-ex-eng">{exts.Text(data[0][1])}</p>
      <div class="mt-4 grid grid-cols-2 gap-x-8">
        <For each={data.slice(1)}>
          {(a) => (
            <>
              <p class="text-right font-ex-tok font-semibold">
                {exts.Text(a[0])}
              </p>
              <p class="font-ex-eng">{exts.Text(a[1])}</p>
            </>
          )}
        </For>
      </div>
    </div>
  )
}

export function qa(
  q: [tok: TextOf<"tok">, eng: TextOf<"eng">],
  a: Many<[tok: TextOf<"tok">, eng: TextOf<"eng">]>,
): Content {
  return ["ex/qa", [q, ...a]]
}

export interface NeedsEng<T> {
  eng(eng: TemplateStringsArray): T
}

export interface NeedsTok<T> {
  tok(tok: TemplateStringsArray): NeedsEng<T>
}

export interface Done extends NeedsTok<Done> {
  done(): Content
}

export type NeedsEngQuestion = NeedsEng<NeedsTok<Done>>

export function builderExQa([qTok]: TemplateStringsArray): NeedsEngQuestion {
  return {
    eng([qEng]) {
      return {
        tok([aTok]) {
          return {
            eng([aEng]) {
              const resps: ManyMut<[tok: TextOf<"tok">, eng: TextOf<"eng">]> = [
                [styledTok(aTok!), styledEng(aEng!)],
              ]

              const result: Done = {
                done() {
                  return qa([styledTok(qTok!), styledEng(qEng!)], resps)
                },
                tok([aTok]) {
                  return {
                    eng([aEng]) {
                      resps.push([styledTok(aTok!), styledEng(aEng!)])
                      return result
                    },
                  }
                },
              }
              return result
            },
          }
        },
      }
    },
  }
}
