import { text, type TextParams } from "../../text"
import type {
  AtLeastOneMutable,
  ChallengeDiscuss,
  ChallengeDiscussOnePrompt,
  Text,
  ToContent,
} from "../../types"

export interface NeedsPrompt {
  /** Adds a prompt to be discussed. */
  prompt(...prompt: TextParams): Done
}

export interface Done extends ToContent<ChallengeDiscuss>, NeedsPrompt {
  /** Adds a note to the last prompt. */
  notePromptSpecific(...note: TextParams): Done

  /** Adds a note to this discussion as a whole. */
  noteOverall(...note: TextParams): DoneAndNonextendable
}

export interface DoneAndNonextendable extends ToContent<ChallengeDiscuss> {
  noteOverall(...note: TextParams): DoneAndNonextendable
}

function inner(prompt: Text, label?: Text): Done {
  let global: Text[] = []
  let notes: Text[] = []

  const items: AtLeastOneMutable<ChallengeDiscussOnePrompt> = [
    { prompt, notes },
  ]

  const Done: Done = {
    finalize() {
      return { type: "ch:discuss", items, label }
    },
    prompt(...prompt) {
      items.push({
        prompt: text(...prompt),
        notes: (notes = []),
      })
      return Done
    },
    notePromptSpecific(...note) {
      notes.push(text(...note))
      return Done
    },
    noteOverall(...note) {
      global.push(text(...note))
      return Done
    },
  }

  return Done
}

/** Builds a {@link ChallengeDiscuss} starting from an initial prompt. */
export function discuss(...prompt: TextParams) {
  return inner(text(...prompt))
}

/** Builds a {@link ChallengeDiscuss} with a given label. */
discuss.label = function (...label: TextParams): NeedsPrompt {
  return {
    prompt(...prompt) {
      return inner(text(...prompt), text(...label))
    },
  }
}
