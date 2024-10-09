import type { ExtKinds, ExtKindsUntyped } from "./types"

export type InferExt<
  K extends keyof ExtKindsUntyped,
  I extends string,
  T extends Omit<ExtKindsUntyped[K], "kind" | "id">,
> =
  T & { kind: K; id: I } extends ExtKinds<infer T, I>[K] ? ExtKinds<T, I>[K]
  : never

export function definePlugin<
  K extends keyof ExtKindsUntyped,
  I extends string,
  T extends Omit<ExtKinds<unknown, I>[K], "kind" | "id">,
>(kind: K, id: string extends I ? never : I, data: T): InferExt<K, I, T> {
  return { kind, id, ...data } as any as InferExt<K, I, T>
}

export function definePluginByData<
  K extends keyof ExtKindsUntyped,
  I extends string,
  T,
>(
  kind: K,
  id: string extends I ? never : I,
  data: Omit<ExtKinds<T, I>[K], "kind" | "id">,
): ExtKinds<T, I>[K] {
  return { kind, id, ...data } as any
}
