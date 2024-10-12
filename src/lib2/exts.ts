import { untrack, type JSX } from "solid-js"
import type {
  Aside,
  Content,
  ExtKindsUntyped,
  ExtsData,
  Note,
  Slide,
  Text,
  Vocab,
} from "./types"

export class Exts implements ExtsData {
  readonly aside: ExtsData["aside"] = Object.create(null)
  readonly content: ExtsData["content"] = Object.create(null)
  readonly entry: ExtsData["entry"] = Object.create(null)
  readonly note: ExtsData["note"] = Object.create(null)
  readonly print: ExtsData["print"] = Object.create(null)
  readonly slide: ExtsData["slide"] = Object.create(null)
  readonly text: ExtsData["text"] = Object.create(null)
  readonly vocab: ExtsData["vocab"] = Object.create(null)

  add(...exts: ExtKindsUntyped[keyof ExtKindsUntyped][]): this {
    for (const ext of exts) {
      this[ext.kind][ext.id] = ext
    }
    return this
  }

  Text(item: Text): JSX.Element {
    const el = this.text[item[0]]
    if (!el) {
      return err(`'Text' for '${item[0]}' does not exist`)
    }
    return untrack(() => el.render(item[1], this))
  }

  TextChallenge(item: Text): JSX.Element {
    const el = this.text[item[0]]
    if (!el) {
      return err(`'TextChallenge' for '${item[0]}' does not exist`)
    }
    return untrack(() => el.renderChallenge(item[1], this))
  }

  TextEntry(item: Text): JSX.Element {
    const el = this.text[item[0]]
    if (!el) {
      return err(`'TextEntry' for '${item[0]}' does not exist`)
    }
    return untrack(() => el.entry(item[1], this))
  }

  AsideSlide(item: Aside): JSX.Element {
    const el = this.aside[item[0]]
    if (!el) {
      return err(`'AsideSlide' for '${item[0]}' does not exist`)
    }
    return untrack(() => el.slide(item[1], this))
  }

  AsidePresenter(item: Aside): JSX.Element {
    const el = this.aside[item[0]]
    if (!el) {
      return err(`'AsidePresenter' for '${item[0]}' does not exist`)
    }
    return untrack(() => el.presenter(item[1], this))
  }

  AsideEntry(item: Aside): JSX.Element {
    const el = this.aside[item[0]]
    if (!el) {
      return err(`'AsideEntry' for '${item[0]}' does not exist`)
    }
    return untrack(() => el.entry(item[1], this))
  }

  ContentSlide(item: Content): JSX.Element {
    const el = this.content[item[0]]
    if (!el) {
      return err(`'ContentSlide' for '${item[0]}' does not exist`)
    }
    return untrack(() => el.slide(item[1], this))
  }

  ContentPrint(item: Content): JSX.Element {
    const el = this.content[item[0]]
    if (!el) {
      return err(`'ContentPrint' for '${item[0]}' does not exist`)
    }
    return untrack(() => el.print(item[1], this))
  }

  ContentPresenter(item: Content): JSX.Element {
    const el = this.content[item[0]]
    if (!el) {
      return err(`'ContentPresenter' for '${item[0]}' does not exist`)
    }
    return untrack(() => el.presenter(item[1], this))
  }

  ContentEntry(item: Content): JSX.Element {
    const el = this.content[item[0]]
    if (!el) {
      return err(`'ContentEntry' for '${item[0]}' does not exist`)
    }
    return untrack(() => el.entry(item[1], this))
  }

  Slide(item: Slide): JSX.Element {
    const el = this.slide[item[0]]
    if (!el) {
      return err(`'SlideSlide' for '${item[0]}' does not exist`)
    }
    return untrack(() => el.render(item[1], this))
  }

  SlidePresenter(item: Slide): JSX.Element {
    const el = this.slide[item[0]]
    if (!el) {
      return err(`'SlidePresenter' for '${item[0]}' does not exist`)
    }
    return untrack(() => el.presenter(item[1], this))
  }

  SlideEntry(item: Slide): JSX.Element {
    const el = this.slide[item[0]]
    if (!el) {
      return err(`'SlideEntry' for '${item[0]}' does not exist`)
    }
    return untrack(() => el.entry(item[1], this))
  }

  NotePresenter(item: Note): JSX.Element {
    const el = this.note[item[0]]
    if (!el) {
      return err(`'NotePresenter' for '${item[0]}' does not exist`)
    }
    return untrack(() => el.presenter(item[1], this))
  }

  Vocab(item: Vocab): JSX.Element {
    const el = this.vocab[item[0]]
    if (!el) {
      return err(`'Vocab' for '${item[0]}' does not exist`)
    }
    return untrack(() => el.render(item[1], this))
  }

  VocabWithoutDefinition(item: Vocab): JSX.Element {
    const el = this.vocab[item[0]]
    if (!el) {
      return err(`'VocabWithoutDefinition' for '${item[0]}' does not exist`)
    }
    return untrack(() => el.withoutDefinition(item[1], this))
  }

  VocabPresenter(item: Vocab): JSX.Element {
    const el = this.vocab[item[0]]
    if (!el) {
      return err(`'VocabPresenter' for '${item[0]}' does not exist`)
    }
    return untrack(() => el.presenter(item[1], this))
  }
}

function err(text: string) {
  return text
}
