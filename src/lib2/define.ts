import type { ExtKinds, ExtKindsUntyped } from "./types"

function defineInner<K extends keyof ExtKindsUntyped, I extends string>(
  kind: K,
  id: string extends I ? never : I,
  data: Omit<ExtKinds<unknown, I>[K], "kind" | "id">,
): ExtKinds<unknown, I>[K] {
  return { kind, id, ...data } as any
}

export function definePlugin<T>() {
  return defineInner as <K extends keyof ExtKindsUntyped, I extends string>(
    kind: K,
    id: string extends I ? never : I,
    data: Omit<ExtKinds<T, I>[K], "kind" | "id">,
  ) => ExtKinds<T, I>[K]
}
