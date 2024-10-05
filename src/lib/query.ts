import type { Kind } from "./types"

type Query<T extends string> = T | null | (string & {})

const url = new URL(location.href)
const params = url.searchParams

export type QKind = Exclude<Kind, "done"> | "!done"
export type QFilter = "review" | "content"
export type QView = "home" | "review" | "collect" | "latest"

export const KINDS = params.getAll("kind") as (QKind | (string & {}))[]
export const FILTER = params.get("filter") as Query<QFilter>
export const VIEW = params.get("view") as Query<QView>

export function set(key: "filter", value: QFilter | null): void
export function set(key: "view", value: QView | null): void
export function set(key: string, value: string | null) {
  const next = new URL(url)
  if (value == null) {
    next.searchParams.delete(key)
  } else {
    next.searchParams.set(key, value)
  }
  location.href = next.href
}

export function setKind(value: QKind, active: boolean) {
  const next = new URL(url)
  if (!active) {
    next.searchParams.delete("kind", value)
  } else if (!KINDS.includes(value)) {
    next.searchParams.append("kind", value)
  }
  location.href = next.href
}
