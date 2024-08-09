import type { AtLeastOne, Content, Styled, ToContent } from "../types"

export interface StyledBuilder {
  /** Sets the vertical margin of this element. */
  my(my: "auto"): Omit<this, "my">

  /** Sets the font size of this element. */
  size(size: "xl"): Omit<this, "size">

  /** Finalizes this element with content. */
  content(...content: AtLeastOne<Content | ToContent<Content>>): Styled
}

export function styled(): StyledBuilder {
  let my: Styled["my"]
  let size: Styled["size"]

  const builder: StyledBuilder = {
    content(...content) {
      return {
        type: "styled",
        content: content.map((x) =>
          "finalize" in x ? x.finalize() : x,
        ) as readonly Content[] as AtLeastOne<Content>,
        my,
        size,
      }
    },
    my(x) {
      my = x
      return builder
    },
    size(x) {
      size = x
      return builder
    },
  }

  return builder
}
