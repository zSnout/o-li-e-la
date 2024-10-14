import { Show } from "solid-js"
import { clsx } from "../../clsx"
import { defineExt, unimpl } from "../../define"
import type { Exts } from "../../exts"
import {
  type Content,
  type Many,
  type ManyMut,
  type TextCtx,
  type TextCtxFull,
  type TextCtxFullMut,
  type TextOf,
} from "../../types"
import { str } from "../text/str"
import { styledEng, styledTok } from "../text/styled"

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
        <Show when={!challenge}>
          <p class="ml-auto whitespace-nowrap font-ex-eng">
            {exts.Text(engCtx)} <span class="text-violet-800">la</span>
          </p>
        </Show>
      </div>
      <div
        class={clsx(
          "flex w-full rounded-xl border-[0.25rem] px-3 py-1",
          challenge ? "border-slate-600" : "border-violet-800",
        )}
      >
        <p class="whitespace-nowrap font-ex-tok font-semibold">
          {challenge ? exts.TextChallenge(tokMain) : exts.Text(tokMain)}
        </p>
        <Show when={!challenge}>
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

function split<K extends string>(
  base: (text: string) => TextOf<K>,
  source: string,
): TextCtx<K> {
  const result = source.match(/(?:^|\s)la(?:$|[\s?,.:;])/)
  if (!result) {
    return [str("no la clause found"), base(source)]
  } else {
    const idx = result.index! + result[0].length
    return [base(source.slice(0, idx).trim()), base(source.slice(idx).trim())]
  }
}

export interface NeedsFull {
  full(strings: TemplateStringsArray): Done
}

export interface Done extends NeedsFull {
  eng(strings: TemplateStringsArray): NeedsFull
  done(): Content
}

export function createLaBuilder(challenge: boolean) {
  return ([tok]: TemplateStringsArray) => ({
    eng([eng]: TemplateStringsArray): NeedsFull {
      return {
        full([full]) {
          let last: TextCtxFullMut<"eng"> = [
            split(styledEng, eng!),
            [styledEng(full!)],
          ]
          const result: ManyMut<typeof last> = [last]
          const done: Done = {
            done() {
              return laBox(split(styledTok, tok!), result, challenge)
            },
            eng([eng]) {
              return {
                full([full]) {
                  last = [split(styledEng, eng!), [styledEng(full!)]]
                  result.push(last)
                  return done
                },
              }
            },
            full([full]) {
              last[1].push(styledEng(full!))
              return done
            },
          }
          return done
        },
      }
    },
  })
}
