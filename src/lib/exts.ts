import { untrack, type JSX } from "solid-js"
import type {
  Aside,
  Content,
  EntryFilter,
  ExtKindsUntyped,
  ExtsData,
  Note,
  Print,
  Slide,
  Text,
  Vocab,
} from "./types"
import type { VocabProxy, VocabVis } from "./vocab"

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

  TextEntry(item: Text, filter: EntryFilter): JSX.Element {
    const el = this.text[item[0]]
    if (!el) {
      return err(`'TextEntry' for '${item[0]}' does not exist`)
    }
    return untrack(() => el.entry(item[1], this, filter))
  }

  TextEntryNote(item: Text, filter: EntryFilter): JSX.Element {
    const el = this.text[item[0]]
    if (!el) {
      return err(`'TextEntryNote' for '${item[0]}' does not exist`)
    }
    return untrack(() => el.entryNote(item[1], this, filter))
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

  AsideEntry(item: Aside, filter: EntryFilter): JSX.Element {
    const el = this.aside[item[0]]
    if (!el) {
      return err(`'AsideEntry' for '${item[0]}' does not exist`)
    }
    return untrack(() => el.entry(item[1], this, filter))
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

  ContentEntry(item: Content, filter: EntryFilter): JSX.Element {
    const el = this.content[item[0]]
    if (!el) {
      return err(`'ContentEntry' for '${item[0]}' does not exist`)
    }
    return untrack(() => el.entry(item[1], this, filter))
  }

  Print(item: Print): JSX.Element {
    const el = this.print[item[0]]
    if (!el) {
      return err(`'Print' for '${item[0]}' does not exist`)
    }
    return untrack(() => el.render(item[1], this))
  }

  PrintEntry(item: Print, filter: EntryFilter): JSX.Element {
    const el = this.print[item[0]]
    if (!el) {
      return err(`'PrintEntry' for '${item[0]}' does not exist`)
    }
    return untrack(() => el.entry(item[1], this, filter))
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

  SlideEntry(item: Slide, filter: EntryFilter): JSX.Element {
    const el = this.slide[item[0]]
    if (!el) {
      return err(`'SlideEntry' for '${item[0]}' does not exist`)
    }
    return untrack(() => el.entry(item[1], this, filter))
  }

  NotePresenter(item: Note): JSX.Element {
    const el = this.note[item[0]]
    if (!el) {
      return err(`'NotePresenter' for '${item[0]}' does not exist`)
    }
    return untrack(() => el.presenter(item[1], this))
  }

  NoteEntry(item: Note, filter: EntryFilter): JSX.Element {
    const el = this.note[item[0]]
    if (!el) {
      return err(`'NoteEntry' for '${item[0]}' does not exist`)
    }
    return untrack(() => el.entry(item[1], this, filter))
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

  VocabEntry(item: Vocab, filter: EntryFilter): JSX.Element {
    const el = this.vocab[item[0]]
    if (!el) {
      return err(`'VocabFilter' for '${item[0]}' does not exist`)
    }
    return untrack(() => el.entry(item[1], this, filter))
  }

  VocabPartIcon(item: Vocab): JSX.Element {
    const el = this.vocab[item[0]]
    if (!el) {
      return err(`'VocabPartIcon' for '${item[0]}' does not exist`)
    }
    return untrack(() => el.partIcon(item[1], this))
  }

  VocabPartWord(item: Vocab): JSX.Element {
    const el = this.vocab[item[0]]
    if (!el) {
      return err(`'VocabPartWord' for '${item[0]}' does not exist`)
    }
    return untrack(() => el.partWord(item[1], this))
  }

  VocabPartDefnShort(item: Vocab): JSX.Element {
    const el = this.vocab[item[0]]
    if (!el) {
      return err(`'VocabPartDefnShort' for '${item[0]}' does not exist`)
    }
    return untrack(() => el.partDefnShort(item[1], this))
  }

  VocabPartDefnLong(item: Vocab): JSX.Element {
    const el = this.vocab[item[0]]
    if (!el) {
      return err(`'VocabPartDefnLong' for '${item[0]}' does not exist`)
    }
    return untrack(() => el.partDefnLong(item[1], this))
  }

  AsideVocab(item: Aside, proxy: VocabProxy) {
    const el = this.aside[item[0]]
    if (!el) {
      return err(`'AsideVocab' for '${item[0]}' does not exist`)
    }
    el.vocab(item[1], this, proxy)
  }

  ContentVocab(item: Content, proxy: VocabProxy) {
    const el = this.content[item[0]]
    if (!el) {
      return err(`'ContentVocab' for '${item[0]}' does not exist`)
    }
    el.vocab(item[1], this, proxy)
  }

  NoteVocab(item: Note, proxy: VocabProxy) {
    const el = this.note[item[0]]
    if (!el) {
      return err(`'Note' for '${item[0]}' does not exist`)
    }
    el.vocab(item[1], this, proxy)
  }

  SlideVocab(item: Slide, proxy: VocabProxy) {
    const el = this.slide[item[0]]
    if (!el) {
      return err(`'SlideVocab' for '${item[0]}' does not exist`)
    }
    el.vocab(item[1], this, proxy)
  }

  TextVocab(item: Text, proxy: VocabProxy, vis: VocabVis) {
    const el = this.text[item[0]]
    if (!el) {
      return err(`'TextVocab' for '${item[0]}' does not exist`)
    }
    el.vocab(item[1], this, proxy, vis)
  }

  VocabVocab(item: Vocab, proxy: VocabProxy, vis: VocabVis) {
    const el = this.vocab[item[0]]
    if (!el) {
      return err(`'VocabVocab' for '${item[0]}' does not exist`)
    }
    el.vocab(item[1], this, proxy, vis)
  }
}

function err(text: string) {
  return text
}
