import { Show, type JSX } from "solid-js"
import { clsx } from "./clsx"

export function Ch(props: { children: JSX.Element; class?: string }) {
  return (
    <div
      class={clsx(
        "relative flex flex-col items-center justify-center rounded border-l border-z bg-z-body-darkened px-4 py-3 text-z",
        props.class,
      )}
    >
      {props.children}
    </div>
  )
}

export function MaybeCh(props: {
  children: JSX.Element
  ch: boolean
  class?: string
}) {
  return (
    <Show
      when={props.ch}
      fallback={
        <div
          class={clsx(
            "flex flex-col items-center justify-center p-1 text-z",
            props.class,
          )}
        >
          {props.children}
        </div>
      }
    >
      <Ch>{props.children}</Ch>
    </Show>
  )
}
