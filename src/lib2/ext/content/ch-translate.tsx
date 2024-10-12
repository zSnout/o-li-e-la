import { For, Show } from "solid-js"
import { defineExt, unimpl } from "../../define"
import type { Exts } from "../../exts"
import type { Content, Many, Text } from "../../types"

function render(
  data: [lang: "tok" | "eng", src: Text, dst: Many<Text>, hint: Text | null][],
  exts: Exts,
) {
  return (
    <div class="my-4 grid grid-cols-2 gap-x-8 border-l border-z-ch px-4">
      <For each={data}>
        {([lang, src, , hint]) => (
          <>
            <p
              class="font-semibold"
              classList={{
                "col-span-2": !hint,
                "text-center": !hint,
                "text-right": !!hint,
                "font-ex-tok": lang == "tok",
                "font-ex-eng": lang == "eng",
              }}
            >
              {exts.TextChallenge(src)}
            </p>
            <Show when={hint}>
              <p class="font-ex-eng">(hint: {exts.Text(hint!)})</p>
            </Show>
          </>
        )}
      </For>
    </div>
  )
}

export const ext = defineExt<
  [lang: "tok" | "eng", src: Text, dst: Many<Text>, hint: Text | null][]
>()("content", "ch/transl", {
  slide: render,
  entry: unimpl,
  presenter: unimpl,
  print: render,
})

export function transl(
  data: [lang: "tok" | "eng", src: Text, dst: Many<Text>, hint: Text | null][],
): Content {
  return ["ch/transl", data]
}
