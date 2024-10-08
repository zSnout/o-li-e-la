import { eng, tok } from "./colors"
import type { Phrase, PhraseLang, Text, TextItem } from "./types"

export type TextParams = [
  strings: TemplateStringsArray,
  ...interps: (Text | TextItem)[],
]

const textFn = text

export function text(
  strings: readonly string[],
  ...interps: (Text | TextItem)[]
): Text {
  const output: TextItem[] = []
  let b = false
  let i = false
  let u = false
  let x = false
  for (let index = 0; index < strings.length; index++) {
    if (index > 0) {
      const inner = interps[index - 1]!
      if (Array.isArray(inner)) {
        output.push(...inner)
      } else {
        output.push(inner)
      }
    }

    let text = strings[index]!

    while (text) {
      if (text.startsWith("***")) {
        b = !b
        i = !i
        text = text.slice(3)
        continue
      }

      if (text.startsWith("**")) {
        b = !b
        text = text.slice(2)
        continue
      }

      if (text.startsWith("__")) {
        u = !u
        text = text.slice(2)
        continue
      }

      if (text.startsWith("~~")) {
        x = !x
        text = text.slice(2)
        continue
      }

      if (text.startsWith("*") || text.startsWith("_")) {
        i = !i
        text = text.slice(1)
        continue
      }

      if (text.startsWith('$"')) {
        const end = text.indexOf('"', 2)
        if (end == -1) {
          throw new Error("Unclosed double quote in text`...` call")
        }
        const sub = text.slice(2, end)
        text = text.slice(end + 1)
        output.push(eng([sub]))
        continue
      }

      if (text.startsWith('"')) {
        const end = text.indexOf('"', 1)
        if (end == -1) {
          throw new Error("Unclosed double quote in text`...` call")
        }
        const sub = text.slice(1, end)
        text = text.slice(end + 1)
        output.push(tok([sub]))
        continue
      }

      if (text.startsWith('~"')) {
        const end = text.indexOf('"', 2)
        if (end == -1) {
          throw new Error("Unclosed double quote in text`...` call")
        }
        const sub = text.slice(2, end)
        text = text.slice(end + 1)
        output.push("“")
        output.push(...textFn([sub]))
        output.push("”")
        continue
      }

      const idx = text.match(/[*_"]|[$~]"|~~/)?.index

      const sub = (idx == null ? text : text.slice(0, idx))
        .replace(/[\p{L}\d?!.,]'/gu, (x) => x[0] + "’")
        .replace(/'/gu, "‘")

      if (b || i || u || x) {
        output.push({ b, i, u, x, text: sub })
      } else {
        output.push(sub)
      }

      if (idx == null) {
        break
      } else {
        text = text.slice(idx)
      }
    }
  }

  if (output.length == 0) {
    throw new Error("Cannot return empty text.")
  }

  return output as readonly TextItem[] as Text
}

export function isSitelenPonaOnly(
  text: Text,
): text is readonly [Phrase<PhraseLang> & { font: "sp" }] {
  return (
    text.length == 1 &&
    typeof text[0] == "object" &&
    "font" in text[0] &&
    text[0].font == "sp"
  )
}
