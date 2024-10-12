import type { JSX } from "solid-js"
import type { Exts } from "./exts"

export declare const KIND: unique symbol
export declare const LANG: unique symbol

export type Json =
  | number
  | string
  | boolean
  | null
  | readonly Json[]
  | { readonly [x: string]: Json }

export type Many<T> = readonly [T, ...T[]]

export type ItemUntagged = readonly [extId: string, data: Json]
export type Item<K extends string> = ItemUntagged & { [KIND]?: K }

export type Aside = Item<"aside">
export type Content = Item<"content">
export type Entry = Item<"entry">
export type Note = Item<"note">
export type Print = Item<"print">
export type Slide = Item<"slide">
export type Text = Item<"text">
export type Vocab = Item<"vocab">

export type TextOf<K extends string> = Item<"text"> & { [LANG]?: K }
export type TextCtx<K extends string> = readonly [
  ctx: TextOf<K>,
  main: TextOf<K>,
]
export type TextCtxFull<K extends string> = readonly [
  split: TextCtx<K>,
  full: Many<TextOf<K>>,
]

export interface Ext<K extends string, I extends string> {
  id: I
  kind: K
}

export interface ExtAside<T extends Json, I extends string>
  extends Ext<"aside", I> {
  slide(data: T, exts: Exts): JSX.Element
  presenter(data: NoInfer<T>, exts: Exts): JSX.Element
  entry(data: NoInfer<T>, exts: Exts): JSX.Element
}

export interface ExtContent<T extends Json, I extends string>
  extends Ext<"content", I> {
  slide(data: T, exts: Exts): JSX.Element
  print(data: NoInfer<T>, exts: Exts): JSX.Element
  presenter(data: NoInfer<T>, exts: Exts): JSX.Element
  entry(data: NoInfer<T>, exts: Exts): JSX.Element
}

export interface ExtEntry<T extends Json, I extends string>
  extends Ext<"entry", I> {
  render(data: T, exts: Exts): JSX.Element
}

export interface ExtNote<T extends Json, I extends string>
  extends Ext<"note", I> {
  presenter(data: T, exts: Exts): JSX.Element
}

export interface ExtPrint<T extends Json, I extends string>
  extends Ext<"print", I> {
  render(data: T, exts: Exts): JSX.Element
  entry(data: NoInfer<T>, exts: Exts): JSX.Element
}

export interface ExtSlide<T extends Json, I extends string>
  extends Ext<"slide", I> {
  render(data: T, exts: Exts): JSX.Element
  presenter(data: NoInfer<T>, exts: Exts): JSX.Element
  entry(data: NoInfer<T>, exts: Exts): JSX.Element
}

export interface ExtText<T extends Json, I extends string>
  extends Ext<"text", I> {
  render(data: T, exts: Exts): JSX.Element
  renderChallenge(data: T, exts: Exts): JSX.Element
  entry(data: NoInfer<T>, exts: Exts): JSX.Element
}

export interface ExtVocab<T extends Json, I extends string>
  extends Ext<"vocab", I> {
  render(data: T, exts: Exts): JSX.Element
  withoutDefinition(data: NoInfer<T>, exts: Exts): JSX.Element
  presenter(data: NoInfer<T>, exts: Exts): JSX.Element
}

export interface ExtKinds<T extends Json, I extends string> {
  aside: ExtAside<T, I>
  entry: ExtEntry<T, I>
  content: ExtContent<T, I>
  note: ExtNote<T, I>
  print: ExtPrint<T, I>
  slide: ExtSlide<T, I>
  text: ExtText<T, I>
  vocab: ExtVocab<T, I>
}

export type ExtKindsUntyped = ExtKinds<Json, string>

export type ExtsData = {
  readonly [K in keyof ExtKindsUntyped]: {
    [id: string]: ExtKindsUntyped[K]
  }
}

export type ExtData<T> =
  T extends ExtKinds<infer U, infer _>[keyof ExtKindsUntyped] ? U : never

export type Into<T> = T | { done(): T }

export function finish<T>(x: Into<T>): T {
  const f: unknown = (x as any)?.done
  if (typeof f == "function") {
    return f.call(x)
  }
  return x as T
}

export function finishAll<T>(x: readonly Into<T>[]): T[] {
  return x.map(finish)
}
