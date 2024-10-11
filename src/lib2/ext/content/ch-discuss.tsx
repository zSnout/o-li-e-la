import { For } from "solid-js"
import { defineExt, unimpl } from "../../define"
import type { Content, Note, Text } from "../../types"

export const ext = defineExt<
  [label: Text, prompts: [prompt: Text, notes?: readonly Note[]][]]
>()("content", "ch/discuss", {
  slide(data, exts) {
    return (
      <div class="my-4 flex w-full flex-col border-l border-z-ch px-4 font-ex-eng">
        <p class="text-base text-z-subtitle">{exts.Text(data[0])}</p>
        <For each={data[1]}>
          {(challenge) => <p>{exts.Text(challenge[0])}</p>}
        </For>
      </div>
    )
  },
  entry: unimpl,
  presenter: unimpl,
  print: unimpl,
})

export function discuss(
  label: Text,
  prompts: [prompt: Text, notes?: readonly Note[]][],
): Content {
  return ["ch/discuss", [label, prompts]]
}
