import { Show, type JSX } from "solid-js"

export function Ch(props: { children: JSX.Element }) {
  return (
    <div class="relative flex flex-col items-center justify-center rounded border-l border-z bg-z-body-darkened px-4 py-3 text-z">
      {props.children}
    </div>
  )
}

export function Ex(props: { children: JSX.Element }) {
  return (
    <div class="flex flex-col items-center justify-center p-1 text-z">
      {props.children}
    </div>
  )
}

export function MaybeCh(props: { children: JSX.Element; ch: boolean }) {
  return (
    <Show when={props.ch} fallback={<Ex>{props.children}</Ex>}>
      <Ch>{props.children}</Ch>
    </Show>
  )
}
