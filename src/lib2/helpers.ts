import { image as defineImage } from "./ext/aside/image"
import { vocab as defineVocab } from "./ext/aside/vocab"
import { discuss as defineDiscuss } from "./ext/content/ch-discuss"
import { p as defineP } from "./ext/content/p"
import { titleRaw as defineTitle } from "./ext/content/title"
import { ul as defineUl } from "./ext/content/ul"
import { note as defineNote } from "./ext/note/p"
import { defineSlideImage } from "./ext/slide/image"
import { standard as defineStandard } from "./ext/slide/standard"
import { fmt, type FmtParams } from "./ext/text/fmt"
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
  note(...note: FmtParams): this
  (...content: Into<Content>[]): Slide
  content(...content: Into<Content>[]): Slide
}

export interface QSlideStandardAside {
  aside(aside: Into<Aside>): QSlideStandardContent
  vocab(...vocab: Into<Vocab>[]): QSlideStandardContent
  image(...args: Parameters<typeof defineImage>): QSlideStandardContent
}

export interface QSlideStandardCenterable
  extends QSlideStandardAside,
    QSlideStandardContent {
  center(): QSlideStandardAside & QSlideStandardContent
}

export function slide(...title: FmtParams): QSlideStandardCenterable {
  const notes: Note[] = []
  let aside: Aside | undefined
  let centered = false

  const content = function (...content: Into<Content>[]): Slide {
    const inner = finishAll(content)
    if (!(title.length == 1 && title[0].length == 1 && title[0][0] == "")) {
      inner.unshift(defineTitle(fmt(...title)))
    }
    return defineStandard(inner, notes, aside, centered)
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

  content.image = (...args: Parameters<typeof defineImage>) => {
    aside = defineImage(...args)
    return content
  }

  content.note = (...note: FmtParams) => {
    notes.push(defineNote(fmt(...note)))
    return content
  }

  content.center = () => {
    centered = true
    return content
  }

  return content
}

export function p(...text: FmtParams): Content {
  return defineP(fmt(...text))
}

export interface Ul {
  li(...text: FmtParams): Ul
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
  note(...note: FmtParams): ChDiscuss
  also(...prompt: FmtParams): ChDiscuss
  done(): Content
}

export function discuss(...prompt: FmtParams): ChDiscuss {
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

export interface QSlideImage {
  note(...note: FmtParams): QSlideImage
  done(): Slide
}

export interface QSlideImageFit extends QSlideImage {
  cover(): QSlideImage
  containWhite(): QSlideImage
}

export const im = {
  src([src]: readonly string[]) {
    return {
      alt([alt]: readonly string[]): QSlideImageFit {
        let fit: "contain-white" | "cover" | undefined
        const notes: Note[] = []

        const result: QSlideImageFit = {
          done() {
            return defineSlideImage(src ?? "", alt ?? "", fit, notes)
          },
          note(...note) {
            notes.push(defineNote(fmt(...note)))
            return result
          },
          containWhite() {
            fit = "contain-white"
            return result
          },
          cover() {
            fit = "cover"
            return result
          },
        }

        return result
      },
    }
  },
}
