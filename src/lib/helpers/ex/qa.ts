import type { ToContent } from "."
import * as color from "../../colors"
import type { AtLeastOneMutable, ExampleSetQA, Translated } from "../../types"

export interface QNeedsEng {
  /** Add the English translation of the question. */
  eng(strings: TemplateStringsArray): ANeedsTok
}

export interface ANeedsTok {
  /** Add the first toki pona response. */
  tok(strings: TemplateStringsArray): ANeedsEng
}

export interface ANeedsEng {
  /** Add an English translation for the last toki pona string. */
  eng(strings: TemplateStringsArray): Done
}

export interface Done extends ToContent<ExampleSetQA> {
  /** Add an alternative answer. */
  alt(strings: TemplateStringsArray): ANeedsEng
}

/**
 * Builds an {@link ExampleSetQA} object, starting with the question in toki
 * pona.
 */
export function qa(stringsTok: TemplateStringsArray): QNeedsEng {
  return {
    eng(stringsEng) {
      const q: Translated = {
        tok: color.tok(stringsTok),
        eng: color.eng(stringsEng),
      }

      return {
        tok(stringsTok) {
          return {
            eng(stringsEng) {
              const a: AtLeastOneMutable<Translated> = [
                { tok: color.tok(stringsTok), eng: color.eng(stringsEng) },
              ]

              const Done: Done = {
                alt(stringsTok) {
                  return {
                    eng(stringsEng) {
                      a.push({
                        tok: color.tok(stringsTok),
                        eng: color.eng(stringsEng),
                      })
                      return Done
                    },
                  }
                },
                finalize() {
                  return { type: "exs:qa", q, a }
                },
              }

              return Done
            },
          }
        },
      }
    },
  }
}
