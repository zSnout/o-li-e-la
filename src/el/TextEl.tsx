import type { JSXElement } from "solid-js"
import type { Phrase, Text, TextFormatted } from "../lib/types"
import { PhraseEl } from "./PhraseEl"

export function TextEl(props: { children: Text }) {
  return props.children
    .map((text, index) => {
      const el: JSXElement =
        Array.isArray(text) ? <PhraseEl>{text as Phrase}</PhraseEl>
        : typeof text == "object" ?
          <span
            classList={{
              "font-strong": (text as TextFormatted).b,
              italic: (text as TextFormatted).i,
              underline: (text as TextFormatted).u,
              "line-through": (text as TextFormatted).x,
            }}
          >
            {(text as TextFormatted).text}
          </span>
        : text

      if (index == 0) {
        return el
      } else {
        return [" ", el]
      }
    })
    .flat()
}
