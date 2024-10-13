import type { JSXElement } from "solid-js"
import type { ExtKinds, ExtKindsUntyped, Json } from "./types"

function defineInner<K extends keyof ExtKindsUntyped, I extends string>(
  kind: K,
  id: string extends I ? never : I,
  data: Omit<ExtKinds<Json, I>[K], "kind" | "id">,
): ExtKinds<Json, I>[K] {
  return { kind, id, ...data } as any
}

export function defineExt<T extends Json>() {
  return defineInner as <K extends keyof ExtKindsUntyped, I extends string>(
    kind: K,
    id: string extends I ? never : I,
    data: Omit<ExtKinds<T, I>[K], "kind" | "id">,
  ) => ExtKinds<T, I>[K]
}

export function unimpl(): JSXElement {
  return <span>unimplemented</span>
}
