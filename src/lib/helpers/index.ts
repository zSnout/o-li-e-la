import { text, type TextParams } from "../text"
import type {
  AnySlide,
  Content,
  ContentArray,
  SlideBase,
  SlideImage,
  SlideImageAspectRatio,
  SlideReview,
  Slideshow,
  SlideStandard,
  Source,
  Text,
  ToContent,
  Word,
} from "../types"

const DRAFTS = new URL(location.href).searchParams.get("drafts")
const FILTER = new URL(location.href).searchParams.get("filter")

function shouldShowSlide(isDraft: boolean, isReview: boolean) {
  return (
    (DRAFTS == "only" ? isDraft
    : DRAFTS != null ? true
    : !isDraft) &&
    (FILTER == "review" ? isReview
    : FILTER == "content" ? !isReview
    : true)
  )
}

export type ToContentItem = Content | ToContent<Content>
export type ToContentArray = ToContentItem[]

export interface SlideBuilderVocab<T> {
  (...words: Word[]): T
  noDefn(...words: Word[]): T
  noteOnly(...words: Word[]): T
}

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
  vocab: SlideBuilderVocab<this>

  /** Marks the image of this slide. */
  image: {
    [K in SlideImageAspectRatio]: (
      src: TemplateStringsArray,
    ) => ImgBuilder<this>
  }
}

export interface ImgBuilder<T> {
  alt(alt: TemplateStringsArray): Omit<T, "image">
  contain(bg: TemplateStringsArray): Omit<this, "contain">
}

export interface SlideFunction {
  /** Creates a new slide. */
  (...title: TextParams): SlideBuilder

  /** Creates a new slide with larger text. */
  suli(...title: TextParams): SlideBuilder
}

export type SlideshowFnReturn = [
  SlideFunction,
  {
    slides: readonly AnySlide[]
    createReview(...title: TextParams): {
      slide(...content: ToContentArray): {
        sheet(...content: ToContentArray): void
      }
    }
  },
]

const all: AnySlide[] = []

function createSlideshowFn(draft: boolean) {
  return function (index: number) {
    return (..._title: TextParams): SlideshowFnReturn => {
      const slides: AnySlide[] = []

      const slideshow: Slideshow = {
        title: text(..._title),
        slides,
      }

      function create(suli: boolean) {
        /** Builds a {@link SlideStandard} object, starting with the slide title. */
        return function (...title: TextParams): SlideBuilder {
          const refs: number[] = []
          const vocab: Word[] = []
          const vocabNoDefn: Word[] = []
          const vocabNoteOnly: Word[] = []
          let source: Source | undefined
          const notes: Text[] = []
          let image: SlideImage | undefined

          function builder(...content: ToContentArray): SlideStandard {
            const slide: SlideStandard = {
              type: "insa",
              suli,
              gid: all.length,
              id: slides.length,
              title: text(...title),
              refs,
              vocab: vocab.sort((a, b) => (a.word < b.word ? -1 : 1)),
              vocabNoDefn: vocabNoDefn.sort((a, b) =>
                a.word < b.word ? -1 : 1,
              ),
              vocabNoteOnly: vocabNoteOnly.sort((a, b) =>
                a.word < b.word ? -1 : 1,
              ),
              image,
              source,
              notes,
              content: content.map((x) =>
                "finalize" in x ? x.finalize() : x,
              ) as readonly Content[] as ContentArray,
            }

            slides.push(slide)
            if (shouldShowSlide(draft, false)) {
              all.push(slide)
            }

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

          function v(...words: Word[]) {
            vocab.push(...words)
            return builder
          }

          v.noDefn = (...words: Word[]) => {
            vocabNoDefn.push(...words)
            return builder
          }

          v.noteOnly = (...words: Word[]) => {
            vocabNoteOnly.push(...words)
            return builder
          }

          builder.vocab = v

          builder.note = (...note: TextParams) => {
            notes.push(text(...note))
            return builder
          }

          function createImg(
            aspect: SlideImageAspectRatio,
          ): SlideBuilder["image"][SlideImageAspectRatio] {
            return (src) => {
              let c: string | undefined
              const obj: ImgBuilder<SlideBuilder> = {
                alt(alt) {
                  image = {
                    alt: alt[0]!,
                    aspect,
                    src: src[0]!,
                    contain: c,
                  }
                  return builder
                },
                contain([contain]) {
                  c = contain
                  return obj
                },
              }
              return obj
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

      slideshowsMut.push(slideshow)

      return [
        Object.assign(create(false), { suli: create(true) }),
        {
          slides,
          createReview(...title) {
            return {
              slide(...slideContent) {
                return {
                  sheet(...sheet) {
                    const slide: SlideReview = {
                      index,
                      type: "pini",
                      gid: all.length,
                      id: slides.length,
                      contentSlide: slideContent.map((x) =>
                        "finalize" in x ? x.finalize() : x,
                      ) as readonly Content[] as ContentArray,
                      contentSheet: sheet.map((x) =>
                        "finalize" in x ? x.finalize() : x,
                      ) as readonly Content[] as ContentArray,
                      sources: slides
                        .map((x) => x.type == "insa" && x.source)
                        .filter((x) => !!x),
                      titleEng: text(...title),
                      vocab: slides
                        .map((x) => x.type == "insa" && x.vocab)
                        .filter((x) => !!x)
                        .flat()
                        .filter(
                          (x, i, a) =>
                            a.findIndex((y) => y.word == x.word) == i,
                        )
                        .sort((a, b) => (a.word < b.word ? -1 : 1))
                        .sort((a, b) =>
                          a.defnLipamanka && !b.defnLipamanka ? -1
                          : !a.defnLipamanka && b.defnLipamanka ? 1
                          : 0,
                        ),
                      titles: slides
                        .map((x) => x.type == "insa" && x.title)
                        .filter((x) => !!x),
                    }

                    slides.push(slide)
                    if (shouldShowSlide(draft, true)) {
                      all.push(slide)
                    }
                  },
                }
              },
            }
          },
        },
      ]
    }
  }
}

export const slideshow = Object.assign(createSlideshowFn(false), {
  draft: createSlideshowFn(true),
})

export * as ch from "./ch"
export * as ex from "./ex"
export { ul } from "./ul"
export * as vocab from "./vocab"

const slideshowsMut: Slideshow[] = []
const slidesReadonly: readonly AnySlide[] = all
const slideshowsReadonly: readonly Slideshow[] = slideshowsMut

export { slidesReadonly as slides, slideshowsReadonly as slideshows }
