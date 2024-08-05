import { For } from "solid-js"
import type { ExampleFromTok, Text } from "../lib/types"
import { PhraseEl } from "./PhraseEl"
import { TextEl } from "./TextEl"

export function Title(props: { children: Text }) {
  return (
    <h1 class="font-ex-title text-4xl text-z-heading">
      <TextEl>{props.children}</TextEl>
    </h1>
  )
}

export function ExampleFromTokEl(props: { children: ExampleFromTok }) {
  return (
    <div class="flex flex-col items-center">
      <p class="font-ex-tok">
        <PhraseEl>{props.children.tok}</PhraseEl>
      </p>

      <For each={props.children.inter}>
        {(phrase) => (
          <p class="font-ex-eng">
            <PhraseEl>{phrase}</PhraseEl>
          </p>
        )}
      </For>

      <p class="font-ex-eng">
        <PhraseEl>{props.children.eng[0]}</PhraseEl>
      </p>
    </div>
  )
}
