import * as color from "../../colors"
import { text, type TextParams } from "../../text"
import type {
  AtLeastOneMutable,
  ChallengeEng,
  ChallengeSingleEng,
  PhraseArrayMutable,
  Text,
  ToContent,
} from "../../types"

export interface NeedsEng {
  /** Adds the first challenge. */
  eng(strings: TemplateStringsArray): NeedsTokOrHint
}

export interface NeedsTokOrHint extends NeedsTok {
  /** Adds a hint to this challenge. */
  hint(...hint: TextParams): NeedsTok
}

export interface NeedsTok {
  /** Adds an toki pona translation for the last challenge. */
  tok(strings: TemplateStringsArray): Done
}

export interface Done extends ToContent<ChallengeEng> {
  /** Adds an alternative toki pona translation for the last challenge. */
  alt(strings: TemplateStringsArray): Done

  /** Adds another challenge. */
  eng(strings: TemplateStringsArray): NeedsTokOrHint
}

/** Builds a {@link ChallengeEng} object, starting with an English string. */
export function eng(stringsTok: TemplateStringsArray): NeedsTokOrHint {
  return inner(stringsTok)
}

eng.label = function (...label: TextParams): NeedsEng {
  return {
    eng(strings) {
      return inner(strings, text(...label))
    },
  }
}

function inner(stringsTok: TemplateStringsArray, label?: Text): NeedsTokOrHint {
  function inner(stringsEng: TemplateStringsArray, hint?: Text): Done {
    let tok: PhraseArrayMutable<"tok"> = [color.tok(stringsEng)]

    const items: AtLeastOneMutable<ChallengeSingleEng> = [
      { eng: color.eng(stringsTok), tok, hint },
    ]

    const Done: Done = {
      finalize() {
        return { type: "ch:eng", items, label }
      },
      alt(strings) {
        tok.push(color.tok(strings))
        return Done
      },
      eng(stringsEnd) {
        return {
          hint(...hint) {
            return {
              tok(stringsTok) {
                items.push({
                  eng: color.eng(stringsEnd),
                  hint: text(...hint),
                  tok: (tok = [color.tok(stringsTok)]),
                })
                return Done
              },
            }
          },
          tok(stringsTok) {
            items.push({
              eng: color.eng(stringsEnd),
              tok: (tok = [color.tok(stringsTok)]),
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
        tok(stringsEng) {
          return inner(stringsEng, text(...hint))
        },
      }
    },
    tok(stringsEng) {
      return inner(stringsEng)
    },
  }
}
