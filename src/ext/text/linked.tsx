import { Show } from "solid-js"
import { defineExt } from "../../lib/define"
import type { Text } from "../../lib/types"
import { fmt, type FmtParams } from "./fmt"

export const ext = defineExt<[href: string, content: Text]>()(
  "text",
  "linked",
  {
    render(data, exts) {
      return (
        <a href={data[0]} class="text-z-link underline underline-offset-2">
          {exts.Text(data[1])}
        </a>
      )
    },
    renderChallenge(data, exts) {
      return (
        <a href={data[0]} class="text-z-link underline underline-offset-2">
          {exts.Text(data[1])}
        </a>
      )
    },
    entry(data, exts, filter) {
      return (
        <>
          <Show when={filter.media.links}>
            <a
              class="flex items-center justify-center font-sans text-z-link underline underline-offset-2"
              href={data[0]}
            >
              {data[0]}
            </a>
          </Show>
          {exts.TextEntry(data[1], filter)}
        </>
      )
    },
    entryNote(data, exts, filter) {
      return (
        <>
          <Show when={filter.media.links}>
            <a
              class="flex items-center justify-center rounded border border-dashed border-z-text-link p-4 font-sans text-z-link underline underline-offset-2"
              href={data[0]}
            >
              {data[0]}
            </a>
          </Show>
          {exts.TextEntry(data[1], filter)}
        </>
      )
    },
  },
)

export function defineLinked(href: string, content: Text): Text {
  return ["linked", [href, content]]
}

export function link([href]: readonly string[]) {
  return (...text: FmtParams) => defineLinked(href!, fmt(...text))
}
