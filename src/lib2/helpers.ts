import { vocab as defineVocab } from "./ext/aside/vocab"
import { discuss as defineDiscuss } from "./ext/content/ch-discuss"
import { p as defineP } from "./ext/content/p"
import { title as defineTitle } from "./ext/content/title"
import { ul as defineUl } from "./ext/content/ul"
import { note as defineNote } from "./ext/note/p"
import { standard as defineStandard } from "./ext/slide/standard"
import { fmt, type TextParams } from "./ext/text/fmt"
import { str as defineStr } from "./ext/text/str"

import {
  finish,
  finishAll,
  type Aside,
  type Content,
  type Into,
  type Note,
  type Slide,
  type Text,
  type Vocab,
} from "./types"

export interface QSlideStandardContent {
  (...content: Into<Content>[]): Slide
  content(...content: Into<Content>[]): Slide
}

export interface QSlideStandardAside {
  aside(aside: Into<Aside>): QSlideStandardContent
  vocab(...vocab: Into<Vocab>[]): QSlideStandardContent
}

export interface QSlideStandardCenterable
  extends QSlideStandardAside,
    QSlideStandardContent {
  center(): QSlideStandardAside & QSlideStandardContent
}

export function slide(...title: TextParams): QSlideStandardCenterable {
  let aside: Aside | undefined
  let centered = false

  function content(...content: Into<Content>[]): Slide {
    return defineStandard(
      [defineTitle(fmt(...title)), ...finishAll(content)],
      aside,
      centered,
    )
  }

  content.content = content

  content.aside = (a: Into<Aside>) => {
    aside = finish(a)
    return content
  }

  content.vocab = (...vocab: Into<Vocab>[]) => {
    aside = defineVocab(finishAll(vocab))
    return content
  }

  content.center = () => {
    centered = true
    return content
  }

  return content
}

export function p(...text: TextParams): Content {
  return defineP(fmt(...text))
}

export interface Ul {
  li(...text: TextParams): Ul
  done(): Content
}

export const ul: Ul = /* @__PURE__ */ {
  done() {
    return defineUl([])
  },
  li(...text) {
    const content = [fmt(...text)]

    const result: Ul = {
      li(...text) {
        content.push(fmt(...text))
        return result
      },
      done() {
        return defineUl(content)
      },
    }

    return result
  },
}

export interface ChDiscuss {
  note(...note: TextParams): ChDiscuss
  also(...prompt: TextParams): ChDiscuss
  done(): Content
}

export function discuss(...prompt: TextParams): ChDiscuss {
  let lastNotes: Note[] = []
  const prompts: [prompt: Text, notes?: readonly Note[]][] = [
    [fmt(...prompt), lastNotes],
  ]
  const result: ChDiscuss = {
    note(...note) {
      lastNotes.push(defineNote(fmt(...note)))
      return result
    },
    also(...prompt) {
      lastNotes = []
      prompts.push([fmt(...prompt), lastNotes])
      return result
    },
    done() {
      return defineDiscuss(defineStr("Discuss:"), prompts)
    },
  }

  return result
}
