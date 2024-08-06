import { text } from "../text"
import type {
  AtLeastOne,
  Content,
  ContentArray,
  Slide,
  SlideStandard,
  Source,
  Text,
  TextItem,
  Word,
} from "../types"
import { pilin } from "../vocab"
import type { ToContent } from "./ex"

export type ToContentItem = Content | ToContent<Content>
export type ToContentArray = AtLeastOne<ToContentItem>

let id = 0

export interface SlideBuilder {
  (...content: ToContentArray): SlideStandard
  content(...content: ToContentArray): SlideStandard
  ref(slide: Slide): SlideBuilder
  source(source: Source): SlideBuilder
  vocab(word: Word): SlideBuilder
  note(strings: TemplateStringsArray): SlideBuilder
}

export function slide(title: TemplateStringsArray): SlideBuilder {
  const refs: number[] = []
  const vocab: Word[] = []
  let source: Source | undefined
  const notes: Text[] = []

  function builder(...content: ToContentArray): SlideStandard {
    return {
      id: ++id,
      title: text(title),
      refs,
      vocab,
      source,
      notes,
      content: content.map((x) =>
        "finalize" in x ? x.finalize() : x,
      ) as readonly Content[] as ContentArray,
    }
  }

  builder.content = builder

  builder.ref = (slide: Slide) => {
    refs.push(slide.id)
    return builder
  }

  builder.source = (s: Source) => {
    source = s
    return builder
  }

  builder.vocab = (w: Word) => {
    vocab.push(w)
    return builder
  }

  builder.note = (
    strings: TemplateStringsArray,
    ...interps: (Text | TextItem)[]
  ) => {
    notes.push(text(strings, ...interps))
    return builder
  }

  return builder
}

import * as ex from "./ex"
export * as ex from "./ex"

slide`the particle pi`
  .vocab(pilin)
  .content(ex.tok`mi wile toki tawa sina.`.eng`I li want to talk tawa to you.`)
