import type { IconDefinition } from "@fortawesome/free-solid-svg-icons"
import { For } from "solid-js"
import type { ChallengeTok, ExampleTok, Text } from "../lib/types"
import { Fa } from "./Fa"
import { PhraseEl } from "./PhraseEl"
import { TextEl } from "./TextEl"

export function Title(props: { children: Text }) {
  return (
    <h1 class="font-ex-title mb-4 text-4xl text-z-heading">
      <TextEl>{props.children}</TextEl>
    </h1>
  )
}

function Tag(props: { children: IconDefinition; class?: string }) {
  return (
    <div
      class={
        "absolute left-0 top-1/2 flex -translate-y-1/2 items-center justify-center font-sp-sans text-3xl" +
        (props.class ? " " + props.class : "")
      }
    >
      <Fa class="size-8" icon={props.children} title={false} />
    </div>
  )
}

export function ExampleTokEl(props: { children: ExampleTok }) {
  return (
    <div class="flex flex-col items-center">
      <p class="font-ex-tok font-semibold">
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

export function ChallengeTokEl(props: { children: readonly ChallengeTok[] }) {
  return (
    <div class="flex flex-col items-center">
      <For each={props.children}>
        {(challenge) => (
          <p class="font-ex-tok font-semibold">
            <PhraseEl>{challenge.tok}</PhraseEl>
          </p>
        )}
      </For>
    </div>
  )
}
