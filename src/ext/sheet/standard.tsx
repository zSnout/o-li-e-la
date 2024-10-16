import { For } from "solid-js"
import { defineExt } from "../../lib/define"
import type { Group } from "../../lib/slideshow"
import {
  finishAll,
  type Content,
  type Into,
  type Print,
  type PrintFull,
  type Vocab,
} from "../../lib/types"
import { definePrintVocabBack } from "../content/print-vocab-back"
import { definePrintVocabFront } from "../content/print-vocab-front"
import { titleRaw } from "../content/title"

export const ext = defineExt<readonly Content[]>()("print", "standard", {
  entry(data, exts, filter) {
    return <For each={data}>{(x) => exts.ContentEntry(x, filter)}</For>
  },
  render(data, exts) {
    return (
      <div class="h-screen w-full break-inside-avoid bg-white px-6 py-8 text-z">
        <For each={data}>{(x) => exts.ContentPrint(x)}</For>
      </div>
    )
  },
})

export function definePrintStandard(content: readonly Content[]): Print {
  return ["standard", content]
}

export function defineSheet(group: Group) {
  return {
    vocab(...vocab: Into<Vocab>[]) {
      return (...content: Into<Content>[]): PrintFull => {
        return [
          definePrintStandard([
            titleRaw(group.title, group.abbr, true),
            definePrintVocabFront(finishAll(vocab)),
            ...finishAll(content),
          ]),
          definePrintStandard([definePrintVocabBack(finishAll(vocab))]),
        ]
      }
    },
  }
}
