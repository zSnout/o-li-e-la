import { children, For, Show, type JSXElement, type Ref } from "solid-js"
import { createScreenSize } from "../lib/size"
import type { SlideStandard } from "../lib/types"
import { Content, Title } from "./Content"
import { Vocab } from "./Vocab"

export function SlideBase(props: {
  fullscreen?: boolean
  children: JSXElement
  class?: string
  ref?: Ref<HTMLDivElement>
}) {
  const size = createScreenSize()

  return (
    <div
      class={
        "size-slide bg-white text-2xl text-z [--scale:1] " +
        (props.fullscreen ?
          "fixed left-1/2 top-1/2 m-auto origin-center -translate-x-1/2 -translate-y-1/2 scale-[--scale]"
        : "") +
        (props.class ? " " + props.class : "")
      }
      ref={props.ref}
      style={{ "--scale": Math.min(size.width / 960, size.height / 540) }}
    >
      {props.children}
    </div>
  )
}

export function Render(props: {
  fullscreen?: boolean
  children: SlideStandard
  ref?: Ref<HTMLDivElement>
}) {
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
      class={hasVocab() ? "grid grid-cols-[2fr,1fr] p-4" : "p-8 pt-12"}
      fullscreen={props.fullscreen}
      ref={props.ref}
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
