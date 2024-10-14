import { For } from "solid-js"
import { defineExt, unimpl } from "../../define"
import type { Content, Many, ManyMut, Text, TextOf } from "../../types"
import { fmt, type FmtParams } from "../text/fmt"
import { styledTok } from "../text/styled"

type Prompt = [a: TextOf<"tok">, b: TextOf<"tok">, explanation: Many<Text>]

export const ext = defineExt<Prompt[]>()("content", "ch/diff", {
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
  entry: unimpl,
  presenter: unimpl,
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
