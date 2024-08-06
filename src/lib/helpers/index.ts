import { text, type TextParams } from "../text"
import type {
  AtLeastOne,
  Content,
  ContentArray,
  Slide,
  SlideStandard,
  Source,
  Text,
  ToContent,
  Word,
} from "../types"

export type ToContentItem = Content | ToContent<Content>
export type ToContentArray = AtLeastOne<ToContentItem>

let id = 0

export interface SlideBuilder {
  /**
   * Finalizes the slide and adds content to it.
   *
   * Alternate form of `.content()`.
   */
  (...content: ToContentArray): SlideStandard

  /**
   * Finalizes the slide and adds content to it.
   *
   * Alternate form of `()`.
   */
  content(...content: ToContentArray): SlideStandard

  /** Adds a reference to another slide. */
  ref(slide: Slide): this

  /** Adds a vocab word to this slide. */
  vocab(word: Word): this

  /** Adds a note to this slide visible in the presenter's view. */
  note(...note: TextParams): this
}

export interface SlideBuilderWithoutSource extends SlideBuilder {
  /** Marks the source of this slide. */
  source(source: Source): SlideBuilder
}

/** Builds a {@link SlideStandard} object, starting with the slide title. */
export function slide(...title: TextParams): SlideBuilderWithoutSource {
  const refs: number[] = []
  const vocab: Word[] = []
  let source: Source | undefined
  const notes: Text[] = []

  function builder(...content: ToContentArray): SlideStandard {
    return {
      id: ++id,
      title: text(...title),
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

  builder.note = (...note: TextParams) => {
    notes.push(text(...note))
    return builder
  }

  return builder
}

export * as ch from "./ch"
export * as ex from "./ex"
export { ul } from "./ul"
