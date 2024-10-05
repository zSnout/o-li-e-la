import { For, Show } from "solid-js"
import { LA_CONTENT, LA_PARTICLE } from "../lib/colors"
import type {
  ChallengeDiscuss,
  ChallengeExplainDifference,
  ChallengeLa,
  ChallengeTranslate,
  Content,
  ExampleLa,
  Phrase,
  PhraseLang,
  Text,
} from "../lib/types"
import { PhraseEl } from "./PhraseEl"
import { TextEl } from "./TextEl"

export function TitlePresenter(props: { children: Text }) {
  return (
    <h1 class="font-ex-title text-lg text-z-heading">
      <TextEl style="force">{props.children}</TextEl>
    </h1>
  )
}

function Translation(props: {
  og: Phrase<PhraseLang>
  tx: readonly Phrase<PhraseLang>[]
}) {
  return (
    <div>
      <p
        class={
          "font-semibold " +
          (props.og.lang == "tok" ? "font-ex-tok" : "font-ex-eng")
        }
      >
        <PhraseEl style="force">{props.og}</PhraseEl>
      </p>
      <For each={props.tx}>
        {(x) => (
          <p class={x.lang == "tok" ? "font-ex-tok" : "font-ex-eng"}>
            <PhraseEl style="force">{x}</PhraseEl>
          </p>
        )}
      </For>
    </div>
  )
}

function WithNote(props: { og: Text; notes: readonly Text[] }) {
  return (
    <div class="font-ex-eng">
      <p class="font-semibold">
        <TextEl style="force">{props.og}</TextEl>
      </p>
      <For each={props.notes}>
        {(x) => (
          <p>
            <TextEl style="force">{x}</TextEl>
          </p>
        )}
      </For>
    </div>
  )
}

export function ExampleLaEl(props: { children: ExampleLa }) {
  // TODO: use <Translation />
  return (
    <Show when={props.children.eng.length > 1}>
      <div class="flex flex-col">
        <p class="font-ex-tok font-semibold">
          <span class={LA_CONTENT}>{props.children.tok[0]}</span>
          <span class={LA_PARTICLE}> la </span>
          <PhraseEl style="force">{props.children.tok[1]}</PhraseEl>
        </p>
        <For each={props.children.eng.slice(1)}>
          {(x) => (
            <p class="font-ex-eng">
              <span class={LA_CONTENT}>{x[0]}</span>
              <span class={LA_PARTICLE}> la </span>
              <PhraseEl style="force">{x[1]}</PhraseEl>
            </p>
          )}
        </For>
      </div>
    </Show>
  )
}

export function ChallengeTranslateEl(props: { children: ChallengeTranslate }) {
  return (
    <For each={props.children.items}>
      {(challenge) => <Translation og={challenge.q} tx={challenge.a} />}
    </For>
  )
}

export function ChallengeDiscussEl(props: { children: ChallengeDiscuss }) {
  return (
    <For each={props.children.items}>
      {(x) => (
        <Show when={x.notes?.length}>
          <WithNote og={x.prompt} notes={x.notes!} />
        </Show>
      )}
    </For>
  )
}

export function ChallengeExplainDifferenceEl(props: {
  children: ChallengeExplainDifference
}) {
  return (
    <For each={props.children.items}>
      {(item) => (
        <div>
          <p class="font-ex-tok font-semibold">
            <PhraseEl style="force">{item.a}</PhraseEl>
          </p>
          <p class="font-ex-tok font-semibold">
            <PhraseEl style="force">{item.b}</PhraseEl>
          </p>
          <For each={item.explanation}>
            {(x) => (
              <p class="font-ex-eng">
                <TextEl style="force">{x}</TextEl>
              </p>
            )}
          </For>
        </div>
      )}
    </For>
  )
}

export function ChallengeLaEl(props: { children: ChallengeLa }) {
  return (
    <div>
      <p class="font-ex-tok font-semibold">
        <span class={LA_CONTENT}>{props.children.tok[0]}</span>
        <span class={LA_PARTICLE}> la </span>
        <PhraseEl style="force">{props.children.tok[1]}</PhraseEl>
      </p>
      <For each={props.children.eng}>
        {(x) => (
          <p class="font-ex-eng">
            <span class={LA_CONTENT}>{x[0]}</span>
            <span class={LA_PARTICLE}> la </span>
            <PhraseEl style="force">{x[1]}</PhraseEl>
          </p>
        )}
      </For>
    </div>
  )
}

export function ContentPresenter(props: { children: Content }) {
  switch (props.children.type) {
    case "ex:la":
      return <ExampleLaEl>{props.children}</ExampleLaEl>
    case "ch:tr":
      return <ChallengeTranslateEl>{props.children}</ChallengeTranslateEl>
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
    case "ex:tok":
    case "exs:aligned":
    case "exs:qa":
    case "ul":
      return undefined // all content is already displayed
  }
}
