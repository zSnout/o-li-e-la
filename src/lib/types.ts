// #region helpers and styling

export type AtLeastOne<T> = readonly [T, ...T[]]

export type AtLeastOneMut<T> = [T, ...T[]]

export type PhraseLang = "tok" | "eng"

export type PhraseFont = "sp"

export interface PhraseMut<T extends PhraseLang> {
  lang: T
  font?: PhraseFont
  content: AtLeastOne<Colored>
  actual?: AtLeastOne<Colored>
}

export interface Phrase<T extends PhraseLang> extends Readonly<PhraseMut<T>> {}

export type LaPhrase<T extends PhraseLang> = readonly [
  context: string,
  main: Phrase<T>,
]

export interface LaFull<T extends PhraseLang> {
  readonly la: LaPhrase<T>
  readonly full: PhraseArray<T>
}

export type PhraseArray<T extends PhraseLang> = AtLeastOne<Phrase<T>>

export type PhraseArrayMut<T extends PhraseLang> = AtLeastOneMut<Phrase<T>>

export type LaPhraseArray<T extends PhraseLang> = AtLeastOne<LaPhrase<T>>

export type LaPhraseArrayMut<T extends PhraseLang> = AtLeastOneMut<LaPhrase<T>>

export type LaFullArray<T extends PhraseLang> = AtLeastOne<LaFull<T>>

export type LaFullArrayMut<T extends PhraseLang> = AtLeastOneMut<LaFull<T>>

export type AnyColorName =
  | "red"
  | "orange"
  | "amber"
  | "yellow"
  | "lime"
  | "green"
  | "emerald"
  | "teal"
  | "cyan"
  | "sky"
  | "blue"
  | "indigo"
  | "violet"
  | "purple"
  | "fuchsia"
  | "pink"
  | "rose"
  | "slate"

export type ColorName =
  | "rose"
  | "orange"
  | "fuchsia"
  | "green"
  | "sky"
  | "violet"
  | "slate"

export type Color<
  T extends number = number,
  P extends string = "text",
  C extends AnyColorName = ColorName,
> = `${P}-${C}-${T}` | `${P}-black` | "text-current"

export interface Affix {
  readonly color: Color<800>
  readonly text: string
}

export interface Colored {
  readonly color: Color<600> | null
  readonly text: string
  readonly prefix: Affix | null
  readonly postfix: Affix | null
  readonly punctuation: boolean
}

export interface WordKind {
  readonly particle: boolean
  readonly content: boolean
  readonly prep: boolean
  readonly preverb: boolean

  readonly name: string
  readonly abbr: string
  readonly color: ColorName extends infer U extends string ?
    `bg-${U}-500 text-${U}-50`
  : never
}

export interface Word {
  readonly word: string
  readonly defnShort: Text
  readonly defnLipamanka: Text | null
  readonly seeAlso: readonly string[]
  readonly kind: WordKind
}

// #endregion

// #region text

export interface TextFormatted {
  readonly b?: boolean
  readonly i?: boolean
  readonly u?: boolean
  readonly x?: boolean
  readonly text: string
  readonly length?: undefined
}

export type TextItem = string | Phrase<PhraseLang> | TextFormatted

export type Text = AtLeastOne<TextItem>

// #endregion

// #region content

/** An example from toki pona to English. */
export interface ExampleTok {
  readonly type: "ex:tok"
  readonly tok: Phrase<"tok">
  readonly eng: PhraseArray<"eng">
}

/** An example using `la` boxes. */
export interface ExampleLa {
  readonly type: "ex:la"
  readonly tok: LaPhrase<"tok">
  readonly eng: LaFullArray<"eng">
}

/** An object with its translation. */
export interface Translated {
  readonly tok: Phrase<"tok">
  readonly eng: Phrase<"eng">
}

/** A collection of examples with the toki pona and English vertically aligned. */
export interface ExampleSetAligned {
  readonly type: "exs:aligned"
  readonly entries: AtLeastOne<Translated>
}

/** A question-and-answer with English translations. */
export interface ExampleSetQA {
  readonly type: "exs:qa"
  readonly q: Translated
  readonly a: AtLeastOne<Translated>
}

/** Any example. */
export type Example = ExampleTok | ExampleLa | ExampleSetAligned | ExampleSetQA

/** A challenge to translate from toki pona to English. */
export interface ChallengeTranslateOne {
  readonly q: Phrase<PhraseLang>
  readonly a: PhraseArray<PhraseLang>
  readonly hint?: Text
}

/** A challenge set to translate from toki pona to English. */
export interface ChallengeTranslate {
  readonly type: "ch:tr"
  readonly items: AtLeastOne<ChallengeTranslateOne>
  readonly label?: Text
}

/** A single prompt under discussion. */
export interface ChallengeDiscussOnePrompt {
  readonly prompt: Text
  readonly notes?: readonly Text[]
}

/** A challenge set to talk about a set of prompts. */
export interface ChallengeDiscuss {
  readonly type: "ch:discuss"
  readonly items: AtLeastOne<ChallengeDiscussOnePrompt>
  readonly label?: Text
}

/** A challenge to translate from toki pona rendered with `la` boxes. */
export interface ChallengeLa {
  readonly type: "ch:la"
  readonly tok: LaPhrase<"tok">
  readonly eng: LaFullArray<"eng">
}

/** A challenge to explain the difference between two sentences. */
export interface ChallengeExplainDifferenceOne {
  readonly a: Phrase<"tok">
  readonly b: Phrase<"tok">

  /** Explanations of the differences in the two phrases. */
  readonly explanation: AtLeastOne<Text>
}

/** A challenge to explain the differences between pairs of sentences. */
export interface ChallengeExplainDifference {
  readonly type: "ch:diff"
  readonly items: AtLeastOne<ChallengeExplainDifferenceOne>
}

/** Any challenge. */
export type Challenge =
  | ChallengeTranslate
  | ChallengeDiscuss
  | ChallengeLa
  | ChallengeExplainDifference

/** A list entry. */
export interface ListEntry {
  readonly text: Text
  // readonly sub?: Text[]
}

/** An unordered list. */
export interface InfoListUl {
  readonly type: "ul"
  readonly items: AtLeastOne<ListEntry>
}

/** Any informational section. */
export type Info = InfoListUl

/** Any piece of content. */
export type Content = Example | Challenge | Info

/** A set of content. */
export type ContentArray = Content[]

export interface ToContent<T extends Content> {
  finalize(): T
}

// #endregion

// #region slides

/** The source of a slide's content. */
export interface Source {
  title: string
  author: string
  url: string
}

/** A base interface all slides inherit from. */
export interface SlideBase {
  /** The automatically-generated globally unique ID of this slide. */
  readonly gid: number

  /** The automatically-generated per-slideshow unique ID of this slide. */
  readonly id: number

  /** The IDs of slides referenced by this one. */
  readonly refs?: readonly number[]

  /**
   * Any notes added by the slide creator. These only show up in the presenter
   * view.
   */
  readonly notes?: Text[]
}

/** The aspect ratio of an image on a slide. */
export type SlideImageAspectRatio =
  | "half" // 8/9 (half a slide's width)
  | "square"
  | "auto"

/** An image displayed on a slide. */
export interface SlideImage {
  readonly aspect: SlideImageAspectRatio
  readonly src: string
  readonly alt: string
  readonly contain?: string
}

/**
 * A regular slide, with a title, content, possible source, possible vocab list,
 * and possible image.
 */
export interface SlideStandard extends SlideBase {
  readonly type: "insa"
  readonly suli: boolean
  readonly title: Text
  readonly content: ContentArray
  readonly vocab?: Word[]
  readonly vocabNoDefn?: Word[]
  readonly vocabNoteOnly?: Word[]
  readonly image?: SlideImage
  readonly source?: Source
}

/** A slide previewing next class's vocabulary. */
export interface SlideReview extends SlideBase {
  readonly index: number
  readonly type: "pini"
  readonly titleEng: Text
  readonly vocab: Word[]
  readonly sources: Source[]
  readonly contentSlide: Content[]
  readonly contentSheet: Content[]
}

/** Any slide. */
export type AnySlide = SlideStandard | SlideReview

// #endregion

// #region collect

export interface ColoredWord {
  readonly word: string
  readonly color: Color<600 | 800> | null
}

export type CollectedInner =
  | { type: "ex:tok"; tok: Phrase<"tok">; eng: PhraseArray<"eng"> }
  | { type: "ex:la"; tok: Phrase<"tok">; eng: LaFullArray<"eng"> }
  | { type: "ch:tok"; tok: Phrase<"tok">; eng: PhraseArray<"eng"> }
  | { type: "ch:eng"; eng: Phrase<"eng">; tok: PhraseArray<"tok"> }
  | { type: "ch:la"; tok: Phrase<"tok">; eng: LaFullArray<"eng"> }
  | { type: "ch:discuss"; prompt: Text }
  | { type: "ch:diff"; a: Phrase<"tok">; b: Phrase<"tok"> }
  | { type: "unimpl"; msg: string }

export type Collected = Readonly<CollectedInner>

export interface StatMut {
  inExamples: number
  inChallengePrompts: number
  inChallengeAnswers: number
}

export interface Stat extends Readonly<StatMut> {}

export type VocabStatMut = Map<Color<600 | 800> | null, StatMut>

export type VocabStat = ReadonlyMap<Color<600 | 800> | null, Stat>

// #endregion stats

export interface Group {
  readonly id: number
  readonly name: Text
  readonly words: readonly string[]
}

export interface Slideshow {
  readonly title: Text
  readonly index: number
  readonly slides: readonly AnySlide[]
}

export type Kind = "done" | "draft" | "test" | "meta"
