import {
  faFileText,
  type IconDefinition,
} from "@fortawesome/free-regular-svg-icons"
import { faExternalLink } from "@fortawesome/free-solid-svg-icons"
import { faPrint } from "@fortawesome/free-solid-svg-icons/faPrint"
import { faTableCellsLarge } from "@fortawesome/free-solid-svg-icons/faTableCellsLarge"
import { faTv } from "@fortawesome/free-solid-svg-icons/faTv"
import {
  For,
  Show,
  createEffect,
  createMemo,
  createSignal,
  type JSX,
} from "solid-js"
import { render } from "solid-js/web"
import type { View } from ".."
import { fmt, type FmtParams } from "../ext/text/fmt"
import { AsSvg } from "./AsSvg"
import { Fa } from "./Fa"
import { clsx } from "./clsx"
import { Exts } from "./exts"
import { createRemSize } from "./rem"
import { createScreenSize } from "./size"
import {
  createFilter,
  finishAll,
  type Into,
  type PrintFull,
  type Slide,
  type Text,
} from "./types"
import { countShownToAudience, getVocab, type VocabList } from "./vocab"

export class Slideshow {
  readonly exts = new Exts()
  readonly groups: Group[] = []
  readonly slides: Slide[] = []
  readonly prints: PrintFull[] = []

  adopt(group: Group) {
    this.groups.push(group)
    this.slides.push(...group.slides)
    this.prints.push(...group.prints)
  }
}

export class Group {
  static of(...abbr: FmtParams) {
    return (...title: FmtParams) => new Group(fmt(...title), fmt(...abbr))
  }

  readonly slides: Slide[] = []
  readonly prints: PrintFull[] = []

  constructor(
    readonly title: Text,
    readonly abbr: Text,
  ) {}

  slide(...slides: Into<Slide>[]) {
    this.slides.push(...finishAll(slides))
  }

  print(...prints: Into<PrintFull>[]) {
    this.prints.push(...finishAll(prints))
  }
}

const MSG_FULLSCREEN = "@zsnout/slides:fullscreen"
const MSG_PRESENTER_MOVE = "@zsnout/slideshow:presenter/move"

export function startBackgroundProcess(exts: Exts): () => void {
  let disposed = false
  let el: HTMLElement | undefined
  let dispose: (() => void) | undefined
  let setSlide: ((x: Slide) => void) | undefined
  let lastSource: MessageEventSource

  function onMessage(event: MessageEvent) {
    if (
      Array.isArray(event.data) &&
      event.data.length == 2 &&
      event.data[0] === MSG_FULLSCREEN
    ) {
      const data = event.data[1] as Slide

      if (setSlide) {
        setSlide(data)
        return
      }

      el = document.createElement("div")
      document.body.appendChild(el)
      const [slide, _] = createSignal(data)
      setSlide = _
      dispose = render(
        () => (
          <AsSvg
            exts={exts}
            slide={slide()}
            class="fixed bottom-0 left-0 right-0 top-0 h-full w-full bg-black object-contain"
          />
        ),
        el,
      )
    }
  }

  function onKeyDown(event: KeyboardEvent) {
    if (
      disposed ||
      event.shiftKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.altKey ||
      event.isComposing
    ) {
      return
    }

    if (!(event.key == "ArrowLeft" || event.key == "ArrowRight")) {
      return
    }

    event.preventDefault()

    lastSource.postMessage([
      MSG_PRESENTER_MOVE,
      {
        ArrowLeft: -1,
        ArrowRight: 1,
      }[event.key],
    ])
  }

  if (typeof window == "object") {
    addEventListener("message", onMessage)
    addEventListener("keydown", onKeyDown)
  }

  return () => {
    if (disposed) return
    disposed = true
    removeEventListener("message", onMessage)
    removeEventListener("keydown", onKeyDown)
    dispose?.()
    el?.remove()
  }
}

export function ViewSpeaker({
  slideshow,
  index: initialIndex,
}: {
  slideshow: Slideshow
  index: number
}) {
  const [index, setIndex] = createSignal(initialIndex)
  const [sidebar, setSidebar] = createSignal(true)

  const self = createMemo(() => slideshow.slides[index()])
  const prev = createMemo(() => slideshow.slides[index() - 1])
  const next = createMemo(() => slideshow.slides[index() + 1])

  const screen = createScreenSize()
  const rem = createRemSize()
  const w = createMemo(
    () => screen.width - 26 * rem() + -sidebar() * 10 * rem(),
  )
  const h = createMemo(() => screen.height - 2 * rem())

  return (
    <div
      class={clsx(
        "grid h-full w-full flex-1",
        sidebar() ? "grid-cols-[10rem,1fr,24rem]" : "grid-cols-[1fr,24rem]",
      )}
    >
      <Show when={sidebar()}>
        <div class="h-full max-h-screen space-y-2 overflow-y-auto p-2 pr-0">
          <For each={slideshow.slides}>
            {(slide, index) => (
              <AsSvg
                class="rounded *:pointer-events-none"
                exts={slideshow.exts}
                slide={slide}
                onClick={() => setIndex(index())}
              />
            )}
          </For>
        </div>
      </Show>
      <div class="flex items-center justify-center p-4">
        <div
          style={{
            height: Math.min(h(), w() * (9 / 16) * 1.5 + 0.5 * rem()) + "px",
            width: Math.min(w(), ((h() - 0.5 * rem()) / 1.5) * (16 / 9)) + "px",
          }}
        >
          <AsSvg
            exts={slideshow.exts}
            class="aspect-video w-full rounded-xl"
            slide={self()}
          />
          <div class="mt-2 flex gap-2">
            <AsSvg
              exts={slideshow.exts}
              class="aspect-video select-none rounded-xl *:pointer-events-none"
              slide={prev()}
              onClick={() => setIndex((x) => Math.max(0, x - 1))}
            />
            <AsSvg
              exts={slideshow.exts}
              class="aspect-video select-none rounded-xl *:pointer-events-none"
              slide={next()}
              onClick={() =>
                setIndex((x) => Math.min(slideshow.slides.length - 1, x + 1))
              }
            />
          </div>
        </div>
      </div>
      <div class="flex h-full max-h-screen flex-col overflow-y-auto bg-z-body font-sans">
        <div class="flex flex-col gap-4 px-3 py-4">
          <Show
            when={self()}
            fallback={
              <p class="italic text-z-subtitle">No slide currently selected.</p>
            }
            keyed
          >
            {(k) => slideshow.exts.SlidePresenter(k)}
          </Show>
        </div>
        <div class="sticky bottom-0 mt-auto flex">
          <button
            class="z-field flex-1 rounded-none border-l-0 border-transparent border-t-z text-z-heading shadow-none hover:bg-z-body-selected"
            onClick={() => {
              const popup = open(location.href)
              if (!popup) {
                alert("Cannot control popup. Reload and try again.")
                return
              }
              createEffect(() => {
                const s = self()
                if (s) {
                  console.log("POSTING")
                  popup.postMessage([MSG_FULLSCREEN, s], "/")
                }
              })
              popup.addEventListener("load", () => {
                const s = self()
                if (s) {
                  popup.postMessage([MSG_FULLSCREEN, s], "/")
                }
              })
            }}
          >
            Present
          </button>
          <button
            class="z-field flex-1 rounded-none border-r-0 border-transparent border-l-z border-t-z text-z-heading shadow-none hover:bg-z-body-selected"
            onClick={() => setSidebar((x) => !x)}
          >
            Sidebar
          </button>
        </div>
      </div>
    </div>
  )
}

export function ViewLatest({ slideshow }: { slideshow: Slideshow }) {
  const self = createMemo(() => slideshow.slides[slideshow.slides.length - 1])

  const screen = createScreenSize()
  const rem = createRemSize()
  const w = createMemo(() => screen.width - 26 * rem())
  const h = createMemo(() => screen.height - 2 * rem())

  return (
    <div class="grid h-full w-full flex-1 grid-cols-[1fr,24rem]">
      <div class="flex h-full items-center justify-center p-4">
        <div
          style={{
            height: Math.min(h(), w() * (9 / 16)) + "px",
            width: Math.min(w(), h() * (16 / 9)) + "px",
          }}
        >
          <AsSvg exts={slideshow.exts} class="rounded-xl" slide={self()} />
        </div>
      </div>
      <div class="flex h-full max-h-screen flex-col gap-4 overflow-y-auto bg-z-body px-3 py-4 font-sans">
        <Show
          when={self()}
          fallback={
            <p class="italic text-z-subtitle">No slide currently selected.</p>
          }
        >
          {(k) => slideshow.exts.SlidePresenter(k())}
        </Show>
      </div>
    </div>
  )
}

export function ViewDocument({ slideshow }: { slideshow: Slideshow }) {
  return (
    <div class="relative mx-auto flex h-full w-full max-w-7xl flex-col">
      <For each={slideshow.slides}>
        {(slide) => (
          <div class="group/gridel grid w-full grid-cols-[auto,24rem]">
            <div class="border-t border-transparent px-4 py-6 group-first/gridel:border-t-0">
              <AsSvg exts={slideshow.exts} class="rounded-xl" slide={slide} />
            </div>
            <div class="flex flex-col gap-4 border-t border-z bg-z-body px-3 py-6 font-sans group-first/gridel:border-t-0">
              {slideshow.exts.SlidePresenter(slide)}
            </div>
          </div>
        )}
      </For>
    </div>
  )
}

export function ViewEntry({ slideshow }: { slideshow: Slideshow }) {
  const list = getVocab(slideshow)

  return (
    <div class="flex flex-col gap-16 p-4">
      <For each={slideshow.groups}>
        {(group) => (
          <div class="flex flex-col gap-2">
            <h2 class="rounded-b rounded-t-xl bg-z-body-selected px-4 py-3 font-sans text-2xl font-semibold text-z-heading">
              <span class="mr-3 font-['Fira_Code',monospace] font-normal text-z-subtitle">
                {slideshow.exts.Text(group.abbr)}
              </span>
              {slideshow.exts.Text(group.title)}
            </h2>

            <Vocab exts={slideshow.exts} group={group} list={list} />

            <div class="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-2">
              <For each={group.slides}>
                {(slide) => slideshow.exts.SlideEntry(slide, createFilter())}
              </For>
            </div>

            <div class="grid grid-cols-[repeat(auto-fill,minmax(18rem,1fr))] gap-2 border-t border-dashed border-z pt-2">
              <For each={group.prints.flat()}>
                {(print) => slideshow.exts.PrintEntry(print, createFilter())}
              </For>
            </div>
          </div>
        )}
      </For>
    </div>
  )
}

function Vocab({
  exts,
  group,
  list,
}: {
  exts: Exts
  group: Group
  list: VocabList
}): JSX.Element {
  const refMap = list.refs.get(group)
  if (!refMap) return

  const counted = countShownToAudience(refMap)

  return (
    <div class="-mt-2 flex flex-col gap-1">
      <For each={Array.from(list.defs)}>
        {([group, defMap]) => {
          const counts = new Map<string, number>()
          for (const words of defMap.values()) {
            for (const word of words.keys()) {
              counts.set(word, counted.get(word) ?? 0)
            }
          }

          let areAnyFilled = false
          for (const value of counts.values()) {
            if (value != 0) {
              areAnyFilled = true
              break
            }
          }
          if (!areAnyFilled) return

          return (
            <div class="grid grid-cols-[repeat(auto-fill,minmax(4rem,1fr))] items-center rounded bg-z-body-darkened px-4 first:mt-2">
              <p class="font-mono text-lg text-z-subtitle">
                {exts.Text(group.abbr)}
              </p>
              <For each={Array.from(counts).sort(([, a], [, b]) => b - a)}>
                {([word, count]) => (
                  <p>
                    <span class="font-sp-sans text-2xl text-z-heading">
                      {word}
                    </span>
                    <span class="font-sans text-sm text-z">{count}</span>
                  </p>
                )}
              </For>
            </div>
          )
        }}
      </For>
    </div>
  )
}

export function ViewEdit({ slideshow }: { slideshow: Slideshow }) {
  const [current] = createSignal(slideshow.slides[slideshow.slides.length - 8])

  return (
    <div class="mx-auto grid h-screen max-h-screen flex-1 grid-cols-[8rem,960px,0.5rem,24rem,0.5rem]">
      <div class="h-full space-y-2 overflow-y-auto p-2">
        <For each={slideshow.slides}>
          {(slide) => (
            <AsSvg
              exts={slideshow.exts}
              slide={slide}
              class="w-full rounded *:pointer-events-none"
            />
          )}
        </For>
      </div>
      <div class="flex flex-1 flex-col gap-2 py-2">
        <AsSvg
          class="size-slide mx-auto rounded-lg"
          exts={slideshow.exts}
          slide={current()}
        />
        <pre class="flex flex-1 items-center justify-center rounded-lg bg-z-body italic text-z-subtitle">
          this block reserved for future expansion
        </pre>
      </div>
      <div />
      <div class="flex h-full py-2">
        <div class="flex flex-col gap-4 rounded-lg bg-z-body px-3 py-4">
          <Show when={current()}>
            {slideshow.exts.SlidePresenter(current()!)}
          </Show>
        </div>
      </div>
      <div />
    </div>
  )
}

export function ViewPrint({ slideshow }: { slideshow: Slideshow }) {
  return (
    <For each={slideshow.prints}>
      {([front, back]) => (
        <>
          <div class="flex break-inside-auto">
            {slideshow.exts.Print(front)}
            {slideshow.exts.Print(front)}
          </div>
          <div class="flex break-inside-auto">
            {slideshow.exts.Print(back)}
            {slideshow.exts.Print(back)}
          </div>
        </>
      )}
    </For>
  )
}

export function ViewCover({ slideshow }: { slideshow: Slideshow }) {
  const slide = slideshow.slides[0]
  if (!slide) {
    return undefined
  }
  return (
    <AsSvg
      exts={slideshow.exts}
      slide={slide}
      class="fixed bottom-0 left-0 right-0 top-0 h-full w-full bg-black object-contain"
    />
  )
}

export function ViewIndex({
  slug,
  slideshow,
  title,
}: {
  slug: string
  slideshow: Slideshow
  title: Text
}) {
  return (
    <div class="m-auto flex w-96 max-w-full flex-col font-sans text-z">
      <h1 class="mb-4 text-center text-2xl font-semibold text-z-heading">
        {slideshow.exts.Text(title)}
      </h1>
      <div class="flex flex-col gap-2">
        <A
          view="doc"
          label="Doc"
          icon={faFileText}
          desc="Recommended for reviewing the slide deck."
        />
        <A
          view="present"
          label="Present"
          icon={faTv}
          desc="Displays the slide deck for an audience."
        />
        <A
          view="print"
          label="Print"
          icon={faPrint}
          desc="Generates this slideshow's print-outs."
        />
        <A
          view="entry"
          label="Entry"
          icon={faTableCellsLarge}
          desc="Collects media, examples, and vocab."
        />
      </div>
      <p class="mt-8 text-center text-lg font-semibold text-z-heading">
        Sections
      </p>
      <div class="flex flex-col">
        <For each={slideshow.groups}>
          {(group) => (
            <div class="flex gap-2">
              <span class="font-mono text-z-subtitle">
                {slideshow.exts.Text(group.abbr)}
              </span>
              <span>{slideshow.exts.Text(group.title)}</span>
            </div>
          )}
        </For>
      </div>
    </div>
  )

  function A(props: {
    view: Exclude<View, "" | undefined>
    label: string
    icon: IconDefinition
    desc: JSX.Element
  }) {
    return (
      <a
        class="z-field relative flex flex-1 px-4 shadow-none"
        href={`/${slug}/${props.view}`}
      >
        <div class="grid w-full grid-cols-[1.5rem,auto] items-center gap-x-4">
          <Fa icon={props.icon} class="row-span-2 block size-6" title={false} />
          <p class="font-semibold text-z-heading">{props.label}</p>
          <p class="text-sm text-z-subtitle">{props.desc}</p>
        </div>
        <Fa
          class="absolute right-2 top-2 size-4 icon-blue-500"
          icon={faExternalLink}
          title="Open Link"
        />
      </a>
    )
  }
}
