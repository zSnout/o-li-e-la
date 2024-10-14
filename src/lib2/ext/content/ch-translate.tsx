import { For, Show } from "solid-js"
import { clsx } from "../../clsx"
import { defineExt, unimpl } from "../../define"
import type { Exts } from "../../exts"
import type { Content, Many, ManyMut, Text } from "../../types"
import { fmt, type FmtParams } from "../text/fmt"
import { styledEng, styledTok } from "../text/styled"

export type ChTranslateOne = readonly [
  lang: "tok" | "eng",
  src: Text,
  dst: Many<Text>,
  hint: Text | null,
]

export type ChTranslateOneMut = [
  lang: "tok" | "eng",
  src: Text,
  dst: ManyMut<Text>,
  hint: Text | null,
]

function render(data: readonly ChTranslateOne[], exts: Exts) {
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

export const ext = defineExt<readonly ChTranslateOne[]>()(
  "content",
  "ch/transl",
  {
    slide: render,
    presenter(data, exts) {
      return (
        <For each={data}>
          {([lang, src, dst]) => (
            <div class="text-z">
              <p
                class={clsx(
                  "font-semibold",
                  { tok: "font-ex-tok", eng: "font-ex-eng" }[lang],
                )}
              >
                {exts.Text(src)}
              </p>
              <For each={dst}>
                {(x) => (
                  <p class={{ tok: "font-ex-eng", eng: "font-ex-tok" }[lang]}>
                    {exts.Text(x)}
                  </p>
                )}
              </For>
            </div>
          )}
        </For>
      )
    },
    entry: unimpl,
    print: render,
  },
)

export function transl(data: readonly ChTranslateOne[]): Content {
  return ["ch/transl", data]
}

export interface NeedsPrompt {
  tok(src: readonly string[]): NeedsInto
  eng(src: readonly string[]): NeedsInto
}

export interface Done extends NeedsPrompt {
  done(): Content
}

export interface NeedsInto {
  into(dst: readonly string[]): DoneOrHint
}

export interface DoneOrHint extends Done, NeedsInto {
  hint(...hint: FmtParams): Done
}

function create(lang: "eng" | "tok", src: Text, dst: Text): DoneOrHint {
  let f: (text: string) => Text = styledTok
  let last: ChTranslateOneMut = [lang, src, [dst], null]
  const out: ChTranslateOneMut[] = [last]
  const done: DoneOrHint = {
    done() {
      return transl(out)
    },
    hint(...hint) {
      last[3] = fmt(...hint)
      return done
    },
    into([dst]) {
      last[2].push(f(dst!))
      return done
    },
    eng([src]) {
      return {
        into([dst]) {
          last = ["eng", styledEng(src!), [styledTok(dst!)], null]
          out.push(last)
          return done
        },
      }
    },
    tok([src]) {
      return {
        into([dst]) {
          last = ["tok", styledTok(src!), [styledEng(dst!)], null]
          out.push(last)
          return done
        },
      }
    },
  }
  return done
}

export const builderChTranslate: NeedsPrompt = {
  eng([src]) {
    return {
      into([dst]) {
        return create("eng", styledEng(src!), styledTok(dst!))
      },
    }
  },
  tok([src]) {
    return {
      into([dst]) {
        return create("tok", styledTok(src!), styledEng(dst!))
      },
    }
  },
}
