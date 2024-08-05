// helpers and styling

export type AtLeastOne<T> = readonly [T, ...T[]]

export type Phrase = AtLeastOne<Colored>

export type PhraseArray = AtLeastOne<Phrase>

export type ColorName =
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

export type Color<T extends number = number> =
  | `text-${ColorName}-${T}`
  | "black"

export interface Affix {
  readonly color: Color
  readonly text: string
}

export interface Colored {
  readonly color: Color
  readonly text: string
  readonly prefix: Affix | null
  readonly postfix: Affix | null
}

export interface Word {
  readonly word: string
  readonly defnShort: string
  readonly defnLipamanka: string
  readonly seeAlso: Word[]
}

// content

export interface SectionHeader {
  readonly titleEng: string
  readonly titleTok: string
  readonly titleSp: string
  readonly agenda: AtLeastOne<string>
}

export interface NextClassVocab {
  readonly titleEng: string
  readonly vocab: Word[]
}

export interface ExampleFromTok {
  readonly type: "ex:tok"
  readonly tok: Phrase
  /** Intermediate English forms */
  readonly inter: Phrase[]
  readonly eng: PhraseArray
}

export interface ExampleFromEng {
  readonly type: "ex:eng"
  readonly eng: Phrase
  /** Intermediate English forms */
  readonly inter: Phrase[]
  readonly tok: PhraseArray
}

export interface ChallengeFromTok {
  readonly type: "ch:tok"
  readonly tok: Phrase
  readonly eng: PhraseArray
  readonly hint: string | null
}

export interface ChallengeFromEng {
  readonly type: "ch:eng"
  readonly eng: Phrase
  readonly tok: PhraseArray
  readonly hint: string | null
}

export type Item =
  | ExampleFromTok
  | ExampleFromEng
  | ChallengeFromEng
  | ChallengeFromTok
