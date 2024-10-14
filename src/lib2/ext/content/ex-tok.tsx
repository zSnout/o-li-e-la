import { For } from "solid-js"
import { defineExt } from "../../define"
import type { Content, TextOf } from "../../types"
import { fmt, type FmtParams } from "../text/fmt"

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
  eng(...eng: FmtParams): Done
}

export interface Done {
  alt(...eng: FmtParams): Done
  done(): Content
}

export function buildExTok(...tok: FmtParams): NeedsEng {
  return {
    eng(...x) {
      const eng = [fmt(...x)]
      const result: Done = {
        alt(...x) {
          eng.push(fmt(...x))
          return result
        },
        done() {
          return exTok(fmt(...tok), eng)
        },
      }
      return result
    },
  }
}
