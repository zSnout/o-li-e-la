import type { Text, TextFormatted } from "../lib/types"
import { PhraseEl } from "./PhraseEl"

export function TextEl(props: { children: Text }) {
  return props.children
    .map((text) =>
      typeof text == "object" ?
        "phrase" in text ?
          <PhraseEl>{text.phrase}</PhraseEl>
        : <span
            classList={{
              "font-strong": (text as TextFormatted).b,
              italic: (text as TextFormatted).i,
              underline: (text as TextFormatted).u,
              "line-through": (text as TextFormatted).x,
            }}
          >
            {(text as TextFormatted).text}
          </span>
      : text,
    )
    .flat()
}
