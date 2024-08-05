import type { Affix, Color, Colored, Phrase } from "./types"

function tag(
  tagColor: Color<800>,
  color: Color<600>,
  tagText: string,
  isPostfix?: boolean,
) {
  const affix: Affix = { color: tagColor, text: tagText }
  const prefix = isPostfix ? null : affix
  const postfix = isPostfix ? affix : null

  function inner(text: string): Colored {
    return { color, text, prefix, postfix }
  }

  inner.body = function (text: string): Colored {
    return { color, text, prefix: null, postfix: null }
  }

  inner.withTag = function (tag: string, text: string): Colored {
    const affix: Affix = { color: tagColor, text: tag }
    const prefix = isPostfix ? null : affix
    const postfix = isPostfix ? affix : null
    return { color, text, prefix, postfix }
  }

  return inner
}

type Tag = ReturnType<typeof tag>

const li = tag("text-rose-800", "text-rose-600", "li")
const e = tag("text-green-800", "text-green-600", "e")
const en = tag("text-sky-800", "text-sky-600", "e")
const la = tag("text-violet-800", "text-violet-600", "la", true)

const lon = tag("text-orange-800", "text-orange-600", "lon")
const tawa = tag("text-orange-800", "text-orange-600", "tawa")
const tan = tag("text-orange-800", "text-orange-600", "tan")
const sama = tag("text-orange-800", "text-orange-600", "sama")
const kepeken = tag("text-orange-800", "text-orange-600", "kepeken")

const tags: Record<string, Tag> = {
  li,
  e,
  en,
  la,
  lon,
  tawa,
  tan,
  sama,
  kepeken,
}

const taso: Colored = {
  color: "black",
  text: "taso",
  prefix: null,
  postfix: null,
}

function phrase(text: readonly Colored[]): Phrase {
  if (text.length == 0) {
    throw new Error("Expected at least one word.")
  }

  return text as Phrase
}

export function tok(strings: TemplateStringsArray) {
  const output: Colored[] = []

  let text = strings.join("").trim()
  if (text.startsWith("taso,")) {
    output.push(taso)
    text = text.slice("taso,".length).trim()
  }

  const clauses = text.split(/\bla\b/g).map((x) => x.trim())
  for (const clause of clauses.slice(0, -1)) {
    output.push(la(clause))
  }

  const last = clauses[clauses.length - 1]!
  const words = last.split(/\s+/g)
  let currentPhrase = ""
  let currentTag: Tag | undefined
  for (let word of words) {
    const tag = tags[word]
    if (tag) {
      if (currentTag) {
        output.push(currentTag(currentPhrase))
      } else if (currentPhrase) {
        output.push(en.body(currentPhrase))
      }

      currentTag = tag
      currentPhrase = ""
      continue
    }

    if (word.startsWith("$")) {
      word = word.slice(1)
    }

    if (currentPhrase) {
      currentPhrase += " " + word
    } else {
      currentPhrase = word
    }
  }

  if (currentTag) {
    output.push(currentTag(currentPhrase))
  } else if (currentPhrase) {
    output.push(en.body(currentPhrase))
  }

  return phrase(output)
}

export function eng(strings: TemplateStringsArray) {
  const output: Colored[] = []

  let text = strings.join("").trim()
  if (text.startsWith("taso,")) {
    output.push(taso)
    text = text.slice("taso,".length).trim()
  }

  const clauses = text.split(/\bla\b/g).map((x) => x.trim())
  for (const clause of clauses.slice(0, -1)) {
    output.push(la(clause))
  }

  const last = clauses[clauses.length - 1]!
  const words = last.split(/\s+/g)
  let currentPhrase = ""
  let currentTag: { body(text: string): Colored } | undefined
  for (let word of words) {
    const tag = tags[word]
    if (tag) {
      if (currentTag) {
        output.push(currentTag.body(currentPhrase))
      } else if (currentPhrase) {
        output.push(en.body(currentPhrase))
      }

      currentTag = tag
      currentPhrase = ""
      continue
    }

    if (word.startsWith("$")) {
      word = word.slice(1)
    }

    if (currentPhrase) {
      currentPhrase += " " + word
    } else if (
      currentTag === lon ||
      currentTag === tawa ||
      currentTag === tan ||
      currentTag === sama ||
      currentTag === kepeken
    ) {
      if (word == "_") {
        currentTag = { body: currentTag.body.bind(null) }
      } else {
        const tag = currentTag as Tag
        currentTag = { body: tag.withTag.bind(null, word) }
      }
    } else {
      currentPhrase = word
    }
  }

  if (currentTag) {
    output.push(currentTag.body(currentPhrase))
  } else if (currentPhrase) {
    output.push(en.body(currentPhrase))
  }

  return phrase(output)
}

const piBase = tag("text-orange-800", "text-orange-600", "").body
const pi = tag("text-violet-800", "text-violet-600", "pi")

export function tokPi(strings: TemplateStringsArray) {
  return phrase(
    strings
      .join("")
      .trim()
      .split(/\bpi\b/g)
      .map((text, index) => {
        if (index == 0) {
          return piBase(text)
        } else {
          return pi(text)
        }
      }),
  )
}
