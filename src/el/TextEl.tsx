import { For } from "solid-js"
import type { Text, TextFormatted } from "../lib/types"
import { PhraseEl } from "./PhraseEl"
import { isSitelenPonaOnly } from "../lib/text"

export function TextEl(props: {
  children: Text
  style?: "plain" | "force" | undefined
}) {
  if (isSitelenPonaOnly(props.children)) {
    return <PhraseEl style={props.style}>{props.children[0]}</PhraseEl>
  }

  return (
    <For each={props.children}>
      {(text) =>
        typeof text == "object" ?
          "lang" in text ?
            ["“", <PhraseEl style={props.style}>{text}</PhraseEl>, "”"]
          : <span
              class="whitespace-pre-line"
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
        : text.includes("\n") ? <span class="whitespace-pre-line">{text}</span>
        : text
      }
    </For>
  )
}
