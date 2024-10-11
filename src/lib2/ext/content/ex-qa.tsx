import { For } from "solid-js"
import { defineExt, unimpl } from "../../define"
import type { Content, Many, TextOf } from "../../types"

export const ext = defineExt<
  [
    q: [tok: TextOf<"tok">, eng: TextOf<"eng">],
    a: Many<[tok: TextOf<"tok">, eng: TextOf<"eng">]>,
  ]
>()("content", "ex/qa", {
  slide(data, exts) {
    if (data[1].length == 1) {
      return (
        <div class="my-4 grid grid-cols-2 gap-x-8">
          <p class="text-right font-ex-tok font-semibold">
            {exts.Text(data[0][0])}
          </p>
          <p class="font-ex-tok font-semibold">{exts.Text(data[1][0][0])}</p>

          <p class="text-right font-ex-eng">{exts.Text(data[0][1])}</p>
          <p class="font-ex-eng">{exts.Text(data[1][0][1])}</p>
        </div>
      )
    }

    return (
      <div class="my-4 flex flex-col">
        <p class="text-center font-ex-tok font-semibold">
          {exts.Text(data[0][0])}
        </p>
        <p class="text-center font-ex-eng">{exts.Text(data[0][1])}</p>
        <div class="mt-4 grid grid-cols-2 gap-x-8">
          <For each={data[1]}>
            {(a) => (
              <>
                <p class="text-right font-ex-tok font-semibold">
                  {exts.Text(a[0])}
                </p>
                <p class="font-ex-eng">{exts.Text(a[1])}</p>
              </>
            )}
          </For>
        </div>
      </div>
    )
  },
  entry: unimpl,
  presenter: unimpl,
  print: unimpl,
})

export function qa(
  q: [tok: TextOf<"tok">, eng: TextOf<"eng">],
  a: Many<[tok: TextOf<"tok">, eng: TextOf<"eng">]>,
): Content {
  return ["ex/qa", [q, a]]
}
