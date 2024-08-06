// #region helpers and styling

export type AtLeastOne<T> = readonly [T, ...T[]]

export type AtLeastOneMutable<T> = [T, ...T[]]

export type PhraseLang = "tok" | "eng"

export type Phrase<T extends PhraseLang> = {
  lang: T
  content: AtLeastOne<Colored>
}

export type LaPhrase<T extends PhraseLang> = [context: string, main: Phrase<T>]

export type PhraseArray<T extends PhraseLang> = AtLeastOne<Phrase<T>>

export type PhraseArrayMutable<T extends PhraseLang> = AtLeastOneMutable<
  Phrase<T>
>

export type LaPhraseArray<T extends PhraseLang> = AtLeastOne<LaPhrase<T>>

export type LaPhraseArrayMutable<T extends PhraseLang> = AtLeastOneMutable<
  LaPhrase<T>
>

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
> = `${P}-${C}-${T}` | `${P}-black`

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
  readonly defnShort: string
  readonly defnLipamanka: string
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
  /** Intermediate English forms */
  readonly inter?: readonly Phrase<"eng">[]
  readonly eng: PhraseArray<"eng">
}

/** An example using `la` boxes. */
export interface ExampleLa {
  readonly type: "ex:la"
  readonly tok: LaPhrase<"tok">
  readonly eng: LaPhraseArray<"eng">
}

/** An object with its translation. */
export interface Translated {
  readonly tok: Phrase<"tok">
  readonly eng: Phrase<"eng">
}

/** A collection of examples with the toki pona and English vertically aligned. */
export interface ExampleSetMany {
  readonly type: "exs:many"
  readonly entries: AtLeastOne<Translated>
}

/** A question-and-answer with English translations. */
export interface ExampleSetQA {
  readonly type: "exs:qa"
  readonly q: Translated
  readonly a: AtLeastOne<Translated>
}

/** Any example. */
export type Example = ExampleTok | ExampleLa | ExampleSetMany | ExampleSetQA

/** A challenge to translate from toki pona to English. */
export interface ChallengeSingleTok {
  readonly tok: Phrase<"tok">
  readonly eng: PhraseArray<"eng">
  readonly hint?: string
}

/** A challenge set to translate from toki pona to English. */
export interface ChallengeTok {
  readonly type: "ch:tok"
  readonly items: AtLeastOne<ChallengeSingleTok>
}

/** A challenge to translate from English to toki pona. */
export interface ChallengeSingleEng {
  readonly eng: Phrase<"eng">
  readonly tok: PhraseArray<"tok">
  readonly hint?: Text
}

/** A challenge set to translate from English to toki pona. */
export interface ChallengeEng {
  readonly type: "ch:eng"
  readonly items: AtLeastOne<ChallengeSingleEng>
  readonly label?: Text
}

/** A challenge set to talk about a set of prompts. */
export interface ChallengeDiscuss {
  readonly type: "ch:discuss"
  readonly items: AtLeastOne<Text>
  readonly label?: Text
  readonly notes?: readonly Text[]
}

/** A challenge to translate from toki pona rendered with `la` boxes. */
export interface ChallengeLa {
  readonly type: "ch:la"
  readonly tok: LaPhrase<"tok">
  readonly eng: LaPhraseArray<"eng">
  readonly hint?: Text
}

/** A challenge to explain the difference between two sentences. */
export interface ChallengeExplainDifferenceOne {
  readonly a: Phrase<"tok">
  readonly b: Phrase<"tok">
  readonly eng: AtLeastOne<Text>
}

/** A challenge to explain the differences between pairs of sentences. */
export interface ChallengeExplainDifference {
  readonly type: "ch:diff"
  readonly items: AtLeastOne<ChallengeExplainDifferenceOne>
}

/** Any challenge. */
export type Challenge =
  | ChallengeTok
  | ChallengeEng
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
export type ContentArray = AtLeastOne<Content>

// #endregion

// #region slides

/** The source of a slide's content. */
export interface Source {
  title: string
  author: string
  url: string
}

/** A base interface all slides inherit from. */
export interface Slide {
  /** The automatically-generated ID of this slide. */
  readonly id: number

  /** The IDs of slides referenced by this one. */
  readonly refs?: readonly number[]

  /**
   * Any notes added by the slide creator. These only show up in the presenter
   * view.
   */
  readonly notes?: Text[]
}

/**
 * A regular slide, with a title, content, possible source, and possible vocab
 * list.
 */
export interface SlideStandard extends Slide {
  readonly title: Text
  readonly content: ContentArray
  readonly vocab?: Word[]
  readonly source?: Source
}

/** A slide introducing a new day, with multilingual titles and an agenda. */
export interface SlideSectionHeader extends Slide {
  readonly titleEng: Text
  readonly titleTok: Text
  readonly titleSp: Text
  readonly agenda: AtLeastOne<Text>
}

/** A slide previewing next class's vocabulary. */
export interface SlideNextClassVocab extends Slide {
  readonly titleEng: Text
  readonly vocab: AtLeastOne<Word>
}

// #endregion
