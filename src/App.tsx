import { createMemo, For } from "solid-js"
import { PresenterNotes, Render, RenderScalable } from "./el/Slide"
import { slides } from "./lib/helpers"
import { createRemSize } from "./lib/rem"
import { createScreenSize } from "./lib/size"
import type { SlideStandard } from "./lib/types"
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

export function PresenterView(props: { children: SlideStandard }) {
  const rem = createRemSize()
  const aspectRatio = createMemo(() => 960 / (540 + rem() + 540 / 2))
  const screen = createScreenSize()
  const w = createMemo(() => screen.width - 28 * rem())
  const h = createMemo(() => screen.height - 4 * rem())

  return (
    <div class="grid h-screen w-screen grid-cols-[1fr,24rem] bg-slate-300">
      <div class="flex items-center justify-center p-8">
        <div
          class="flex flex-col gap-4"
          style={{ width: Math.min(w(), aspectRatio() * h()) + "px" }}
        >
          <RenderScalable class="rounded-xl">{props.children}</RenderScalable>
          <div class="flex w-full gap-4">
            <RenderScalable class="rounded-xl">{props.children}</RenderScalable>
            <RenderScalable class="rounded-xl">{props.children}</RenderScalable>
          </div>
        </div>
      </div>
      <PresenterNotes class="h-screen bg-white p-4">
        {props.children}
      </PresenterNotes>
    </div>
  )

  {
    /* return (
  //   <div class="flex h-full w-full bg-slate-300 p-8">
  //     <div class="m-auto grid w-full grid-cols-[1fr,24rem] gap-4">
  //       <svg viewBox="0 0 960 540" class="rounded-xl">
  //         <foreignObject
  //           x={0}
  //           y={0}
  //           width={960}
  //           height={540}
  //           viewBox="0 0 960 540"
  //         >
  //           <Render>{props.children}</Render>
  //         </foreignObject>
  //       </svg>

  //       <PresenterNotes class="rounded-xl bg-white p-4">
  //         {props.children}
  //       </PresenterNotes>

  //       <div class="flex gap-4">
  //         <svg viewBox="0 0 960 540" class="cursor-w-resize rounded-xl">
  //           <foreignObject
  //             x={0}
  //             y={0}
  //             width={960}
  //             height={540}
  //             viewBox="0 0 960 540"
  //             class="pointer-events-none select-none"
  //           >
  //             <Render>{props.children}</Render>
  //           </foreignObject>
  //         </svg>

  //         <svg viewBox="0 0 960 540" class="cursor-e-resize rounded-xl">
  //           <foreignObject
  //             x={0}
  //             y={0}
  //             width={960}
  //             height={540}
  //             viewBox="0 0 960 540"
  //             class="pointer-events-none select-none"
  //           >
  //             <Render>{props.children}</Render>
  //           </foreignObject>
  //         </svg>
  //       </div>
  //     </div>
  //   </div>
  // ) */
  }
}

export default () => (
  <PresenterView>{SLIDE_PREPOSITIONS_AS_PREDICATES}</PresenterView>
)
