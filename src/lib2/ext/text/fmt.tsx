import { clsx } from "../../../lib/clsx"
import { defineExt } from "../../define"
import type { Text } from "../../types"
import { arr } from "./arr"
import { str } from "./str"
import { styledEng, styledTok } from "./styled"

export const ext = defineExt<{
  b: boolean
  i: boolean
  u: boolean
  x: boolean
  content: Text
}>()("text", "fmt", {
  render(data, exts) {
    return (
      <span
        class={clsx(
          data.b && "font-semibold text-z-heading",
          data.i && "italic",
          data.u && "underline underline-offset-2",
          data.x && "line-through",
        )}
      >
        {exts.Text(data.content)}
      </span>
    )
  },
  renderChallenge(data, exts) {
    return (
      <span
        class={clsx(
          data.b && "font-semibold text-z-heading",
          data.i && "italic",
          data.u && "underline underline-offset-2",
          data.x && "line-through",
        )}
      >
        {exts.TextChallenge(data.content)}
      </span>
    )
  },
  entry(data, exts) {
    return exts.TextEntry(data.content)
  },
})

export function fmtManual(
  text: Text,
  {
    b = false,
    i = false,
    u = false,
    x = false,
  }: {
    b?: boolean
    i?: boolean
    u?: boolean
    x?: boolean
  },
): Text {
  return ["fmt", { text, b, i, u, x }]
}

export type TextParams = readonly [
  strings: readonly string[],
  ...interps: Text[],
]

export function fmt(strings: readonly string[], ...interps: Text[]): Text {
  const output: Text[] = []
  let b = false
  let i = false
  let u = false
  let x = false
  for (let index = 0; index < strings.length; index++) {
    if (index > 0) {
      output.push(interps[index - 1]!)
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
        if (u) {
          x = false
        }
        text = text.slice(2)
        continue
      }

      if (text.startsWith("~~")) {
        x = !x
        if (x) {
          u = false
        }
        text = text.slice(2)
        continue
      }

      if (text.startsWith("*") || text.startsWith("_")) {
        i = !i
        text = text.slice(1)
        continue
      }

      if (text.startsWith('$"')) {
        let end = text.indexOf('"', 2)
        if (end == -1) {
          end = text.length
        }
        const sub = text.slice(2, end)
        text = text.slice(end + 1)
        output.push(str("“"))
        output.push(styledEng(sub))
        output.push(str("”"))
        continue
      }

      if (text.startsWith('#"')) {
        let end = text.indexOf('"', 2)
        if (end == -1) {
          end = text.length
        }
        const sub = text.slice(1, end)
        text = text.slice(end + 1)
        output.push(str("“"))
        output.push(styledTok(sub))
        output.push(str("”"))
        continue
      }

      const idx = text.match(/[*_"]|[$#]"|~~/)?.index

      const sub = (idx == null ? text : text.slice(0, idx))
        .replace(/[\p{L}\d?!.,]'/gu, (x) => x[0] + "’")
        .replace(/'/gu, "‘")

      if (b || i || u || x) {
        output.push(fmtManual(str(sub), { b, i, u, x }))
      } else {
        output.push(str(sub))
      }

      if (idx == null) {
        break
      } else {
        text = text.slice(idx)
      }
    }
  }

  return arr(output)
}