import type { JSX } from "solid-js"
import type { Slideshow } from "./slideshow"

export declare const KIND: unique symbol
export declare const LANG: unique symbol

export type ItemUntagged = readonly [extId: string, data: unknown]
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

export interface Ext<K extends string, I extends string> {
  props?: unknown
  id: I
  kind: K
}

export interface ExtAside<T, I extends string> extends Ext<"aside", I> {
  slide(data: T, slideshow: Slideshow): JSX.Element
  presenter(data: NoInfer<T>, slideshow: Slideshow): JSX.Element
  entry(data: NoInfer<T>, slideshow: Slideshow): JSX.Element
}

export interface ExtContent<T, I extends string> extends Ext<"content", I> {
  slide(data: T, slideshow: Slideshow): JSX.Element
  print(data: NoInfer<T>, slideshow: Slideshow): JSX.Element
  presenter(data: NoInfer<T>, slideshow: Slideshow): JSX.Element
  entry(data: NoInfer<T>, slideshow: Slideshow): JSX.Element
}

export interface ExtEntry<T, I extends string> extends Ext<"entry", I> {
  render(data: T, slideshow: Slideshow): JSX.Element
}

export interface ExtNote<T, I extends string> extends Ext<"note", I> {
  presenter(data: T, slideshow: Slideshow): JSX.Element
}

export interface ExtPrint<T, I extends string> extends Ext<"print", I> {
  render(data: T, slideshow: Slideshow): JSX.Element
  entry(data: NoInfer<T>, slideshow: Slideshow): JSX.Element
}

export interface ExtSlide<T, I extends string> extends Ext<"slide", I> {
  render(data: T, slideshow: Slideshow): JSX.Element
  presenter(data: NoInfer<T>, slideshow: Slideshow): JSX.Element
  entry(data: NoInfer<T>, slideshow: Slideshow): JSX.Element
}

export interface ExtText<T, I extends string> extends Ext<"text", I> {
  render(data: T, slideshow: Slideshow): JSX.Element
}

export interface ExtVocab<T, I extends string> extends Ext<"vocab", I> {
  render(data: T, slideshow: Slideshow): JSX.Element
  withoutDefinition(data: NoInfer<T>, slideshow: Slideshow): JSX.Element
  presenter(data: NoInfer<T>, slideshow: Slideshow): JSX.Element
}

export interface ExtKinds<T, I extends string> {
  aside: ExtAside<T, I>
  entry: ExtEntry<T, I>
  content: ExtContent<T, I>
  note: ExtNote<T, I>
  print: ExtPrint<T, I>
  slide: ExtSlide<T, I>
  text: ExtText<T, I>
  vocab: ExtVocab<T, I>
}

export type ExtKindsUntyped = ExtKinds<unknown, string>

export type SlideshowData = {
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
