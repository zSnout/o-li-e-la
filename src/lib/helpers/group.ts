import { text, type TextParams } from "../text"
import type { Group } from "../types"

export interface NeedsWord {
  /** Adds a word to this group. */
  add(word: TemplateStringsArray): MaybeNeedsWord
}

export interface MaybeNeedsWord extends NeedsWord {
  /** Finished this group's construction process. */
  readonly result: Group
}

export const groups: Group[] = []

export function group(...name: TextParams): NeedsWord {
  const words: string[] = []
  const MaybeNeedsWord: MaybeNeedsWord = {
    add(word) {
      words.push(word.join(""))
      return MaybeNeedsWord
    },
    get result() {
      const group: Group = {
        id: groups.length,
        name: text(...name),
        words,
      }
      groups.push(group)
      return group
    },
  }
  return MaybeNeedsWord
}
