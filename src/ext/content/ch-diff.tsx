import { For, Show } from "solid-js"
import { VocabVis } from "src/lib/vocab"
import { Ch } from "../../lib/Ch"
import { defineExt, unimpl } from "../../lib/define"
import type { Content, Many, ManyMut, Text, TextOf } from "../../lib/types"
import { fmt, type FmtParams } from "../text/fmt"
import { styledTok } from "../text/styled"

type Prompt = [a: TextOf<"tok">, b: TextOf<"tok">, explanation: Many<Text>]

export const ext = defineExt<Prompt[]>()("content", "ch/diff", {
  vocab(data, exts, proxy) {
    for (const [a, b, c] of data) {
      exts.TextVocab(a, proxy, VocabVis.CH_Q)
      exts.TextVocab(b, proxy, VocabVis.CH_Q)
      for (const el of c) {
        exts.TextVocab(el, proxy, VocabVis.CH_EXPL)
      }
    }
  },
  slide(data, exts) {
    return (
      <div class="my-4 flex w-full flex-col border-l border-z-ch px-4 font-ex-eng">
        <p class="text-base text-z-subtitle">Explain the difference between:</p>
        <div class="grid w-full grid-cols-2">
          <For each={data}>
            {(challenge) => (
              <>
                <p class="font-ex-tok font-semibold">
                  {exts.TextChallenge(challenge[0])}
                </p>
                <p class="font-ex-tok font-semibold">
                  {exts.TextChallenge(challenge[1])}
                </p>
              </>
            )}
          </For>
        </div>
      </div>
    )
  },
  entry(data, exts, filter) {
    return (
      <For each={data}>
        {([a, b, expls]) => (
          <>
            <Show when={filter.ch.diff}>
              <Ch>
                <p class="absolute right-1 top-1 rounded-sm bg-z-body px-1 font-sans">
                  diff
                </p>
                <p class="font-ex-tok font-semibold">{exts.Text(a)}</p>
                <p class="font-ex-tok font-semibold">{exts.Text(b)}</p>
              </Ch>
            </Show>
            {exts.TextEntry(a, filter)}
            {exts.TextEntry(b, filter)}
            <For each={expls}>{(expl) => exts.TextEntry(expl, filter)}</For>
          </>
        )}
      </For>
    )
  },
  presenter(data, exts) {
    return (
      <For each={data}>
        {([a, b, expls]) => (
          <div class="text-z">
            <p class="font-ex-tok font-semibold">{exts.Text(a)}</p>
            <p class="font-ex-tok font-semibold">{exts.Text(b)}</p>
            <For each={expls}>
              {(expl) => <p class="font-sans text-z">{exts.Text(expl)}</p>}
            </For>
          </div>
        )}
      </For>
    )
  },
  print: unimpl,
})

export interface Done extends NeedsExplain {
  done(): Content
  also(tok: TemplateStringsArray): NeedsAgainst
}

export interface NeedsAgainst {
  vsrs(tok: TemplateStringsArray): NeedsExplain
}

export interface NeedsExplain {
  expl(...explanation: FmtParams): Done
}

export function chDiff(prompts: Prompt[]): Content {
  return ["ch/diff", prompts]
}

export function builderDiff([tok]: TemplateStringsArray): NeedsAgainst {
  return {
    vsrs([b]) {
      return {
        expl(...expl) {
          let explanations: ManyMut<Text> = [fmt(...expl)]
          const prompts: Prompt[] = [
            [styledTok(tok!), styledTok(b!), explanations],
          ]
          const done: Done = {
            done() {
              return chDiff(prompts)
            },
            also([tok]) {
              return {
                vsrs([b]) {
                  return {
                    expl(...expl) {
                      explanations = [fmt(...expl)]
                      prompts.push([
                        styledTok(tok!),
                        styledTok(b!),
                        explanations,
                      ])
                      return done
                    },
                  }
                },
              }
            },
            expl(...expl) {
              explanations.push(fmt(...expl))
              return done
            },
          }
          return done
        },
      }
    },
  }
}
