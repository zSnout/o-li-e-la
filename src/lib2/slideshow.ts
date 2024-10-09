import { untrack, type JSX } from "solid-js"
import type {
  Aside,
  Content,
  ExtKindsUntyped,
  SlideshowData,
  Text,
} from "./types"

export class Slideshow implements SlideshowData {
  readonly aside: SlideshowData["aside"] = Object.create(null)
  readonly collect: SlideshowData["collect"] = Object.create(null)
  readonly content: SlideshowData["content"] = Object.create(null)
  readonly note: SlideshowData["note"] = Object.create(null)
  readonly sheet: SlideshowData["sheet"] = Object.create(null)
  readonly slide: SlideshowData["slide"] = Object.create(null)
  readonly text: SlideshowData["text"] = Object.create(null)
  readonly vocab: SlideshowData["vocab"] = Object.create(null)

  add(...exts: ExtKindsUntyped[keyof ExtKindsUntyped][]) {
    for (const ext of exts) {
      this[ext.kind][ext.id] = ext
    }
  }

  Text(item: Text): JSX.Element {
    const el = this.text[item[0]]
    return untrack(() => el?.render(item[1], this))
  }

  AsideSlide(item: Aside): JSX.Element {
    const el = this.aside[item[0]]
    return untrack(() => el?.slide(item[1], this))
  }

  AsidePresenter(item: Aside): JSX.Element {
    const el = this.aside[item[0]]
    return untrack(() => el?.presenter(item[1], this))
  }

  AsideCollect(item: Aside): JSX.Element {
    const el = this.aside[item[0]]
    return untrack(() => el?.collect(item[1], this))
  }

  ContentSlide(item: Content): JSX.Element {
    const el = this.content[item[0]]
    return untrack(() => el?.slide(item[1], this))
  }

  ContentSheet(item: Content): JSX.Element {
    const el = this.content[item[0]]
    return untrack(() => el?.sheet(item[1], this))
  }

  ContentPresenter(item: Content): JSX.Element {
    const el = this.content[item[0]]
    return untrack(() => el?.presenter(item[1], this))
  }

  ContentCollect(item: Content): JSX.Element {
    const el = this.content[item[0]]
    return untrack(() => el?.collect(item[1], this))
  }
}
