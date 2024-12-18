import { defineExt } from "../../lib/define"
import type { Text, TextOf } from "../../lib/types"
import { arr } from "./arr"
import { str } from "./str"

/** Removes any applied styles when rendered as a challenge. */
export const ext = defineExt<[classes: string, content: string]>()(
  "text",
  "styled",
  {
    vocab(data, exts, proxy, vis) {
      exts.TextVocab(str(data[1]), proxy, vis)
    },
    render(data) {
      return <span class={data[0]}>{data[1]}</span>
    },
    renderChallenge(data) {
      return <span>{data[1]}</span>
    },
    entry(): undefined {},
    entryNote(): undefined {},
  },
)

export function styled(classes: string, content: string): Text {
  return ["styled", [classes, content]]
}

export interface StyleTag {
  readonly cx: string
  readonly affix?: {
    readonly cx: string
    /** If `content` is `undefined`, defaults to `^` mode. */
    readonly text?: string
  }
  readonly rev?: boolean
}

const WORD = /[.!?"`,()[\]{}•:;]|[^.!?"`,()\s()[\]{}•:;]+|\r?\n|\s+/g
const PUNC = /^[.!?"`,()[\]{}•:;]$/
const PUNC_RESET_COLOR = /^[.!?"`,•:;]$/
const PUNC_SENTENCE_END = /^[.!?:;]$/
const WS = /^\s+$/
const LINE_BREAK = /^\r?\n$/
const POSTFIX_PUNCTUATION = /^[-.,':;?!\]\)”’}]/
const PREFIX_PUNCTUATION = /^[-“‘[({]/

type Styled = [classes: string | null, phrase: string]

/**
 * Special syntax:
 *
 * - `@tag` disables `rev` and hides the affix.
 * - `^tag` colors the next word using the affix color of `tag`.
 * - `$tag` forces `tag` to be treated as a plain word.
 */
export function createStyler<K extends string>(
  tags: Record<string, StyleTag>,
  txPre: (source: string) => string,
  txPost: (x: Styled[]) => Styled[],
  initial: string,
  _lang: K,
) {
  return (text: string): TextOf<K> => {
    text = txPre(text)

    let currentClasses = initial
    let nextClasses = initial
    const output: Styled[] = []

    const words = (text.match(WORD) || [])[Symbol.iterator]()
    let finalized = 0

    for (let word of words) {
      if (WS.test(word)) {
        output.push([null, word])
        continue
      }

      if (PUNC.test(word)) {
        if (PUNC_RESET_COLOR.test(word)) {
          currentClasses = nextClasses = initial
        }
        output.push([null, word])
        if (PUNC_SENTENCE_END.test(word)) {
          finalized = output.length
        }
        continue
      }

      let tag = tags[word]
      if (tag) {
        if (tag.rev) {
          for (let i = finalized; i < output.length; i++) {
            if (output[i]![0] != null) {
              output[i]![0] = tag.cx
            }
          }

          if (tag.affix?.text != null) {
            output.push([tag.affix.cx, tag.affix.text])
          }

          finalized = output.length

          if (tag.affix && tag.affix.text == null) {
            currentClasses = tag.affix.cx
            nextClasses = initial
          } else {
            currentClasses = nextClasses = initial
          }
        } else {
          if (tag.affix?.text != null) {
            output.push([tag.affix.cx, tag.affix.text])
          }

          if (tag.affix && tag.affix.text == null) {
            currentClasses = tag.affix.cx
            nextClasses = tag.cx
          } else {
            currentClasses = nextClasses = tag.cx
          }
        }
        continue
      }

      if (word.startsWith("@") && (tag = tags[word.slice(1)])) {
        currentClasses = nextClasses = tag.cx
        continue
      }

      if (word.startsWith("^") && (tag = tags[word.slice(1)])) {
        currentClasses = tag.affix?.cx ?? tag.cx
        nextClasses = tag.cx
        continue
      }

      if (word.startsWith("$")) {
        word = word.slice(1)
      }

      output.push([currentClasses, word.replace(/_/g, " ")])
      currentClasses = nextClasses
    }

    return arr(txPost(output).map(([a, b]) => (a ? styled(a, b) : str(b))))
  }
}

/**
 * A post-transformer which makes several improvements to generated styles.
 *
 * 1. Whitespace is consolidated and merged.
 * 2. Punctuation is merged with surrounding whitespace when appropriate.
 * 3. Apostrophes are prettified and merged with surrounding whitespace.
 * 4. Uncolored brackets will take styles from the adjacent word.
 */
export function txPrettify(styled: Styled[]): Styled[] {
  while (styled[0]?.[1].trim() == "") {
    styled.shift()
  }

  while (styled[styled.length - 1]?.[1].trim() == "") {
    styled.pop()
  }

  for (let i = 1; i < styled.length; i++) {
    const [, prev] = styled[i - 1]!
    let [, self] = styled[i]!

    if (self == "") {
      styled.splice(i, 1)
      i--
      continue
    }

    if (self.includes("'")) {
      self = styled[i]![1] = self.replace(/'/g, "’")
    }

    if (LINE_BREAK.test(prev) || LINE_BREAK.test(self)) {
      continue
    }

    if (WS.test(prev)) {
      if (WS.test(self)) {
        styled.splice(i, 1)
        i--
        continue
      }

      if (POSTFIX_PUNCTUATION.test(self)) {
        styled.splice(i - 1, 1)
        i--
        continue
      }
    }

    if (WS.test(self)) {
      if (PREFIX_PUNCTUATION.test(prev)) {
        styled.splice(i, 1)
        i--
        continue
      }

      styled[i]![1] = " "
      continue
    }
  }

  // color closing brackets appropriately
  {
    let last: string | null = null
    for (let i = 0; i < styled.length; i++) {
      const [style, self] = styled[i]!

      if (style != null) {
        last = style
        continue
      }

      switch (self) {
        case ")":
        case "]":
        case "}":
          styled[i]![0] = last
          break

        default:
          last = null
          break
      }
    }
  }

  // color opening brackets appropriately
  {
    let last: string | null = null
    for (let i = styled.length - 1; i >= 0; i--) {
      const [style, self] = styled[i]!

      if (style != null) {
        last = style
        continue
      }

      switch (self) {
        case "(":
        case "[":
        case "{":
          styled[i]![0] = last
          break

        default:
          last = null
          break
      }
    }
  }

  return styled
}

export function tag(
  mainClass: `text-xw-${string}`,
  affixClass: `text-xp-${string}`,
  affixText?: string,
  rev?: boolean,
): StyleTag

export function tag(
  mainClass: `text-xw-${string}` | "",
  affixClass?: undefined,
  affixText?: undefined,
  rev?: boolean,
): StyleTag

export function tag(
  mainClass: string,
  affixClass?: string,
  affixText?: string,
  rev?: boolean,
): StyleTag {
  return {
    cx: mainClass,
    affix:
      affixClass == null ? undefined : (
        {
          cx: affixClass,
          text: affixText,
        }
      ),
    rev,
  }
}

export const styledTok = createStyler(
  {
    li: tag("text-xw-rose", "text-xp-rose", "li"),
    o: tag("text-xw-rose", "text-xp-rose", "o"),
    en: tag("text-xw-sky", "text-xp-sky", "en"),
    e: tag("text-xw-green", "text-xp-green", "e"),
    la: tag("text-xw-violet", "text-xp-violet", "la", true),
    pp: tag("text-xw-violet", "text-xp-violet", "pi"),
    pb: tag("text-xw-orange", "text-xp-orange", ""),
    lon: tag("text-xw-orange", "text-xp-orange", "lon"),
    tan: tag("text-xw-orange", "text-xp-orange", "tan"),
    tawa: tag("text-xw-orange", "text-xp-orange", "tawa"),
    sama: tag("text-xw-orange", "text-xp-orange", "sama"),
    kepeken: tag("text-xw-orange", "text-xp-orange", "kepeken"),
    "@": tag("text-xw-fuchsia"),
    "~": tag(""),
  },
  (x) =>
    x
      .replace(/oo/g, "^en $o")
      .replace(
        /(^|[.!?"`,()[\]{}•\s]+|la\s+)(mi|sina)\s+([$\w\s]+)/g,
        (source, initial: string, head: string, tail: string) =>
          /\bli\b/.test(tail) ? source : initial + head + " @li " + tail,
      ),
  txPrettify,
  "text-xw-sky",
  "tok",
)

const prep = tag("text-xw-orange", "text-xp-orange")

export const styledEng = createStyler(
  {
    li: tag("text-xw-rose", "text-xp-rose", ""),
    o: tag("text-xw-rose", "text-xp-rose", ""),
    en: tag("text-xw-sky", "text-xp-sky"),
    e: tag("text-xw-green", "text-xp-green", ""),
    la: tag("text-xw-violet", "text-xp-violet", "", true),
    pp: tag("text-xw-violet", "text-xp-violet", ""),
    pb: tag("text-xw-orange", "text-xp-orange", ""),
    lon: prep,
    tan: prep,
    tawa: prep,
    sama: prep,
    kepeken: prep,
    "@": tag("text-xw-fuchsia"),
    "~": tag(""),
  },
  (x) => x,
  txPrettify,
  "text-xw-sky",
  "eng",
)
