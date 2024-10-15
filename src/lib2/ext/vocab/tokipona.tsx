import { Show } from "solid-js"
import { defineExt } from "../../define"
import type { Text, Vocab } from "../../types"
import { fmt, type FmtParams } from "../text/fmt"

export const ext = defineExt<{
  word: string
  defnShort: Text
  defnLipamanka: Text | null
  kind: { name: string }
}>()("vocab", "tokipona", {
  render(data, exts) {
    return (
      <li class="flex w-full flex-col font-sans">
        <strong class="font-semibold text-z-heading">{data.word}</strong>
        <p class="text-balance pl-6 text-z">{exts.Text(data.defnShort)}</p>
      </li>
    )
  },
  withoutDefinition(data) {
    return (
      <li class="flex w-full flex-col font-sans font-semibold text-z-heading">
        {data.word}
      </li>
    )
  },
  presenter(data, exts) {
    return (
      <details>
        <summary class="font-sans marker:text-z-dimmed">
          <span class="font-sp-sans text-z-heading">{data.word}</span>{" "}
          <span class="font-semibold text-z-heading">{data.word}</span>{" "}
          <span class="text-z-subtitle">({data.kind.name})</span>
        </summary>

        <p class="pl-8 pt-1 font-sans text-z">
          {exts.Text(data.defnLipamanka ?? data.defnShort)}
        </p>

        <Show when={data.defnLipamanka}>
          <p class="mt-1 pl-8 font-sans text-sm text-z-subtitle">
            (Written by lipamanka,{" "}
            <a
              href="https://lipamanka.gay/essays/dictionary"
              class="text-z-link underline underline-offset-2"
            >
              whose full dictionary may be found on its website
            </a>
            .)
          </p>
        </Show>
      </details>
    )
  },
  entry(data, exts, filter) {
    return (
      <>
        {exts.TextEntry(data.defnShort, filter)}
        <Show when={data.defnLipamanka}>
          {exts.TextEntry(data.defnLipamanka!, filter)}
        </Show>
      </>
    )
  },
  partIcon(data) {
    return <span class="font-sp-sans">{data.word}</span>
  },
  partWord(data) {
    return <span class="font-ex-eng">{data.word}</span>
  },
  partDefnShort(data, exts) {
    return exts.Text(data.defnShort)
  },
  partDefnLong(data, exts) {
    return (
      <Show when={data.defnLipamanka}>{exts.Text(data.defnLipamanka!)}</Show>
    )
  },
})

export function tokipona(data: {
  word: string
  defnShort: Text
  defnLipamanka: Text | null
  kind: WordKind
}): Vocab {
  return ["tokipona", data]
}

// Intentionally not an interface.
export type WordKind = {
  content: boolean
  particle: boolean
  prep: boolean
  preverb: boolean
  name: string
  abbr: string
  color: string
}

const kinds = {
  content: {
    content: true,
    particle: false,
    prep: false,
    preverb: false,

    name: "content word",
    abbr: "c.",
    color: "bg-sky-500 text-sky-50",
  } satisfies WordKind as WordKind,
  particle: {
    content: false,
    particle: true,
    prep: false,
    preverb: false,

    name: "particle",
    abbr: "p.",
    color: "bg-orange-500 text-orange-50",
  } satisfies WordKind as WordKind,
  semiparticle: {
    content: true,
    particle: true,
    prep: false,
    preverb: false,

    name: "semiparticle",
    abbr: "sp.",
    color: "bg-green-500 text-green-50",
  } satisfies WordKind as WordKind,
  prep: {
    content: true,
    particle: false,
    prep: true,
    preverb: false,

    name: "preposition",
    abbr: "prep.",
    color: "bg-violet-500 text-violet-50",
  } satisfies WordKind as WordKind,
  preverb: {
    content: true,
    particle: false,
    prep: false,
    preverb: true,

    name: "preverb",
    abbr: "pv.",
    color: "bg-rose-500 text-rose-50",
  } satisfies WordKind as WordKind,
  emoticle: {
    content: true,
    particle: true,
    prep: false,
    preverb: true,

    name: "emoticle",
    abbr: "emo.",
    color: "bg-fuchsia-500 text-fuchsia-50",
  } satisfies WordKind as WordKind,
}

function createDefiner(kind: WordKind) {
  return ([name]: readonly string[]) => ({
    short(...short: FmtParams) {
      return {
        get noLipa(): Vocab {
          return tokipona({
            kind,
            defnShort: fmt(...short),
            defnLipamanka: null,
            word: name!,
          })
        },
        lipa(...lipa: FmtParams): Vocab {
          return tokipona({
            kind,
            defnShort: fmt(...short),
            defnLipamanka: fmt(...lipa),
            word: name!,
          })
        },
      }
    },
  })
}

export const content = /* @__PURE__ */ createDefiner(
  /* @__PURE__ */ kinds.content,
)
export const particle = /* @__PURE__ */ createDefiner(
  /* @__PURE__ */ kinds.particle,
)
export const semiparticle = /* @__PURE__ */ createDefiner(
  /* @__PURE__ */ kinds.semiparticle,
)
export const prep = /* @__PURE__ */ createDefiner(/* @__PURE__ */ kinds.prep)
export const preverb = /* @__PURE__ */ createDefiner(
  /* @__PURE__ */ kinds.preverb,
)
export const emoticle = /* @__PURE__ */ createDefiner(
  /* @__PURE__ */ kinds.emoticle,
)
