import type { ToContent } from "."
import * as color from "../../colors"
import type { ExampleTok, Phrase, PhraseArrayMutable } from "../../types"

export interface Inter {
  /** Adds an intermediate English representation. */
  inter(strings: TemplateStringsArray): Inter

  /** Adds the final English translation. */
  eng(strings: TemplateStringsArray): Eng
}

export interface Eng extends ToContent<ExampleTok> {
  /** Adds an alternative English translation. */
  alt(strings: TemplateStringsArray): Eng
}

/** Builds an {@link ExampleTok} object, starting with a string in toki pona. */
export function tok(t: TemplateStringsArray) {
  const tok = color.tok(t)

  const inter: Phrase<"eng">[] = []

  const Inter: Inter = {
    inter(strings) {
      inter.push(color.eng(strings))
      return Inter
    },
    eng(strings) {
      const eng: PhraseArrayMutable<"eng"> = [color.eng(strings)]
      const Eng: Eng = {
        alt(strings) {
          eng.push(color.eng(strings))
          return Eng
        },
        finalize() {
          return { type: "ex:tok", tok, inter, eng }
        },
      }
      return Eng
    },
  }

  return Inter
}
