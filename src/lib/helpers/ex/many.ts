import * as color from "../../colors"
import type {
  AtLeastOneMutable,
  ExampleSetAligned,
  ToContent,
  Translated,
} from "../../types"

export interface NeedsEng {
  /** Add an English translation to the last toki pona entry. */
  eng(strings: TemplateStringsArray): Done
}

export interface Done extends ToContent<ExampleSetAligned> {
  /** Add another item to the list. */
  tok(strings: TemplateStringsArray): NeedsEng
}

/** Builds an {@link ExampleSetAligned} object, starting with a toki pona string. */
export function align(stringsTok: TemplateStringsArray): NeedsEng {
  return {
    eng(stringsEng) {
      const entries: AtLeastOneMutable<Translated> = [
        {
          tok: color.tok(stringsTok),
          eng: color.eng(stringsEng),
        },
      ]

      const Done: Done = {
        tok(stringsTok) {
          return {
            eng(stringsEng) {
              entries.push({
                tok: color.tok(stringsTok),
                eng: color.eng(stringsEng),
              })
              return Done
            },
          }
        },
        finalize() {
          return { type: "exs:aligned", entries }
        },
      }

      return Done
    },
  }
}
