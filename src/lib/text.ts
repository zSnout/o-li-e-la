import type { Phrase, Text, TextItem } from "./types"

export function text(
  strings: TemplateStringsArray,
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
        if (typeof inner[0] == "object" && "color" in inner[0]) {
          output.push(inner as Phrase)
        } else {
          output.push(...(inner as Text))
        }
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

      const idx = text.match(/[*_]|~~/)?.index

      const sub = idx == null ? text : text.slice(0, idx)

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
