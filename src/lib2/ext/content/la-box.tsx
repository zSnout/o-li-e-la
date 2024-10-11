import { Show } from "solid-js"
import { clsx } from "../../clsx"
import { defineExt, unimpl } from "../../define"
import type { Exts } from "../../exts"
import type { Content, Many, TextCtx, TextCtxFull, TextOf } from "../../types"

function LaBox({
  engCtx,
  engMain,
  exts,
  tokCtx,
  tokMain,
  challenge,
  print,
}: {
  tokCtx: TextOf<"tok">
  tokMain: TextOf<"tok">
  engCtx: TextOf<"eng">
  engMain: TextOf<"eng">
  challenge: boolean
  print: boolean
  exts: Exts
}) {
  return (
    <div
      class={clsx(
        "mx-auto flex w-full flex-col items-center px-12",
        print ? "my-6" : "mb-6 mt-8",
      )}
    >
      <div class="flex w-full px-4 pb-1">
        <p class="whitespace-nowrap font-ex-tok font-semibold">
          {challenge ? exts.TextChallenge(tokCtx) : exts.Text(tokCtx)}
        </p>
        <p class="ml-auto whitespace-nowrap font-ex-eng">
          {challenge ? exts.TextChallenge(engCtx) : exts.Text(engCtx)}
        </p>
      </div>
      <div
        class={clsx(
          "flex w-full rounded-xl border-[0.25rem] px-3 py-1",
          challenge ? "border-slate-600" : "border-violet-800",
        )}
      >
        <Show when={challenge}>
          <p class="whitespace-nowrap font-ex-tok font-semibold">
            {exts.Text(tokMain)}
          </p>
          <p class="ml-auto whitespace-nowrap font-ex-eng">
            {exts.Text(engMain)}
          </p>
        </Show>
      </div>
    </div>
  )
}

export const ext = defineExt<
  [tok: TextCtx<"tok">, eng: Many<TextCtxFull<"eng">>, challenge: boolean]
>()("content", "la_box", {
  slide(data, exts) {
    return (
      <LaBox
        exts={exts}
        print={false}
        challenge={data[2]}
        tokCtx={data[0][0]}
        tokMain={data[0][1]}
        engCtx={data[1][0][0][0]}
        engMain={data[1][0][0][1]}
      />
    )
  },
  entry: unimpl,
  presenter: unimpl,
  print(data, exts) {
    return (
      <LaBox
        exts={exts}
        print
        challenge={data[2]}
        tokCtx={data[0][0]}
        tokMain={data[0][1]}
        engCtx={data[1][0][0][0]}
        engMain={data[1][0][0][1]}
      />
    )
  },
})

export function laBox(
  tok: TextCtx<"tok">,
  eng: Many<TextCtxFull<"eng">>,
  challenge: boolean,
): Content {
  return ["la_box", [tok, eng, challenge]]
}
