import { For } from "solid-js"
import { LA_BORDER, LA_CONTENT, LA_PARTICLE } from "../lib/colors"
import type {
  ChallengeEng,
  ChallengeLa,
  ChallengeTok,
  ExampleLa,
  ExampleTok,
  InfoListUl,
  Text,
} from "../lib/types"
import { PhraseEl } from "./PhraseEl"
import { TextEl } from "./TextEl"

export function Title(props: { children: Text }) {
  return (
    <h1 class="mb-8 font-ex-title text-4xl text-z-heading">
      <TextEl>{props.children}</TextEl>
    </h1>
  )
}

export function ExampleTokEl(props: { children: ExampleTok }) {
  return (
    <div class="my-4 flex flex-col items-center">
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

export function ExampleLaEl(props: { children: ExampleLa }) {
  return (
    <div class="mx-auto my-8 flex w-full flex-col items-center px-12">
      <div class="flex w-full px-4 pb-1">
        <p class="whitespace-nowrap font-ex-tok font-semibold">
          <span class={LA_CONTENT}>{props.children.tok[0]}</span>
          <span class={LA_PARTICLE}> la</span>
        </p>
        <p class="ml-auto whitespace-nowrap font-ex-eng">
          <span class={LA_CONTENT}>{props.children.eng[0][0]}</span>
          <span class={LA_PARTICLE}> la</span>
        </p>
      </div>
      <div
        class={"flex w-full rounded-xl border-[0.25rem] px-3 py-1 " + LA_BORDER}
      >
        <p class="whitespace-nowrap font-ex-tok font-semibold">
          <PhraseEl>{props.children.tok[1]}</PhraseEl>
        </p>
        <p class="ml-auto whitespace-nowrap font-ex-eng">
          <PhraseEl>{props.children.eng[0][1]}</PhraseEl>
        </p>
      </div>
    </div>
  )
}

export function ChallengeTokEl(props: { children: ChallengeTok }) {
  return (
    <div class="my-4 flex flex-col items-center border-l border-z-ch px-4">
      <For each={props.children.items}>
        {(challenge) => (
          <p class="font-ex-tok font-semibold">
            <PhraseEl plain>{challenge.tok}</PhraseEl>
          </p>
        )}
      </For>
    </div>
  )
}

export function ChallengeEngEl(props: { children: ChallengeEng }) {
  return (
    <div class="my-4 flex w-full flex-col border-l border-z-ch px-4 font-ex-eng">
      <p class="text-base text-z-subtitle">
        {props.children.label ?
          <TextEl>{props.children.label}</TextEl>
        : "Translate:"}
      </p>
      <For each={props.children.items}>
        {(challenge) => (
          <p>
            <PhraseEl plain>{challenge.eng}</PhraseEl>
          </p>
        )}
      </For>
    </div>
  )
}

export function ChallengeLaEl(props: { children: ChallengeLa }) {
  return (
    <div class="mx-auto my-8 flex w-full flex-col items-center px-12">
      <div class="flex w-full px-4 pb-1">
        <p class="whitespace-nowrap font-ex-tok font-semibold">
          <span class={LA_CONTENT}>{props.children.tok[0]}</span>
          <span class={LA_PARTICLE}> la</span>
        </p>
      </div>
      <div
        class={"flex w-full rounded-xl border-[0.25rem] px-3 py-1 " + LA_BORDER}
      >
        <p class="whitespace-nowrap font-ex-tok font-semibold">
          <PhraseEl plain>{props.children.tok[1]}</PhraseEl>
        </p>
      </div>
    </div>
  )
}

export function InfoListUlEl(props: { children: InfoListUl }) {
  return (
    <ul class="my-4 pl-4 font-ex-eng">
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
