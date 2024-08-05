// #region helpers and styling

export type AtLeastOne<T> = readonly [T, ...T[]]

export type Phrase = AtLeastOne<Colored>

export type LaPhrase = [before: Colored, after: Phrase]

export type PhraseArray = AtLeastOne<Phrase>

export type LaPhraseArray = AtLeastOne<LaPhrase>

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

export type ColorName = "rose" | "green" | "sky" | "violet" | "orange" | "slate"

export type Color<
  T extends number = number,
  P extends string = "text",
  C extends AnyColorName = ColorName,
> = `${P}-${C}-${T}` | `${P}-black`

export interface Affix {
  readonly color: Color
  readonly text: string
}

export interface Colored {
  readonly color: Color | null
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

export type TextItem = string | Phrase | TextFormatted

export type Text = AtLeastOne<TextItem>

// #endregion

// #region sections

export interface ExampleFromTok {
  readonly type: "ex:tok"
  readonly tok: Phrase
  /** Intermediate English forms */
  readonly inter?: readonly Phrase[]
  readonly eng: PhraseArray
}

export interface ExampleFromEng {
  readonly type: "ex:eng"
  readonly eng: Phrase
  /** Intermediate English forms */
  readonly inter?: readonly Phrase[]
  readonly tok: PhraseArray
}

export interface ExampleLa {
  readonly type: "ex:la"
  readonly tok: LaPhrase
  readonly eng: LaPhraseArray
}

export interface ChallengeFromTok {
  readonly type: "ch:tok"
  readonly tok: Phrase
  readonly eng: PhraseArray
  readonly hint?: string
}

export interface ChallengeFromEng {
  readonly type: "ch:eng"
  readonly eng: Phrase
  readonly tok: PhraseArray
  readonly hint?: string
}

export interface ChallengeLa {
  readonly type: "ch:la"
  readonly tok: LaPhrase
  readonly eng: LaPhraseArray
  readonly hint?: string
}

export interface ChallengeExplainDifference {
  readonly type: "ch:diff"
  readonly a: Phrase
  readonly b: Phrase
  readonly eng: AtLeastOne<Text>
}

export interface ExamplesAligned {
  readonly type: "exs"
  readonly entries: AtLeastOne<{ readonly tok: Phrase; readonly en: Phrase }>
}

export interface ListEntry {
  readonly text: Text
  readonly sub?: Text[]
}

export interface ListUl {
  readonly type: "ul"
  readonly items: AtLeastOne<ListEntry>
}

export type Section =
  | ExampleFromTok
  | ExampleFromEng
  | ExampleLa
  | ChallengeFromEng
  | ChallengeFromTok
  | ChallengeLa
  | ChallengeExplainDifference
  | ExamplesAligned
  | ListUl

export type Content = AtLeastOne<Section>

// #endregion

// #region slides

export interface Source {
  title: string
  author: string
  url: string
}

export interface Slide {
  readonly id: number
  readonly refs?: readonly number[]
  readonly notes?: Text[]
}

export interface SlideStandard extends Slide {
  readonly title: Text
  readonly content: Content
  readonly vocab?: Word[]
  readonly source?: Source
}

export interface SlideSectionHeader extends Slide {
  readonly titleEng: string
  readonly titleTok: string
  readonly titleSp: string
  readonly agenda: AtLeastOne<string>
}

export interface SlideNextClassVocab extends Slide {
  readonly titleEng: string
  readonly vocab: AtLeastOne<Word>
}

// #endregion
