import type { Word } from "../lib/types"

export function Vocab(props: { children: Word }) {
  return (
    <li class="flex w-full flex-col">
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
