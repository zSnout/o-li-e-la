import { ext as ext1 } from "./aside/image"
import { ext as ext2 } from "./aside/vocab"
import { ext as ext3 } from "./aside/vocabWithoutDefinition"
import { ext as ext4 } from "./content/ch-discuss"
import { ext as ext5 } from "./content/ch-translate"
import { ext as ext6 } from "./content/ex-aligned"
import { ext as ext7 } from "./content/ex-qa"
import { ext as ext8 } from "./content/ex-tok"
import { ext as ext9 } from "./content/la-box"
import { ext as ext10 } from "./content/p"
import { ext as ext22 } from "./content/split"
import { ext as ext11 } from "./content/title"
import { ext as ext12 } from "./content/titleIndexed"
import { ext as ext13 } from "./content/ul"
import { ext as ext14 } from "./note/p"
import { ext as ext15 } from "./slide/image"
import { ext as ext16 } from "./slide/standard"
import { ext as ext17 } from "./text/arr"
import { ext as ext18 } from "./text/fmt"
import { ext as ext19 } from "./text/str"
import { ext as ext20 } from "./text/styled"
import { ext as ext21 } from "./vocab/tokipona"

export * as aside from "./aside/00"
export * as content from "./content/00"
export * as note from "./note/00"
export * as slide from "./slide/00"
export * as text from "./text/00"
export * as vocab from "./vocab/00"

export function all() {
  return [
    ext1,
    ext2,
    ext3,
    ext4,
    ext5,
    ext6,
    ext7,
    ext8,
    ext9,
    ext10,
    ext11,
    ext12,
    ext13,
    ext14,
    ext15,
    ext16,
    ext17,
    ext18,
    ext19,
    ext20,
    ext21,
    ext22,
  ]
}
