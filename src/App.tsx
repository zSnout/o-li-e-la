import { faFaceSurprise } from "@fortawesome/free-regular-svg-icons"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft"
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons/faArrowUpRightFromSquare"
import { faExpand } from "@fortawesome/free-solid-svg-icons/faExpand"
import { createEffect, createMemo, createSignal, For, Show } from "solid-js"
import { Fa } from "./el/Fa"
import {
  collect,
  CollectedEl,
  collectVocabStats,
  getSlideBasedVocab,
  PresenterNotes,
  PrintReview,
  RenderScalable,
} from "./el/Slide"
import { createEventListener } from "./lib/event"
import { slides, slideshows } from "./lib/helpers"
import { createRemSize } from "./lib/rem"
import { createScreenSize } from "./lib/size"
import type { AnySlide, VocabStat } from "./lib/types"

import { TextEl } from "./el/TextEl"
import { clsx } from "./lib/clsx"
import "./slides/tok/00-prologue"
import "./slides/tok/01-welcome"
import "./slides/tok/02-li"
import "./slides/tok/03-objects"
import "./slides/tok/04-modifiers"

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
  set: (slide: AnySlide | undefined) => void
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
          <button
            class="flex items-center justify-center gap-2 border-r border-z py-2 focus-visible:bg-z-body-selected focus-visible:outline-none hover:bg-z-body-selected"
            onClick={() => props.set(undefined)}
          >
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
    md() ? screen.height - 2 * rem() : screen.height - 11 * rem(),
  )
  const slideHeight = createMemo(
    () => (screen.width - 2 * rem()) / aspectRatio() + 2 * rem(),
  )
  const twoCol = createMemo(() =>
    slideHeight() < screen.height - 12 * rem() ? false : md(),
  )

  return (
    <div
      class={clsx(
        "grid h-screen max-h-screen w-screen bg-slate-300",
        twoCol() ?
          "grid-cols-[1fr,24rem] grid-rows-1"
        : "grid-cols-1 grid-rows-[var(--slide),var(--notes)]",
      )}
      style={{
        "--slide": slideHeight() + "px",
        "--notes": screen.height - slideHeight() + "px",
      }}
    >
      <div class="flex items-center justify-center p-4">
        <div
          class="flex flex-col gap-4"
          style={{
            width:
              twoCol() ? Math.min(w(), aspectRatio() * h()) + "px" : "100%",
            height: twoCol() ? undefined : "100%",
          }}
        >
          <RenderScalable class="rounded-xl">{props.children}</RenderScalable>
        </div>
      </div>
      <div class="flex flex-col bg-white" classList={{ "h-screen": twoCol() }}>
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

function Standard() {
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

function Review() {
  return (
    <For each={slides.filter((x) => x.type == "pini")}>
      {(x) => <PrintReview>{x}</PrintReview>}
    </For>
  )
}

function Collect() {
  const slideshowWordLists = getSlideBasedVocab()
  return (
    <div class="flex flex-col gap-24 px-6 py-8">
      <For each={slideshows}>
        {(slideshow) => {
          const collected = collect(slideshow.slides)
          const vocab = [...collectVocabStats(collected)]
          return (
            <div>
              <p class="bg-z-body-selected px-3 py-2 font-ex-eng text-xl font-semibold text-z-heading">
                <TextEl>{slideshow.title}</TextEl> ({vocab.length} words used)
              </p>
              <VocabGroup vocab={vocab} />
              <div class="mt-2 grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] items-center gap-2 text-z first:*:mt-0 last:*:mb-0">
                <For each={collected}>
                  {(x) => <CollectedEl>{x}</CollectedEl>}
                </For>
              </div>
            </div>
          )
        }}
      </For>
    </div>
  )

  function countVisible(stat: VocabStat | undefined) {
    let retval = 0
    for (const entry of stat?.values() || []) {
      retval += entry.inChallengePrompts + entry.inExamples
    }
    return retval
  }

  function statOf(vocab: [string, VocabStat][], word: string) {
    return vocab.find((x) => x[0] == word)
  }

  function VocabGroup({ vocab }: { vocab: [string, VocabStat][] }) {
    return (
      <For
        each={slideshowWordLists.filter(({ words }) =>
          vocab.some(([k]) => words.includes(k)),
        )}
      >
        {({ words, index }) => (
          <div class="mt-2 grid grid-cols-[repeat(auto-fill,minmax(3rem,1fr))] items-center gap-x-2 border-l border-z bg-slate-100 px-3 py-1 font-ex-eng text-z first:*:mt-0 last:*:mb-0">
            <p class="text-xl font-semibold text-z-heading">
              {index.toString().padStart(2, "0")}
            </p>
            <For
              each={words
                .slice()
                .sort(
                  (a, b) =>
                    countVisible(statOf(vocab, b)?.[1]) -
                    countVisible(statOf(vocab, a)?.[1]),
                )}
            >
              {(word) => (
                <p>
                  <span class="font-sp-sans text-3xl">{word}</span>
                  <span class="text-z-subtitle">
                    {countVisible(statOf(vocab, word)?.[1])}
                  </span>
                </p>
              )}
            </For>
          </div>
        )}
      </For>
    )
  }
}

export default function () {
  const search = new URL(location.href).searchParams
  if (search.has("review")) {
    return <Review />
  } else if (search.has("collect")) {
    document.documentElement.classList.remove("bg-slate-300")
    document.documentElement.classList.add("bg-white")
    return <Collect />
  } else if (search.has("latest")) {
    const slide = slides[slides.length - 1]!
    return <SlideCreationView>{slide}</SlideCreationView>
  } else {
    return <Standard />
  }
}
