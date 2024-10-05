import {
  faFaceSurprise,
  type IconDefinition,
} from "@fortawesome/free-regular-svg-icons"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft"
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons/faArrowUpRightFromSquare"
import { faExpand } from "@fortawesome/free-solid-svg-icons/faExpand"
import {
  createEffect,
  createMemo,
  createSignal,
  For,
  Show,
  type JSX,
} from "solid-js"
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

import {
  faCheck,
  faCode,
  faExternalLink,
  faFileLines,
  faInfinity,
  faInfo,
  faList,
  faListOl,
  faPenRuler,
  faPhotoFilm,
  faVialCircleCheck,
} from "@fortawesome/free-solid-svg-icons"
import { TextEl } from "./el/TextEl"
import { clsx } from "./lib/clsx"
import {
  FILTER,
  KINDS,
  set,
  setKind,
  VIEW,
  type QFilter,
  type QKind,
  type QView,
} from "./lib/query"
import { text } from "./lib/text"

// slide import order is quite particular

import "./slides/00-pre/97-prologue"
import "./slides/01-inf/98-info"
import "./slides/02-dev/99-test"
import "./slides/03-tok/01-welcome"
import "./slides/03-tok/02-li"
import "./slides/03-tok/03-objects"
import "./slides/03-tok/04-modifiers"

function ViewAllSlides(props: { set(slide: AnySlide | undefined): void }) {
  return (
    <div class="grid w-full grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] gap-4 p-8">
      <For
        each={slides}
        fallback={
          <RenderScalable class="rounded-xl">
            {{
              type: "insa",
              content: [
                {
                  type: "ul",
                  items: [{ text: text`oliela.zsnout.com/?view=home` }],
                },
              ],
              title: text`go back and select a slide category`,
              gid: -1,
              id: -1,
              suli: true,
            }}
          </RenderScalable>
        }
      >
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

function Home() {
  return (
    <div class="flex min-h-full w-full flex-1 px-6 font-sans text-z">
      <div class="m-auto w-full max-w-96 flex-1 py-8">
        <h1 class="text-center font-ex-tok text-xl font-semibold text-z-heading">
          o li e la
        </h1>
        <p class="mb-8 text-center text-z-subtitle">
          The slideshow software designed for toki pona.
        </p>

        <div class="flex flex-col gap-2">
          <Card
            icon={faPhotoFilm}
            label="Main slideshow"
            value={`${slides.length} slides`}
            view={null}
          />
          <Card
            icon={faFileLines}
            label="Review sheets"
            value={`Print ${slides.filter((x) => x.type == "pini").length} at 8.5x11`}
            view="review"
          />
          <Card
            icon={faListOl}
            label="Collect view"
            value="See word usage stats"
            view="collect"
          />
          <Show when={import.meta.env.DEV}>
            <Card
              icon={faCode}
              label="Dev mode"
              value="Fullscreen latest slide"
              view="latest"
            />
          </Show>
        </div>

        <p class="mb-1 mt-8 text-sm text-z-subtitle">
          Filter slide categories displayed:
        </p>
        <div class="grid grid-cols-4 gap-2">
          <Kind icon={faCheck} kind="!done" label="Complete" />
          <Kind icon={faPenRuler} kind="draft" label="Draft" />
          <Kind icon={faInfo} kind="meta" label="Info" />
          <Kind icon={faVialCircleCheck} kind="test" label="Test" />
        </div>
        <p class="mb-8 mt-1 text-sm text-z-subtitle">
          If you're a teacher learning how to use this software, select "Info"
          and head to the main slideshow for information.
        </p>

        <p class="mb-1 mt-8 text-sm text-z-subtitle">Filter by slide type:</p>
        <div class="grid grid-cols-4 gap-2">
          <Filter icon={faInfinity} filter={null} label="Everything" />
          <Filter icon={faList} filter="content" label="Core" />
          <Filter icon={faCheck} filter="review" label="Review" />
        </div>
      </div>
    </div>
  )

  function Card(props: {
    icon: IconDefinition
    label: string
    value: JSX.Element
    view: QView | null
  }) {
    return (
      <button
        class="z-field relative flex flex-1 px-4 text-left shadow-none"
        onClick={() => set("view", props.view)}
      >
        <div class="mx-auto grid max-w-full grid-cols-[1.5rem,1fr] items-center gap-x-4">
          <Fa icon={props.icon} class="row-span-2 block size-6" title={false} />
          <p class="text-sm text-z-subtitle">{props.label}</p>
          <p class="min-w-40">{props.value}</p>
        </div>
        <div class="absolute right-0 top-0 p-2">
          <Fa
            class="icon-blue-500 size-4"
            icon={faExternalLink}
            title="Open Link"
          />
        </div>
      </button>
    )
  }

  function Filter(props: {
    icon: IconDefinition
    label: string
    filter: QFilter | null
  }) {
    const active = FILTER == props.filter
    return (
      <button
        class={clsx(
          "z-field flex flex-1 flex-col items-center gap-1 px-2 pb-1 text-left shadow-none",
          active && "icon-blue-500 border-z-focus bg-blue-50 ring",
        )}
        onClick={() => set("filter", props.filter)}
      >
        <Fa icon={props.icon} class="row-span-2 block size-6" title={false} />
        <p class={clsx("text-sm", active ? "text-z-link" : "text-z-subtitle")}>
          {props.label}
        </p>
      </button>
    )
  }

  function Kind(props: { icon: IconDefinition; label: string; kind: QKind }) {
    const active = KINDS.includes(props.kind) != (props.kind == "!done")
    return (
      <button
        class={clsx(
          "z-field flex flex-1 flex-col items-center gap-1 px-4 pb-1 text-left shadow-none",
          active && "icon-blue-500 border-z-focus bg-blue-50 ring",
        )}
        onClick={() => setKind(props.kind, !KINDS.includes(props.kind))}
      >
        <Fa icon={props.icon} class="row-span-2 block size-6" title={false} />
        <p class={clsx("text-sm", active ? "text-z-link" : "text-z-subtitle")}>
          {props.label}
        </p>
      </button>
    )
  }
}

export default function () {
  if (VIEW == "home") {
    document.documentElement.classList.remove("bg-slate-300")
    document.documentElement.classList.add("bg-slate-100")
    return <Home />
  } else if (VIEW == "review") {
    return <Review />
  } else if (VIEW == "collect") {
    document.documentElement.classList.remove("bg-slate-300")
    document.documentElement.classList.add("bg-white")
    return <Collect />
  } else if (VIEW == "latest") {
    const slide = slides[slides.length - 1]!
    return <SlideCreationView>{slide}</SlideCreationView>
  } else {
    return <Standard />
  }
}
