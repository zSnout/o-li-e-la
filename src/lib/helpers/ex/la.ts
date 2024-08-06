import type { ToContent } from "."
import * as color from "../../colors"
import type { ExampleLa, LaPhraseArrayMutable } from "../../types"

export interface Inter {
  /** Add an English translation for the last toki pona entry. */
  eng(strings: TemplateStringsArray): Eng
}

export interface Eng extends ToContent<ExampleLa> {
  /** An an alternate English translation. */
  alt(strings: TemplateStringsArray): Eng
}

/** Builds an {@link ExampleLa} object, starting from a toki pona phrase. */
export function la(t: TemplateStringsArray) {
  const tok = color.tokLa(t)

  const Inter: Inter = {
    eng(strings) {
      const eng: LaPhraseArrayMutable<"eng"> = [color.engLa(strings)]
      const Eng: Eng = {
        alt(strings) {
          eng.push(color.engLa(strings))
          return Eng
        },
        finalize() {
          return { type: "ex:la", tok, eng }
        },
      }
      return Eng
    },
  }

  return Inter
}
