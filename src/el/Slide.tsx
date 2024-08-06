import { createEffect, type JSXElement } from "solid-js"
import { createScreenSize } from "../lib/size"

export function Slide(props: { children: JSXElement; class?: string }) {
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
  return <Slide class="p-8 pt-12">{props.children}</Slide>
}

export function SlideWithVocab(props: {
  children: JSXElement
  vocab: JSXElement
}) {
  return (
    <Slide class="grid grid-cols-[2fr,1fr] p-4">
      <main class="py-8 pl-4 pr-8">{props.children}</main>
      <ul class="flex flex-col gap-4 border-l border-z p-4 pl-8 text-lg">
        {props.vocab}
      </ul>
    </Slide>
  )
}
