import { For, Show } from "solid-js"
import { MaybeCh } from "../../lib/Ch"
import { clsx } from "../../lib/clsx"
import { defineExt } from "../../lib/define"
import type { Exts } from "../../lib/exts"
import {
  VocabVis,
  type Content,
  type Many,
  type ManyMut,
  type TextCtx,
  type TextCtxFull,
  type TextCtxFullMut,
  type TextOf,
} from "../../lib/types"
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
            {exts.Text(engCtx)} <span class="text-xp-violet">la</span>
          </p>
        </Show>
      </div>
      <div
        class={clsx(
          "flex w-full rounded-xl border-[0.25rem] px-3 py-1",
          challenge ? "border-x-la-box-ch" : "border-x-la-box",
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
  vocab([tok, , challenge], exts, proxy) {
    const vis = challenge ? VocabVis.CH_Q : VocabVis.EX
    exts.TextVocab(tok[0], proxy, vis)
    exts.TextVocab(tok[1], proxy, vis)
  },
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
  entry(data, exts, filter) {
    return (
      <>
        <Show when={filter.ex.transl}>
          <MaybeCh ch={data[2]}>
            <p class="font-ex-tok font-semibold">
              {exts.Text(data[0][0])} {exts.Text(data[0][1])}
            </p>
            <For each={data[1]}>
              {(eng) => (
                <>
                  <p class="font-ex-eng">
                    {exts.Text(eng[0][0])}{" "}
                    <span class="text-xp-violet">la</span>{" "}
                    {exts.Text(eng[0][1])}
                  </p>
                  <For each={eng[1]}>
                    {(full) => <p class="font-ex-eng">{exts.Text(full)}</p>}
                  </For>
                </>
              )}
            </For>
          </MaybeCh>
        </Show>
      </>
    )
  },
  presenter(data, exts) {
    return (
      <For each={data[1]}>
        {(eng) => (
          <div class="text-z">
            <p class="font-ex-tok font-semibold">
              {exts.Text(data[0][0])} {exts.Text(data[0][1])}
            </p>
            <p class="font-ex-eng">
              {exts.Text(eng[0][0])} <span class="text-xp-violet">la</span>{" "}
              {exts.Text(eng[0][1])}
            </p>
            <For each={eng[1]}>
              {(full) => <p class="font-ex-eng">{exts.Text(full)}</p>}
            </For>
          </div>
        )}
      </For>
    )
  },
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
