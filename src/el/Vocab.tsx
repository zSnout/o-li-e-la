import { Show } from "solid-js"
import type { Word } from "../lib/types"
import { TextEl } from "./TextEl"

export function Vocab(props: { children: Word; noDefn?: boolean }) {
  return (
    <li class="flex w-full flex-col font-sans">
      <div class="flex items-baseline gap-4">
        <h2 class="flex font-semibold text-z-heading">{props.children.word}</h2>
      </div>
      <Show when={!props.noDefn}>
        <p class="text-balance pl-6 text-z">
          <TextEl>{props.children.defnShort!}</TextEl>
        </p>
      </Show>
    </li>
  )
}

export function VocabPresenter(props: { children: Word }) {
  return (
    <details>
      <summary class="font-sans">
        <span class="font-semibold">{props.children.word}</span>{" "}
        <span class="text-z-subtitle">({props.children.kind.name})</span>
      </summary>

      <p class="pl-8 font-ex-eng">
        <TextEl style="plain">
          {props.children.defnLipamanka ?? props.children.defnShort}
        </TextEl>
      </p>
    </details>
  )
}
