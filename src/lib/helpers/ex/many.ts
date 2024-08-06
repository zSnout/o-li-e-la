import * as color from "../../colors"
import type {
  AtLeastOneMutable,
  ExampleSetMany,
  ToContent,
  Translated,
} from "../../types"

export interface NeedsEng {
  /** Add an English translation to the last toki pona entry. */
  eng(strings: TemplateStringsArray): Done
}

export interface Done extends ToContent<ExampleSetMany> {
  /** Add another item to the list. */
  tok(strings: TemplateStringsArray): NeedsEng
}

/** Builds an {@link ExampleSetMany} object, starting with a toki pona string. */
export function many(stringsTok: TemplateStringsArray): NeedsEng {
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
          return { type: "exs:many", entries }
        },
      }

      return Done
    },
  }
}

/**
 * Builds an uncolored {@link ExampleSetMany} object, starting with a toki pona
 * string.
 */
many.plain = function (stringsTok: TemplateStringsArray): NeedsEng {
  return {
    eng(stringsEng) {
      const entries: AtLeastOneMutable<Translated> = [
        {
          tok: color.ptok(stringsTok),
          eng: color.peng(stringsEng),
        },
      ]

      const Done: Done = {
        tok(stringsTok) {
          return {
            eng(stringsEng) {
              entries.push({
                tok: color.ptok(stringsTok),
                eng: color.peng(stringsEng),
              })
              return Done
            },
          }
        },
        finalize() {
          return { type: "exs:many", entries }
        },
      }

      return Done
    },
  }
}
