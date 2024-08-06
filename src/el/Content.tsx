import { For, Show } from "solid-js"
import {
  LA_BORDER,
  LA_BORDER_GRAY,
  LA_CONTENT,
  LA_PARTICLE,
} from "../lib/colors"
import type {
  ChallengeDiscuss,
  ChallengeEng,
  ChallengeExplainDifference,
  ChallengeLa,
  ChallengeTok,
  Content,
  ExampleLa,
  ExampleSetAligned,
  ExampleSetQA,
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

export function ExampleSetManyEl(props: { children: ExampleSetAligned }) {
  return (
    <div class="my-4 grid grid-cols-2 gap-x-8">
      <For each={props.children.entries}>
        {(entry) => (
          <>
            <p class="text-right font-ex-tok font-semibold">
              <PhraseEl>{entry.tok}</PhraseEl>
            </p>
            <p class="font-ex-eng">
              <PhraseEl>{entry.eng}</PhraseEl>
            </p>
          </>
        )}
      </For>
    </div>
  )
}

export function ExampleSetQAEl(props: { children: ExampleSetQA }) {
  if (props.children.a.length == 1) {
    return (
      <div class="my-4 grid grid-cols-2 gap-x-8">
        <p class="text-right font-ex-tok font-semibold">
          <PhraseEl>{props.children.q.tok}</PhraseEl>
        </p>
        <p class="font-ex-tok font-semibold">
          <PhraseEl>{props.children.a[0].tok}</PhraseEl>
        </p>

        <p class="text-right font-ex-eng">
          <PhraseEl>{props.children.q.eng}</PhraseEl>
        </p>
        <p class="font-ex-eng">
          <PhraseEl>{props.children.a[0].eng}</PhraseEl>
        </p>
      </div>
    )
  }

  return (
    <div class="my-4 flex flex-col">
      <p class="text-center font-ex-tok font-semibold">
        <PhraseEl>{props.children.q.tok}</PhraseEl>
      </p>
      <p class="text-center font-ex-eng">
        <PhraseEl>{props.children.q.eng}</PhraseEl>
      </p>
      <div class="mt-4 grid grid-cols-2 gap-x-8">
        <For each={props.children.a}>
          {(a) => (
            <>
              <p class="text-right font-ex-tok font-semibold">
                <PhraseEl>{a.tok}</PhraseEl>
              </p>
              <p class="font-ex-eng">
                <PhraseEl>{a.eng}</PhraseEl>
              </p>
            </>
          )}
        </For>
      </div>
    </div>
  )
}

export function ChallengeTokEl(props: { children: ChallengeTok }) {
  // TODO: show hints
  return (
    <div class="my-4 flex flex-col items-center border-l border-z-ch px-4">
      <For each={props.children.items}>
        {(challenge) => (
          <p class="font-ex-tok font-semibold">
            <PhraseEl style="plain">{challenge.tok}</PhraseEl>
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
      <div class="grid w-full grid-cols-[1fr,2fr]">
        <For each={props.children.items}>
          {(challenge) => (
            <>
              <p classList={{ "col-span-2": !challenge.hint }}>
                <PhraseEl style="plain">{challenge.eng}</PhraseEl>
              </p>
              <Show when={challenge.hint}>
                <p>
                  (hint: <TextEl>{challenge.hint!}</TextEl>)
                </p>
              </Show>
            </>
          )}
        </For>
      </div>
    </div>
  )
}

export function ChallengeDiscussEl(props: { children: ChallengeDiscuss }) {
  return (
    <div class="my-4 flex w-full flex-col border-l border-z-ch px-4 font-ex-eng">
      <p class="text-base text-z-subtitle">
        {props.children.label ?
          <TextEl>{props.children.label}</TextEl>
        : "Discuss:"}
      </p>
      <div class="flex w-full flex-col">
        <For each={props.children.items}>
          {(challenge) => (
            <p>
              <TextEl>{challenge.prompt}</TextEl>
            </p>
          )}
        </For>
      </div>
    </div>
  )
}

export function ChallengeExplainDifferenceEl(props: {
  children: ChallengeExplainDifference
}) {
  return (
    <div class="my-4 flex w-full flex-col border-l border-z-ch px-4 font-ex-eng">
      <p class="text-base text-z-subtitle">Explain the difference between:</p>
      <div class="grid w-full grid-cols-2">
        <For each={props.children.items}>
          {(challenge) => (
            <>
              <p class="font-ex-tok font-semibold">
                <PhraseEl style="plain">{challenge.a}</PhraseEl>
              </p>
              <p class="font-ex-tok font-semibold">
                <PhraseEl style="plain">{challenge.b}</PhraseEl>
              </p>
            </>
          )}
        </For>
      </div>
    </div>
  )
}

export function ChallengeLaEl(props: { children: ChallengeLa }) {
  return (
    <div class="mx-auto my-8 flex w-full flex-col items-center border-x border-l-z-ch border-r-transparent px-[calc(3rem_-_1px)]">
      <div class="flex w-full px-4 pb-1">
        <p class="whitespace-nowrap font-ex-tok font-semibold">
          {props.children.tok[0]} la
        </p>
      </div>
      <div
        class={
          "flex w-full rounded-xl border-[0.25rem] px-3 py-1 " + LA_BORDER_GRAY
        }
      >
        <p class="whitespace-nowrap font-ex-tok font-semibold">
          <PhraseEl style="plain">{props.children.tok[1]}</PhraseEl>
        </p>
      </div>
    </div>
  )
}

export function InfoListUlEl(props: { children: InfoListUl }) {
  return (
    <Show
      when={props.children.items.length != 1}
      fallback={
        <p class="font-ex-eng">
          <TextEl>{props.children.items[0].text}</TextEl>
        </p>
      }
    >
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
    </Show>
  )
}

export function Content(props: { children: Content }) {
  switch (props.children.type) {
    case "ex:tok":
      return <ExampleTokEl>{props.children}</ExampleTokEl>
    case "ex:la":
      return <ExampleLaEl>{props.children}</ExampleLaEl>
    case "exs:aligned":
      return <ExampleSetManyEl>{props.children}</ExampleSetManyEl>
    case "exs:qa":
      return <ExampleSetQAEl>{props.children}</ExampleSetQAEl>
    case "ch:tok":
      return <ChallengeTokEl>{props.children}</ChallengeTokEl>
    case "ch:eng":
      return <ChallengeEngEl>{props.children}</ChallengeEngEl>
    case "ch:discuss":
      return <ChallengeDiscussEl>{props.children}</ChallengeDiscussEl>
    case "ch:la":
      return <ChallengeLaEl>{props.children}</ChallengeLaEl>
    case "ch:diff":
      return (
        <ChallengeExplainDifferenceEl>
          {props.children}
        </ChallengeExplainDifferenceEl>
      )
    case "ul":
      return <InfoListUlEl>{props.children}</InfoListUlEl>
  }
}
