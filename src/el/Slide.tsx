import { children, For, Show, type JSXElement } from "solid-js"
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

function RenderStandard(props: { children: SlideStandard; class?: string }) {
  const vocab = children(() => (
    <For each={props.children.vocab}>{(word) => <Vocab>{word}</Vocab>}</For>
  ))

  const main = children(() => (
    <>
      <Title>{props.children.title}</Title>
      <For each={props.children.content}>{(e) => <Content>{e}</Content>}</For>
    </>
  ))

  const hasVocab = () => !!props.children.vocab?.length

  return (
    <SlideBase
      class={
        (hasVocab() ? "grid grid-cols-[2fr,1fr] p-4" : "p-8 pt-12") +
        (props.class ? " " + props.class : "")
      }
    >
      <Show when={hasVocab()} fallback={main()}>
        <main class="py-8 pl-4 pr-8">{main()}</main>
        <ul class="flex flex-col gap-4 border-l border-z p-4 pl-8 text-lg">
          {vocab()}
        </ul>
      </Show>
    </SlideBase>
  )
}

export function Render(props: { children: AnySlide; class?: string }) {
  return (
    <Show when={props.children.type == "insa"}>
      <RenderStandard class={props.class}>
        {props.children as SlideStandard}
      </RenderStandard>
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

export function RenderScalable(props: { children: AnySlide; class?: string }) {
  return (
    <svg viewBox="0 0 960 540" class={props.class}>
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
  const vocab = children(() => (
    <For each={props.children.vocab}>
      {(word) => <VocabPresenter>{word}</VocabPresenter>}
    </For>
  ))

  const notes = children(() => (
    <For each={props.children.notes}>
      {(note) => (
        <p class="font-ex-eng">
          <TextEl>{note}</TextEl>
        </p>
      )}
    </For>
  ))

  const main = children(() => (
    <For each={props.children.content}>
      {(e) => <ContentPresenter>{e}</ContentPresenter>}
    </For>
  ))

  const hasVocab = () => !!props.children.vocab?.length

  return (
    <div
      class={
        "flex flex-col overflow-auto" + (props.class ? " " + props.class : "")
      }
    >
      <main class="flex flex-col gap-4">
        <Show
          when={(() => {
            const m = main()
            if (Array.isArray(m)) {
              if (m.some((x) => x)) {
                return m
              } else {
                return false
              }
            }
            return m
          })()}
          fallback={
            <p class="font-sans">
              There are no notes from pieces of content on this slide.
            </p>
          }
        >
          {(x) => x()}
        </Show>
      </main>
      <Show when={hasVocab()}>
        <div class="mt-auto grid w-full grid-cols-[auto,auto] items-baseline pt-4">
          {vocab()}
        </div>
      </Show>
      <Show when={props.children.notes?.length}>
        <div class="mt-auto grid w-full grid-cols-[auto,auto] items-baseline pt-4">
          {notes()}
        </div>
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
