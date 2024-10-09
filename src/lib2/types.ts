import type { JSX } from "solid-js"
import type { Slideshow } from "./slideshow"

export const KIND = Symbol()

export type ItemUntagged = readonly [extId: string, data: object]
export type Item<K extends string> = ItemUntagged & { [KIND]?: K }
export type Aside = Item<"aside">
export type Collect = Item<"collect">
export type Content = Item<"content">
export type Note = Item<"note">
export type Sheet = Item<"sheet">
export type Slide = Item<"slide">
export type Text = Item<"text">
export type Vocab = Item<"vocab">

export interface Ext<K extends string, I extends string> {
  props?: unknown
  id: I
  kind: K
}

export interface ExtAside<T, I extends string> extends Ext<"aside", I> {
  slide(data: T, slideshow: Slideshow): JSX.Element
  presenter(data: T, slideshow: Slideshow): JSX.Element
  collect(data: T, slideshow: Slideshow): JSX.Element
}

export interface ExtCollect<T, I extends string> extends Ext<"collect", I> {
  render(data: T, slideshow: Slideshow): JSX.Element
}

export interface ExtContent<T, I extends string> extends Ext<"content", I> {
  slide(data: T, slideshow: Slideshow): JSX.Element
  sheet(data: T, slideshow: Slideshow): JSX.Element
  presenter(data: T, slideshow: Slideshow): JSX.Element
  collect(data: T, slideshow: Slideshow): JSX.Element
}

export interface ExtNote<T, I extends string> extends Ext<"note", I> {
  presenter(data: T, slideshow: Slideshow): JSX.Element
}

export interface ExtSheet<T, I extends string> extends Ext<"sheet", I> {
  render(data: T, slideshow: Slideshow): JSX.Element
  collect(data: T, slideshow: Slideshow): JSX.Element
}

export interface ExtSlide<T, I extends string> extends Ext<"slide", I> {
  render(data: T, slideshow: Slideshow): JSX.Element
  presenter(data: T, slideshow: Slideshow): JSX.Element
  collect(data: T, slideshow: Slideshow): JSX.Element
}

export interface ExtText<T, I extends string> extends Ext<"text", I> {
  render(data: T, slideshow: Slideshow): JSX.Element
}

export interface ExtVocab<T, I extends string> extends Ext<"vocab", I> {
  render(data: T, slideshow: Slideshow): JSX.Element
  withoutDefinition(data: T, slideshow: Slideshow): JSX.Element
  presenter(data: T, slideshow: Slideshow): JSX.Element
}

export interface ExtKinds<T, I extends string> {
  aside: ExtAside<T, I>
  collect: ExtCollect<T, I>
  content: ExtContent<T, I>
  note: ExtNote<T, I>
  sheet: ExtSheet<T, I>
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
