import { For } from "solid-js"
import type {
  ChallengeEng,
  ChallengeTok,
  ExampleTok,
  InfoListUl,
  Text,
} from "../lib/types"
import { PhraseEl } from "./PhraseEl"
import { TextEl } from "./TextEl"

export function Title(props: { children: Text }) {
  return (
    <h1 class="mb-4 font-ex-title text-4xl text-z-heading">
      <TextEl>{props.children}</TextEl>
    </h1>
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
    <div class="flex flex-col items-center border-l border-z-ch px-4">
      <For each={props.children}>
        {(challenge) => (
          <p class="font-ex-tok font-semibold">
            <PhraseEl plain>{challenge.tok}</PhraseEl>
          </p>
        )}
      </For>
    </div>
  )
}

export function ChallengeEngEl(props: { children: readonly ChallengeEng[] }) {
  return (
    <div class="flex w-full flex-col border-l border-z-ch px-4 font-ex-eng">
      <p class="text-base text-z-subtitle">Translate:</p>
      <For each={props.children}>
        {(challenge) => (
          <p>
            <PhraseEl plain>{challenge.eng}</PhraseEl>
          </p>
        )}
      </For>
    </div>
  )
}

export function InfoListUlEl(props: { children: InfoListUl }) {
  return (
    <ul class="font-ex-eng">
      <For each={props.children.items}>
        {(item) => (
          <li class="flex items-baseline gap-4">
            <span class="inline-block size-2.5 min-w-2.5 -translate-y-0.5 rounded-full bg-current" />
            <span>
              <TextEl>{item.text}</TextEl>
            </span>
          </li>
        )}
      </For>
    </ul>
  )
}
