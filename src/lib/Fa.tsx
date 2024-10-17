import type { IconDefinition } from "@fortawesome/free-solid-svg-icons"

export function Fa(props: {
  class: string
  icon: IconDefinition
  title: string | false
}) {
  return (
    <svg
      class={`overflow-visible transition ${props.class}`}
      fill="var(--icon-fill)"
      role={props.title === false ? "presentation" : "img"}
      viewBox={`0 0 ${props.icon.icon[0]} ${props.icon.icon[1]}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{props.title ?? "<no title>"}</title>
      <path d={String(props.icon.icon[4])}></path>
    </svg>
  )
}
