import { text, type TextParams } from "../text"
import type {
  AnySlide,
  AtLeastOne,
  Content,
  ContentArray,
  SlideBase,
  SlideImage,
  SlideImageAspectRatio,
  SlideStandard,
  Source,
  Text,
  ToContent,
  Word,
} from "../types"

export type ToContentItem = Content | ToContent<Content>
export type ToContentArray = ToContentItem[]

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
  ref(slide: SlideBase): this

  /** Adds a note to this slide visible in the presenter's view. */
  note(...note: TextParams): this

  /** Marks the source of this slide. */
  source(source: Source): Omit<this, "source">

  /** Adds a vocab word to this slide. */
  vocab(word: Word): this

  /** Marks the image of this slide. */
  image: {
    [K in SlideImageAspectRatio]: (
      src: TemplateStringsArray,
    ) => ImgBuilderNeedsAltOrContain<this>
  }
}

export interface ImgBuilderNeedsAlt<T> {
  alt(alt: TemplateStringsArray): Omit<T, "image">
}

export interface ImgBuilderNeedsAltOrContain<T> extends ImgBuilderNeedsAlt<T> {
  contain(bg: TemplateStringsArray): ImgBuilderNeedsAlt<T>
}

export interface SlideFunction {
  /** Creates a new slide. */
  (...title: TextParams): SlideBuilder

  /** Creates a new slide with larger text. */
  suli(...title: TextParams): SlideBuilder
}

export type SlideshowFnReturn = [
  slide: SlideFunction,
  slides: readonly AnySlide[],
]

const all: AnySlide[] = []

export function slideshow(..._title: TextParams): SlideshowFnReturn {
  const slides: AnySlide[] = []

  function create(type: SlideStandard["type"]) {
    /** Builds a {@link SlideStandard} object, starting with the slide title. */
    return function (...title: TextParams): SlideBuilder {
      const refs: number[] = []
      const vocab: Word[] = []
      let source: Source | undefined
      const notes: Text[] = []
      let image: SlideImage | undefined

      function builder(...content: ToContentArray): SlideStandard {
        const slide: SlideStandard = {
          type,
          gid: all.length,
          id: slides.length,
          title: text(...title),
          refs,
          vocab,
          image,
          source,
          notes,
          content: content.map((x) =>
            "finalize" in x ? x.finalize() : x,
          ) as readonly Content[] as ContentArray,
        }

        slides.push(slide)
        all.push(slide)

        return slide
      }

      builder.content = builder

      builder.ref = (slide: SlideBase) => {
        refs.push(slide.gid)
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

      function createImg(
        aspect: SlideImageAspectRatio,
      ): SlideBuilder["image"][SlideImageAspectRatio] {
        return (src) => {
          return {
            alt(alt) {
              image = { alt: alt[0]!, aspect, src: src[0]! }
              return builder
            },
            contain([contain]) {
              return {
                alt(alt) {
                  image = {
                    alt: alt[0]!,
                    aspect,
                    src: src[0]!,
                    contain: contain!,
                  }
                  return builder
                },
              }
            },
          }
        }
      }

      builder.image = {
        half: createImg("half"),
        auto: createImg("auto"),
        square: createImg("square"),
      }

      return builder
    }
  }

  return [Object.assign(create("insa"), { suli: create("suli") }), slides]
}

export * as ch from "./ch"
export * as ex from "./ex"
export { styled } from "./styled"
export { ul } from "./ul"
export * as vocab from "./vocab"

const slidesReadonly: readonly AnySlide[] = all

export { slidesReadonly as slides }
