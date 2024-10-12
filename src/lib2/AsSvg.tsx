import { faFaceMehBlank } from "@fortawesome/free-regular-svg-icons"
import { Show } from "solid-js"
import { Fa } from "../el/Fa"
import { clsx } from "./clsx"
import type { Exts } from "./exts"
import type { Slide } from "./types"

export function AsSvg(props: {
  exts: Exts
  slide?: Slide
  class?: string
  onClick?: () => void
}) {
  const exts = props.exts
  return (
    <svg
      viewBox="0 0 960 540"
      class={clsx(
        !props.slide && "border border-dashed border-z-text-subtitle",
        props.class,
      )}
      onClick={props.onClick}
    >
      <foreignObject x={0} y={0} width={960} height={540} viewBox="0 0 960 540">
        <Show
          when={props.slide}
          fallback={
            <div class="size-slide flex flex-col items-center justify-center gap-16">
              <Fa icon={faFaceMehBlank} class="size-32" title={false} />
              <p class="text-center font-sans text-6xl italic text-z-heading">
                No slide available.
              </p>
            </div>
          }
        >
          {exts.Slide(props.slide!)}
        </Show>
      </foreignObject>
    </svg>
  )
}
