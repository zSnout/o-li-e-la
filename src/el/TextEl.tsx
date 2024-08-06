import type { Text, TextFormatted } from "../lib/types"
import { PhraseEl } from "./PhraseEl"

export function TextEl(props: {
  children: Text
  style?: "plain" | "force" | undefined
}) {
  return props.children
    .map((text) =>
      typeof text == "object" ?
        "lang" in text ?
          ["“", <PhraseEl style={props.style}>{text}</PhraseEl>, "”"]
        : <span
            classList={{
              "font-bold": (text as TextFormatted).b,
              "text-z-heading": (text as TextFormatted).b,
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
