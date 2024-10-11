import { createSignal, Show } from "solid-js"
import { render } from "solid-js/web"
import { AsSvg } from "./AsSvg"
import { standard } from "./ext/slide/standard"
import { Exts } from "./exts"
import type { Print, Slide, Text } from "./types"

export class Slideshow {
  readonly exts = new Exts()
  readonly groups: Group[] = []
  readonly slides: Slide[] = []
  readonly prints: Print[] = []

  /**
   * If `unlink` is true, the returned `Group` will not save its slides or
   * prints to this slideshow. This can be useful when creating draft
   * slideshows, for instance.
   */
  group(title: Text, abbr: Text, unlink?: boolean): Group {
    return new Group(unlink ? undefined : this, title, abbr)
  }
}

export class Group {
  readonly slides: Slide[] = []
  readonly prints: Print[] = []

  constructor(
    private readonly parent: Slideshow | undefined,
    readonly title: Text,
    readonly abbr: Text,
  ) {}

  slide(slide: Slide) {
    this.slides.push(slide)
    this.parent?.slides.push(slide)
  }

  print(print: Print) {
    this.prints.push(print)
    this.parent?.prints.push(print)
  }
}

export function startBackgroundProcess(exts: Exts): () => void {
  let disposed = false
  let el: HTMLElement | undefined
  let dispose: (() => void) | undefined
  let setSlide: ((x: Slide) => void) | undefined
  let lastSource: MessageEventSource

  function onMessage(event: MessageEvent) {
    if (
      Array.isArray(event) &&
      event.length == 2 &&
      event[0] === "@zsnout/slides:fullscreen"
    ) {
      event.stopImmediatePropagation()
      const data = event[1] as Slide

      if (setSlide) {
        setSlide(data)
        return
      }

      el = document.createElement("div")
      document.body.appendChild(el)
      const tuple = createSignal<Slide>(standard([]))
      const slide = tuple[0]
      setSlide = tuple[1]
      dispose = render(
        () => (
          <Show when={slide()}>
            {(s) => (
              <AsSvg
                exts={exts}
                slide={s()}
                class="fixed bottom-0 left-0 right-0 top-0 h-full w-full bg-black object-contain"
              />
            )}
          </Show>
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
    event.stopImmediatePropagation()

    lastSource.postMessage([
      "@zsnout/slideshow:presenter/move",
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

export function ViewSpeaker() {}
