import { clsx } from "../../lib/clsx"
import { defineExt } from "../../lib/define"
import { finish, type Into, type Text } from "../../lib/types"
import { arr } from "./arr"
import { str } from "./str"
import { styledEng, styledTok } from "./styled"

export const ext = defineExt<{
  b: boolean
  i: boolean
  u: boolean
  x: boolean
  p: boolean
  content: Text
}>()("text", "fmt", {
  vocab(data, exts, proxy, vis) {
    exts.TextVocab(data.content, proxy, vis)
  },
  render(data, exts) {
    return (
      <span
        class={clsx(
          data.b && "font-semibold text-z-heading",
          data.i && "italic",
          data.u && "underline underline-offset-2",
          data.x && "line-through",
          data.p && "rounded bg-z-body-selected px-1 font-mono text-z-heading",
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
          data.p && "bg-z-body-selected font-mono",
        )}
      >
        {exts.TextChallenge(data.content)}
      </span>
    )
  },
  entry(data, exts, filter) {
    return exts.TextEntry(data.content, filter)
  },
  entryNote(data, exts, filter) {
    return exts.TextEntryNote(data.content, filter)
  },
})

export function fmtManual(
  content: Text,
  {
    b = false,
    i = false,
    u = false,
    x = false,
    p = false,
  }: {
    b: boolean
    i: boolean
    u: boolean
    x: boolean
    p: boolean
  },
): Text {
  return ["fmt", { content, b, i, u, x, p }]
}

export type FmtParams = readonly [
  strings: readonly string[],
  ...interps: Into<Text>[],
]

export function fmt(
  strings: readonly string[],
  ...interps: Into<Text>[]
): Text {
  const output: Text[] = []
  let b = false
  let i = false
  let u = false
  let x = false
  let p = false
  for (let index = 0; index < strings.length; index++) {
    if (index > 0) {
      output.push(finish(interps[index - 1]!))
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

      if (text.startsWith("`")) {
        p = !p
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
        const sub = text.slice(2, end)
        text = text.slice(end + 1)
        output.push(str("“"))
        output.push(styledTok(sub))
        output.push(str("”"))
        continue
      }

      const idx = text.match(/[*_`]|[$#]"|~~/)?.index

      const sub = (idx == null ? text : text.slice(0, idx))
        .replace(/[\p{L}\d?!.,]'/gu, (x) => x[0] + "’")
        .replace(/'/gu, "‘")
        .replace(/[\p{L}\d?!.,]"/gu, (x) => x[0] + "”")
        .replace(/"/gu, "“")

      if (b || i || u || x || p) {
        output.push(fmtManual(str(sub), { b, i, u, x, p }))
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
