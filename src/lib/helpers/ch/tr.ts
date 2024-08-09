import * as color from "../../colors"
import { text, type TextParams } from "../../text"
import type {
  AtLeastOneMutable,
  ChallengeTranslate,
  ChallengeTranslateOne,
  PhraseArrayMutable,
  PhraseLang,
  Text,
  ToContent,
} from "../../types"

export interface NeedsAnswer {
  /** Adds a translation for the last challenge. */
  into(strings: TemplateStringsArray): Done
}

export interface NeedsAnswerOrHint extends NeedsAnswer {
  /** Adds a hint to this challenge. */
  hint(...hint: TextParams): NeedsAnswer
}

export interface Done extends ToContent<ChallengeTranslate> {
  /** Adds an alternative translation for the last challenge. */
  alt(strings: TemplateStringsArray): Done

  /** Adds a new challenge from toki pona to English. */
  tok(strings: TemplateStringsArray): NeedsAnswerOrHint

  /** Adds a new challenge from English to toki pona. */
  eng(strings: TemplateStringsArray): NeedsAnswerOrHint
}

export function create(
  stringsQ: TemplateStringsArray,
  qfn: color.TagFunction,
  afn: color.TagFunction,
  label?: Text,
): NeedsAnswerOrHint {
  function inner(stringsA: TemplateStringsArray, hint?: Text): Done {
    let fn = afn
    let a: PhraseArrayMutable<PhraseLang> = [afn(stringsA)]

    const items: AtLeastOneMutable<ChallengeTranslateOne> = [
      { q: qfn(stringsQ), a, hint },
    ]

    const Done: Done = {
      finalize() {
        return {
          type: "ch:tr",
          label,
          items,
        }
      },
      alt(strings) {
        a.push(fn(strings))
        return Done
      },
      eng(stringsQ) {
        return {
          hint(...hint) {
            return {
              into(stringsA) {
                fn = color.tok
                a = [fn(stringsA)]
                items.push({ q: color.eng(stringsQ), a, hint: text(...hint) })
                return Done
              },
            }
          },
          into(stringsA) {
            fn = color.tok
            a = [fn(stringsA)]
            items.push({ q: color.eng(stringsQ), a })
            return Done
          },
        }
      },
      tok(stringsQ) {
        return {
          hint(...hint) {
            return {
              into(stringsA) {
                fn = color.eng
                a = [fn(stringsA)]
                items.push({ q: color.tok(stringsQ), a, hint: text(...hint) })
                return Done
              },
            }
          },
          into(stringsA) {
            fn = color.eng
            a = [fn(stringsA)]
            items.push({ q: color.tok(stringsQ), a })
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
        into(strings) {
          return inner(strings, text(...hint))
        },
      }
    },
    into(strings) {
      return inner(strings)
    },
  }
}

export function tok(strings: TemplateStringsArray) {
  return create(strings, color.tok, color.eng)
}

export function eng(strings: TemplateStringsArray) {
  return create(strings, color.eng, color.tok)
}
