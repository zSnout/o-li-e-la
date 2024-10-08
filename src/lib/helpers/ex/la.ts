import * as color from "../../colors"
import type {
  ExampleLa,
  LaFullArrayMut,
  PhraseArrayMut,
  ToContent,
} from "../../types"

export interface Eng {
  /** Add a new English translation using la for the entry. */
  eng(strings: TemplateStringsArray): Full
}

export interface Full {
  /**
   * Add a complete, coherent sentence for the last la-based English
   * translation.
   */
  full(strings: TemplateStringsArray): Done
}

export interface Done extends Eng, Full, ToContent<ExampleLa> {}

/** Builds an {@link ExampleLa} object, starting from a toki pona phrase. */
export function la(t: TemplateStringsArray): Eng {
  const tok = color.tokLa(t)

  return {
    eng(engStrings) {
      return {
        full(fullStrings) {
          let full: PhraseArrayMut<"eng"> = [color.eng(fullStrings)]

          const eng: LaFullArrayMut<"eng"> = [
            {
              la: color.engLa(engStrings),
              full,
            },
          ]

          const done: Done = {
            eng(engStrings) {
              return {
                full(fullStrings) {
                  eng.push({
                    la: color.engLa(engStrings),
                    full: (full = [color.eng(fullStrings)]),
                  })
                  return done
                },
              }
            },
            full(strings) {
              full.push(color.eng(strings))
              return done
            },
            finalize() {
              return {
                type: "ex:la",
                tok,
                eng,
              }
            },
          }

          return done
        },
      }
    },
  }
}
