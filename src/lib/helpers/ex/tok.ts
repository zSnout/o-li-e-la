import * as color from "../../colors"
import type { ExampleTok, PhraseArrayMutable, ToContent } from "../../types"

export interface NeedsEng {
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

  const Eng: NeedsEng = {
    eng(strings) {
      const eng: PhraseArrayMutable<"eng"> = [color.eng(strings)]
      const Eng: Eng = {
        alt(strings) {
          eng.push(color.eng(strings))
          return Eng
        },
        finalize() {
          return { type: "ex:tok", tok, eng }
        },
      }
      return Eng
    },
  }

  return Eng
}
