import type { Exts } from "./exts"
import type { Slide } from "./types"

export function AsSvg(props: {
  exts: Exts
  slide: Slide
  class?: string
  onClick?: () => void
}) {
  const exts = props.exts
  return (
    <svg viewBox="0 0 960 540" class={props.class} onClick={props.onClick}>
      <foreignObject x={0} y={0} width={960} height={540} viewBox="0 0 960 540">
        {exts.Slide(props.slide)}
      </foreignObject>
    </svg>
  )
}
