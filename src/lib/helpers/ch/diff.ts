import { tok } from "../../colors"
import { text, type TextParams } from "../../text"
import type {
  AtLeastOneMutable,
  ChallengeExplainDifference,
  ChallengeExplainDifferenceOne,
  Text,
  ToContent,
} from "../../types"

export interface NeedsSecondItem {
  /** Adds the second item to be compared. */
  against(strings: TemplateStringsArray): NeedsExplanation
}

export interface NeedsExplanation {
  /** Adds the primary explanation of the difference between the two items. */
  explain(...text: TextParams): Done
}

export interface Done extends ToContent<ChallengeExplainDifference> {
  /** Adds an alternative explanation. */
  alt(...text: TextParams): Done

  /** Adds the first of a pair of phrases to be compared. */
  also(strings: TemplateStringsArray): NeedsSecondItem
}

export function diff(stringsA: TemplateStringsArray): NeedsSecondItem {
  return {
    against(stringsB) {
      return {
        explain(...explanation) {
          let expls: AtLeastOneMutable<Text> = [text(...explanation)]

          const items: AtLeastOneMutable<ChallengeExplainDifferenceOne> = [
            { a: tok(stringsA), b: tok(stringsB), explanation: expls },
          ]

          const Done: Done = {
            finalize() {
              return { type: "ch:diff", items }
            },
            also(stringsA) {
              return {
                against(stringsB) {
                  return {
                    explain(...explanation) {
                      items.push({
                        a: tok(stringsA),
                        b: tok(stringsB),
                        explanation: (expls = [text(...explanation)]),
                      })
                      return Done
                    },
                  }
                },
              }
            },
            alt(...explanation) {
              expls.push(text(...explanation))
              return Done
            },
          }

          return Done
        },
      }
    },
  }
}
