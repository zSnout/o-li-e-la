import type { Word } from "../lib/types"

export function Vocab(props: { word: Word }) {
  return (
    <li class="flex w-full flex-col">
      <div class="flex items-baseline">
        <h2 class="flex font-semibold text-z-heading">{props.word.word}</h2>
        <span class="ml-auto text-z">({props.word.kind.abbr})</span>
      </div>
      <p class="pl-8 text-z">{props.word.defnShort}</p>
    </li>
  )
}
