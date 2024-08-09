import { children, createMemo, For, Show, type JSXElement } from "solid-js"
import type { AnySlide, SlideStandard } from "../lib/types"
import { Content, Title } from "./Content"
import { ContentPresenter } from "./ContentPresenter"
import { TextEl } from "./TextEl"
import { Vocab, VocabPresenter } from "./Vocab"

function SlideBase(props: { children: JSXElement; class?: string }) {
  return (
    <div
      class={
        "size-slide bg-white text-2xl text-z " +
        (props.class ? " " + props.class : "")
      }
    >
      {props.children}
    </div>
  )
}

function RenderStandard(props: { children: SlideStandard }) {
  function Main() {
    return (
      <>
        <Title>{props.children.title}</Title>
        <For each={props.children.content}>{(e) => <Content>{e}</Content>}</For>
      </>
    )
  }

  const hasVocab = () => !!props.children.vocab?.length

  return (
    <SlideBase
      class={
        "p-4 px-8" +
        (hasVocab() ? " grid grid-cols-[2fr,1fr] gap-8" : " flex flex-col")
      }
    >
      <main class="py-8">
        <Main />
      </main>
      <Show when={hasVocab()}>
        <ul class="hx-[calc(540px_-_2rem)] flex flex-col gap-4 border-l border-z p-4 pl-8 text-lg">
          <For each={props.children.vocab}>
            {(word) => <Vocab>{word}</Vocab>}
          </For>
        </ul>
      </Show>
    </SlideBase>
  )
}

export function Render(props: { children: AnySlide }) {
  return (
    <Show when={props.children.type == "insa"}>
      <RenderStandard>{props.children as SlideStandard}</RenderStandard>
    </Show>
  )
}

export function Scaled(props: {
  width: number
  height: number
  children: JSXElement
  class?: string
}) {
  return (
    <svg viewBox={`0 0 ${props.width} ${props.height}`} class={props.class}>
      <foreignObject
        x={0}
        y={0}
        width={props.width}
        height={props.height}
        viewBox={`0 0 ${props.width} ${props.height}`}
      >
        {props.children}
      </foreignObject>
    </svg>
  )
}

export function RenderScalable(props: {
  children: AnySlide
  class?: string
  onClick?: () => void
}) {
  return (
    <svg viewBox="0 0 960 540" class={props.class} onClick={props.onClick}>
      <foreignObject x={0} y={0} width={960} height={540} viewBox="0 0 960 540">
        <Render>{props.children}</Render>
      </foreignObject>
    </svg>
  )
}

function PresenterNotesStandard(props: {
  class?: string
  children: SlideStandard
}) {
  const main = children(() => (
    <For each={props.children.content}>
      {(e) => <ContentPresenter>{e}</ContentPresenter>}
    </For>
  ))

  const isEmpty = createMemo(() => {
    const m = main()
    if (Array.isArray(m)) {
      if (m.some((x) => x)) {
        return false
      }
    } else if (m) {
      return false
    }

    if (props.children.vocab?.length) {
      return false
    }

    if (props.children.notes?.length) {
      return false
    }

    return true
  })

  return (
    <div
      class={
        "flex flex-col gap-4 overflow-auto" +
        (props.class ? " " + props.class : "")
      }
    >
      <Show when={isEmpty()}>
        <p class="font-sans italic">There are no notes on this slide.</p>
      </Show>
      {main()}
      <Show when={props.children.vocab?.length}>
        <div class="grid w-full grid-cols-[auto,auto] items-baseline pt-4">
          <For each={props.children.vocab}>
            {(word) => <VocabPresenter>{word}</VocabPresenter>}
          </For>
        </div>
      </Show>
      <Show when={props.children.notes?.length}>
        <For each={props.children.notes}>
          {(note) => (
            <p class="font-ex-eng">
              <TextEl>{note}</TextEl>
            </p>
          )}
        </For>
      </Show>
    </div>
  )
}

export function PresenterNotes(props: { class?: string; children: AnySlide }) {
  return (
    <Show when={props.children.type == "insa"}>
      <PresenterNotesStandard class={props.class}>
        {props.children as SlideStandard}
      </PresenterNotesStandard>
    </Show>
  )
}
