import type { Word } from "../lib/types"

export function Vocab(props: { children: Word }) {
  return (
    <li class="flex w-full flex-col font-sans">
      <div class="flex items-baseline gap-4">
        <h2 class="flex font-semibold text-z-heading">{props.children.word}</h2>
        <span class="text-base text-z-subtitle">
          ({props.children.kind.abbr})
        </span>
      </div>
      <p class="pl-6 text-z">{props.children.defnShort}</p>
    </li>
  )
}

export function VocabPresenter(props: { children: Word }) {
  return (
    <>
      <span class="whitespace-nowrap font-sans">
        <strong class="font-ex-tok">{props.children.word}</strong>{" "}
        <span class="text-z-subtitle">({props.children.kind.abbr})</span>
      </span>
      <span class="font-sans">{props.children.defnShort}</span>
    </>
  )
}
