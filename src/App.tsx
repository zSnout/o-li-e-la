import { faFaceSurprise } from "@fortawesome/free-regular-svg-icons"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons/faArrowLeft"
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons/faArrowUpRightFromSquare"
import { faExpand } from "@fortawesome/free-solid-svg-icons/faExpand"
import { createMemo, For, Show } from "solid-js"
import { Fa } from "./el/Fa"
import { PresenterNotes, Render, RenderScalable } from "./el/Slide"
import { slides } from "./lib/helpers"
import { createRemSize } from "./lib/rem"
import { createScreenSize } from "./lib/size"
import type { AnySlide } from "./lib/types"
import { SLIDE_PREPOSITIONS_AS_PREDICATES } from "./slides/test"

export function ViewAllSlides() {
  return (
    <div class="flex flex-col items-center gap-4 p-8">
      <For each={slides}>
        {(slide) => (
          <div class="flex gap-4">
            <Render class="rounded-xl">{slide}</Render>
            <PresenterNotes class="hx-slide wx-96 rounded-xl bg-white p-4">
              {slide}
            </PresenterNotes>
          </div>
        )}
      </For>
    </div>
  )
}

export function PresenterView(props: { children: AnySlide }) {
  const rem = createRemSize()
  const aspectRatio = createMemo(() => 960 / (540 + rem() + 540 / 2))
  const screen = createScreenSize()
  const w = createMemo(() => screen.width - 28 * rem())
  const h = createMemo(() => screen.height - 4 * rem())

  const prev = createMemo(() => slides[props.children.id - 1])
  const next = createMemo(() => slides[props.children.id + 1])

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

          <button class="flex items-center justify-center gap-2 border-r border-z py-2 focus-visible:bg-z-body-selected focus-visible:outline-none hover:bg-z-body-selected">
            <Fa class="size-4" icon={faExpand} title={false} /> Present
          </button>

          <button class="flex items-center justify-center gap-2 py-2 focus-visible:bg-z-body-selected focus-visible:outline-none hover:bg-z-body-selected">
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
          <RenderScalable class="select-none rounded-xl">
            {slide}
          </RenderScalable>
        )}
      </Show>
    )
  }
}

export default () => (
  <PresenterView>{SLIDE_PREPOSITIONS_AS_PREDICATES}</PresenterView>
)
