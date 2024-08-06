import * as color from "../../colors"
import { text, type TextParams } from "../../text"
import type {
  AtLeastOneMutable,
  ChallengeSingleTok,
  ChallengeTok,
  PhraseArrayMutable,
  Text,
  ToContent,
} from "../../types"

export interface NeedsEngOrHint extends NeedsEng {
  /** Adds a hint to this challenge. */
  hint(...hint: TextParams): NeedsEng
}

export interface NeedsEng {
  /** Adds an English translation for the last challenge. */
  eng(strings: TemplateStringsArray): Done
}

export interface Done extends ToContent<ChallengeTok> {
  /** Adds an alternative English translation for the last challenge. */
  alt(strings: TemplateStringsArray): Done

  /** Adds another challenge. */
  tok(strings: TemplateStringsArray): NeedsEngOrHint
}

/** Builds a {@link ChallengeTok} object, starting with a toki pona string. */
export function tok(stringsTok: TemplateStringsArray): NeedsEngOrHint {
  function inner(stringsEng: TemplateStringsArray, hint?: Text): Done {
    let eng: PhraseArrayMutable<"eng"> = [color.eng(stringsEng)]

    const items: AtLeastOneMutable<ChallengeSingleTok> = [
      { tok: color.tok(stringsTok), eng, hint },
    ]

    const Done: Done = {
      finalize() {
        return { type: "ch:tok", items }
      },
      alt(strings) {
        eng.push(color.eng(strings))
        return Done
      },
      tok(stringsTok) {
        return {
          hint(...hint) {
            return {
              eng(stringsEng) {
                items.push({
                  tok: color.tok(stringsTok),
                  hint: text(...hint),
                  eng: (eng = [color.eng(stringsEng)]),
                })
                return Done
              },
            }
          },
          eng(stringsEng) {
            items.push({
              tok: color.tok(stringsTok),
              eng: (eng = [color.eng(stringsEng)]),
            })
            return Done
          },
        }
      },
    }

    return Done
  }

  return {
    hint(...hint) {
      return {
        eng(stringsEng) {
          return inner(stringsEng, text(...hint))
        },
      }
    },
    eng(stringsEng) {
      return inner(stringsEng)
    },
  }
}
