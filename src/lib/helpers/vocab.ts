import * as kind from "../kind"
import { text, type TextParams } from "../text"
import type { Word, WordKind } from "../types"

export interface NeedsWord {
  /** Adds the word itself. */
  (word: TemplateStringsArray): NeedsDefn
}

export interface NeedsDefn {
  /** References another word which is related to this one. */
  seeAlso(word: TemplateStringsArray): NeedsDefn

  /** Sets the short definition of this word. */
  short(...short: TextParams): NeedsLipa
}

export interface NeedsLipa {
  /** Sets the lipamanka description paragraph of this word. */
  lipa(...lipa: TextParams): Word
}

function create(kind: WordKind): NeedsWord {
  return (word: TemplateStringsArray) => {
    const seeAlso: string[] = []
    const NeedsDefn: NeedsDefn = {
      seeAlso(word) {
        seeAlso.push(word.join(""))
        return NeedsDefn
      },
      short(...short) {
        return {
          lipa(...lipa) {
            return {
              kind,
              word: word.join(""),
              defnShort: text(...short),
              defnLipamanka: text(...lipa),
              seeAlso,
            }
          },
        }
      },
    }
    return NeedsDefn
  }
}

export const content = create(kind.content)
export const particle = create(kind.particle)
export const prep = create(kind.prep)
export const preverb = create(kind.preverb)
export const semiparticle = create(kind.semiparticle)
