import * as kind from "../kind"
import { text, type TextParams } from "../text"
import type { Word, WordKind } from "../types"
import { groups } from "./group"

export interface NeedsWord {
  /** Adds the word itself. */
  (word: TemplateStringsArray): NeedsDefn
}

export interface NeedsDefn {
  /** References another word which is related to this one. */
  seeAlso(word: TemplateStringsArray): NeedsDefn

  /** Sets the short definition of this word. */
  short(...summary: TextParams): NeedsLipa
}

export interface NeedsLipa {
  /** Sets the lipamanka description paragraph of this word. */
  lipa(...lipa: TextParams): Word

  /** Marks this word as not having a lipamanka description. */
  readonly noLipa: Word
}

function create(kind: WordKind): NeedsWord {
  return (wordRaw: TemplateStringsArray) => {
    const word = wordRaw.join("")
    const seeAlso: string[] = []
    for (const group of groups) {
      if (group.words.includes(word)) {
        for (const related of group.words) {
          if (word != related && !seeAlso.includes(related)) {
            seeAlso.push(related)
          }
        }
      }
    }
    const NeedsDefn: NeedsDefn = {
      seeAlso(wordRaw) {
        const word = wordRaw.join("")
        if (!seeAlso.includes(word)) {
          seeAlso.push(word)
        }
        return NeedsDefn
      },
      short(...short) {
        return {
          lipa(...lipa) {
            return {
              kind,
              word,
              defnShort: text(...short),
              defnLipamanka: text(...lipa),
              seeAlso,
            }
          },
          get noLipa() {
            return {
              kind,
              word,
              defnShort: text(...short),
              defnLipamanka: null,
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
