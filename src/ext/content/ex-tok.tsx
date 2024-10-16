import { For } from "solid-js"
import { defineExt } from "../../lib/define"
import type { Content, TextOf } from "../../lib/types"
import { styledEng, styledTok } from "../text/styled"

export const ext = defineExt<[tok: TextOf<"tok">, eng: TextOf<"eng">[]]>()(
  "content",
  "ex/tok",
  {
    slide(data, exts) {
      return (
        <div class="my-4 flex flex-col items-center">
          <p class="font-ex-tok font-semibold">{exts.Text(data[0])}</p>
          <For each={data[1]}>
            {(phrase) => <p class="font-ex-eng">{exts.Text(phrase)}</p>}
          </For>
        </div>
      )
    },
    entry(data, exts, filter) {
      return (
        <>
          {exts.TextEntry(data[0], filter)}
          <For each={data[1]}>{(phrase) => exts.TextEntry(phrase, filter)}</For>
        </>
      )
    },
    presenter(): undefined {},
    print(data, exts) {
      return (
        <div class="my-4 flex flex-col items-center">
          <p class="font-ex-tok font-semibold">{exts.Text(data[0])}</p>
          <For each={data[1]}>
            {(phrase) => <p class="font-ex-eng">{exts.Text(phrase)}</p>}
          </For>
        </div>
      )
    },
  },
)

export function exTok(tok: TextOf<"tok">, eng: TextOf<"eng">[]): Content {
  return ["ex/tok", [tok, eng]]
}

export interface NeedsEng {
  eng(eng: TemplateStringsArray): Done
}

export interface Done {
  alt(eng: TemplateStringsArray): Done
  done(): Content
}

export function buildExTok([tok]: TemplateStringsArray): NeedsEng {
  return {
    eng([x]) {
      const eng = [styledEng(x!)]
      const result: Done = {
        alt([x]) {
          eng.push(styledEng(x!))
          return result
        },
        done() {
          return exTok(styledTok(tok!), eng)
        },
      }
      return result
    },
  }
}
