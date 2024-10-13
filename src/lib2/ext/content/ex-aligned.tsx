import { For } from "solid-js"
import { defineExt, unimpl } from "../../define"
import type { Content, TextOf } from "../../types"

export const ext = defineExt<[tok: TextOf<"tok">, eng: TextOf<"eng">][]>()(
  "content",
  "ex/aligned",
  {
    slide(data, exts) {
      return (
        <div class="my-4 grid grid-cols-2 gap-x-8">
          <For each={data}>
            {(entry) => (
              <>
                <p class="text-right font-ex-tok font-semibold">
                  {exts.Text(entry[0])}
                </p>
                <p class="font-ex-eng">{exts.Text(entry[1])}</p>
              </>
            )}
          </For>
        </div>
      )
    },
    entry(data, exts, filter) {
      return (
        <For each={data}>
          {(entry) => (
            <>
              {exts.TextEntry(entry[0], filter)}
              {exts.TextEntry(entry[1], filter)}
            </>
          )}
        </For>
      )
    },
    presenter(): undefined {},
    print: unimpl,
  },
)

export function aligned(
  items: [tok: TextOf<"tok">, eng: TextOf<"eng">][],
): Content {
  return ["ext/aligned", items]
}
