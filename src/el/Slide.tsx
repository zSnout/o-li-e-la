import { children, createEffect, For, Show, type JSXElement } from "solid-js"
import { createScreenSize } from "../lib/size"
import type { SlideStandard } from "../lib/types"
import { Content, Title } from "./Content"
import { Vocab } from "./Vocab"

export function SlideBase(props: { children: JSXElement; class?: string }) {
  const size = createScreenSize()
  let el: HTMLDivElement

  createEffect(() => {
    el.style.setProperty(
      "--scale",
      "" + Math.min(size.width / 960, size.height / 540),
    )
  })

  return (
    <div
      class={
        "fixed left-1/2 top-1/2 m-auto h-[540px] w-[960px] origin-center -translate-x-1/2 -translate-y-1/2 scale-[--scale] bg-white text-2xl text-z [--scale:1]" +
        (props.class ? " " + props.class : "")
      }
      ref={el!}
    >
      {props.children}
    </div>
  )
}

export function SlideWithoutVocab(props: { children: JSXElement }) {
  return <SlideBase class="p-8 pt-12">{props.children}</SlideBase>
}

export function SlideManual(props: {
  children: JSXElement
  vocab?: JSXElement
}) {
  const vocab = children(() => props.vocab)

  return (
    <SlideBase class={vocab() ? "grid grid-cols-[2fr,1fr] p-4" : "p-8 pt-12"}>
      <Show when={vocab()} fallback={props.children}>
        <main class="py-8 pl-4 pr-8">{props.children}</main>
        <ul class="flex flex-col gap-4 border-l border-z p-4 pl-8 text-lg">
          {props.vocab}
        </ul>
      </Show>
    </SlideBase>
  )
}

export function SlideStandardEl(props: { children: SlideStandard }) {
  return (
    <SlideManual
      vocab={
        props.children.vocab?.length ?
          <For each={props.children.vocab}>
            {(word) => <Vocab>{word}</Vocab>}
          </For>
        : undefined
      }
    >
      <Title>{props.children.title}</Title>
      <For each={props.children.content}>{(e) => <Content>{e}</Content>}</For>
    </SlideManual>
  )
}
