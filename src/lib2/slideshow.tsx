import { createEffect, createMemo, createSignal, For, Show } from "solid-js"
import { render } from "solid-js/web"
import { createRemSize } from "../lib/rem"
import { createScreenSize } from "../lib/size"
import { AsSvg } from "./AsSvg"
import { Exts } from "./exts"
import {
  finishAll,
  type Into,
  type Print,
  type Slide,
  type Text,
} from "./types"

export class Slideshow {
  readonly exts = new Exts()
  readonly groups: Group[] = []
  readonly slides: Slide[] = []
  readonly prints: Print[] = []

  adopt(group: Group) {
    this.slides.push(...group.slides)
    this.prints.push(...group.prints)
  }
}

export class Group {
  readonly slides: Slide[] = []
  readonly prints: Print[] = []

  constructor(
    readonly title: Text,
    readonly abbr: Text,
  ) {}

  slide(...slides: Into<Slide>[]) {
    this.slides.push(...finishAll(slides))
  }

  print(...prints: Into<Print>[]) {
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

  addEventListener("message", onMessage)
  addEventListener("keydown", onKeyDown)

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

  const self = createMemo(() => slideshow.slides[index()])
  const prev = createMemo(() => slideshow.slides[index() - 1])
  const next = createMemo(() => slideshow.slides[index() + 1])

  const screen = createScreenSize()
  const rem = createRemSize()
  const w = createMemo(() => screen.width - 26 * rem())
  const h = createMemo(() => screen.height - 2 * rem())

  return (
    <div class="grid h-full w-full grid-cols-[1fr,24rem]">
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
      <div class="flex h-full flex-col gap-2 overflow-y-auto bg-z-body px-3 py-4 font-sans">
        <Show
          when={self()}
          fallback={
            <p class="italic text-z-subtitle">No slide currently selected.</p>
          }
          keyed
        >
          {(k) => slideshow.exts.SlidePresenter(k)}
        </Show>
        <button
          class="z-field mt-auto"
          onClick={() => {
            const popup = open(location.href)
            if (!popup) {
              alert("Cannot control popup. Reload and try again.")
              return
            }
            createEffect(() => {
              const s = self()
              if (s) {
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
          popup
        </button>
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
    <div class="grid h-full w-full grid-cols-[1fr,24rem]">
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
      <div class="flex h-full flex-col gap-2 overflow-y-auto bg-z-body px-3 py-4 font-sans">
        <Show
          when={self()}
          fallback={
            <p class="italic text-z-subtitle">No slide currently selected.</p>
          }
        >
          {(k) => slideshow.exts.SlidePresenter(k())}
        </Show>
        <button
          class="z-field"
          onClick={() => {
            const popup = open(location.href)
            if (!popup) {
              alert("Cannot control popup. Reload and try again.")
              return
            }
            createEffect(() => {
              const s = self()
              if (s) {
                popup.postMessage([MSG_FULLSCREEN, s], "/")
              }
            })
          }}
        >
          popup
        </button>
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
            <div class="flex flex-col gap-2 border-t border-z bg-z-body px-3 py-6 font-sans group-first/gridel:border-t-0">
              {slideshow.exts.SlidePresenter(slide)}
            </div>
          </div>
        )}
      </For>
    </div>
  )
}
