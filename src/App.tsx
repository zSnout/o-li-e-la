import { faFaceSurprise } from "@fortawesome/free-regular-svg-icons"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft"
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons/faArrowUpRightFromSquare"
import { faExpand } from "@fortawesome/free-solid-svg-icons/faExpand"
import { createEffect, createMemo, createSignal, For, Show } from "solid-js"
import { Fa } from "./el/Fa"
import { PresenterNotes, RenderScalable } from "./el/Slide"
import { createEventListener } from "./lib/event"
import { slides } from "./lib/helpers"
import { createRemSize } from "./lib/rem"
import { createScreenSize } from "./lib/size"
import type { AnySlide } from "./lib/types"

import "./slides/tok/01-welcome"
// import "./slides/tok/02-li"

const SHOW_LATEST = true

function ViewAllSlides(props: { set(slide: AnySlide | undefined): void }) {
  return (
    <div class="grid w-full grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-4 p-8">
      <For each={slides}>
        {(slide) => (
          <RenderScalable
            onClick={() => props.set(slide)}
            class="cursor-pointer select-none rounded-xl"
          >
            {slide}
          </RenderScalable>
        )}
      </For>
    </div>
  )
}

function PresenterView(props: {
  children: AnySlide
  set: (slide: AnySlide) => void
  setPopup: (window: Window) => void
}) {
  const { set } = props
  const rem = createRemSize()
  const aspectRatio = createMemo(() => 960 / (540 + rem() + 540 / 2))
  const screen = createScreenSize()
  const w = createMemo(() => screen.width - 28 * rem())
  const h = createMemo(() => screen.height - 4 * rem())
  const prev = createMemo(() => slides[props.children.gid - 1])
  const next = createMemo(() => slides[props.children.gid + 1])

  return (
    <div class="grid h-screen w-screen grid-cols-[1fr,24rem] bg-slate-300">
      <div class="flex items-center justify-center p-8">
        <div
          class="flex flex-col gap-4"
          style={{ width: Math.min(w(), aspectRatio() * h()) + "px" }}
        >
          <RenderScalable class="rounded-xl">{props.children}</RenderScalable>
          <div class="flex w-full gap-4">
            <Small>{prev()}</Small>
            <Small>{next()}</Small>
          </div>
        </div>
      </div>
      <div class="flex h-screen flex-col bg-white">
        <PresenterNotes class="flex-1 p-4">{props.children}</PresenterNotes>
        <div class="grid grid-cols-3 border-t border-z font-sans text-z">
          <button class="flex items-center justify-center gap-2 border-r border-z py-2 focus-visible:bg-z-body-selected focus-visible:outline-none hover:bg-z-body-selected">
            <Fa class="size-4" icon={faArrowLeft} title={false} /> Home
          </button>

          <button
            class="flex items-center justify-center gap-2 border-r border-z py-2 focus-visible:bg-z-body-selected focus-visible:outline-none hover:bg-z-body-selected"
            onClick={() => postMessage(props.children)}
          >
            <Fa class="size-4" icon={faExpand} title={false} /> Present
          </button>

          <button
            class="flex items-center justify-center gap-2 py-2 focus-visible:bg-z-body-selected focus-visible:outline-none hover:bg-z-body-selected"
            onClick={popup}
          >
            <Fa class="size-4" icon={faArrowUpRightFromSquare} title={false} />{" "}
            Popup
          </button>
        </div>
      </div>
    </div>
  )

  function Small(props: { children: AnySlide | undefined }) {
    return (
      <Show
        when={props.children}
        keyed
        fallback={
          <div class="flex aspect-video w-full flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-z-bg-body">
            <Fa class="size-12" icon={faFaceSurprise} title="surprised face" />
            <p class="font-sans italic text-z">no slides left!</p>
          </div>
        }
      >
        {(slide) => (
          <RenderScalable
            class="select-none rounded-xl"
            onClick={() => set(slide)}
          >
            {slide}
          </RenderScalable>
        )}
      </Show>
    )
  }

  function popup() {
    const main = open(location.href)
    if (!main) {
      alert("Please allow permission to open a popup.")
      return
    }

    main.onload = () => props.setPopup(main)
  }
}

function SlideCreationView(props: { children: AnySlide }) {
  const rem = createRemSize()
  const aspectRatio = createMemo(() => 960 / 540)
  const screen = createScreenSize()
  const md = createMemo(() => screen.width >= 768)
  const w = createMemo(() =>
    md() ? screen.width - 26 * rem() : screen.width - 2 * rem(),
  )
  const h = createMemo(() =>
    md() ? screen.height - 2 * rem() : screen.height - 26 * rem(),
  )

  return (
    <div class="grid h-screen w-screen grid-rows-[1fr,24rem] bg-slate-300 md:grid-cols-[1fr,24rem] md:grid-rows-1">
      <div class="flex items-center justify-center p-4">
        <div
          class="flex flex-col gap-4"
          style={{ width: Math.min(w(), aspectRatio() * h()) + "px" }}
        >
          <RenderScalable class="rounded-xl">{props.children}</RenderScalable>
        </div>
      </div>
      <div class="flex h-96 flex-col bg-white md:h-screen">
        <PresenterNotes class="w-96 flex-1 p-4">
          {props.children}
        </PresenterNotes>
      </div>
    </div>
  )
}

function Main(props: {
  slide: AnySlide | undefined
  set(slide: AnySlide | undefined): void
}) {
  const [popup, setPopup] = createSignal<WindowProxy>()

  createEffect(() => popup()?.postMessage(props.slide))

  return (
    <Show when={props.slide} fallback={<ViewAllSlides set={props.set} />}>
      <PresenterView set={props.set} setPopup={setPopup}>
        {props.slide!}
      </PresenterView>
    </Show>
  )
}

export type Msg = AnySlide | [AnySlide]

export function Root() {
  if (import.meta.env.DEV && SHOW_LATEST) {
    const slide = slides[slides.length - 1]!
    return <SlideCreationView>{slide}</SlideCreationView>
    // return (
    //   <div class="fixed left-0 top-0 h-screen w-screen bg-black">
    //     <RenderScalable class="hx-[min(100vh,56.25vw)] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
    //       {slide}
    //     </RenderScalable>
    //   </div>
    // )
  }

  let source: Window | undefined
  const [slide, setSlide] = createSignal<AnySlide>()
  const [big, setBig] = createSignal(false)

  createEventListener(window, "message", ({ data, source: s }) => {
    if (s && "window" in s) {
      source = s
    }
    if (Array.isArray(data)) {
      const slide = data[0] as AnySlide
      setSlide(slide)
    } else {
      const slide = data as AnySlide
      setSlide(slide)
      setBig(true)
    }
  })

  createEventListener(window, "keydown", (event) => {
    if (
      (event.key == "ArrowLeft" || event.key == "ArrowRight") &&
      !event.metaKey &&
      !event.ctrlKey &&
      !event.altKey
    ) {
      const next = setSlide((prev) => {
        if (!prev) {
          return
        }

        const offset = event.key == "ArrowLeft" ? -1 : 1
        const slide = slides[prev.gid + offset]

        if (!slide) {
          alert("No more slides.")
          return prev
        }

        return slide
      })

      if (big() && source != window && next) {
        source?.postMessage([next])
      }
    }
  })

  return (
    <Show
      when={big() && slide()}
      fallback={<Main slide={slide()} set={setSlide} />}
    >
      <RenderScalable class="hx-[min(100vh,56.25vw)] fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        {slide()!}
      </RenderScalable>
    </Show>
  )
}

export default Root
