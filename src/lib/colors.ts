import type { Affix, Color, Colored, Phrase } from "./types"

function tag(
  tagColor: Color<800>,
  color: Color<600>,
  tagText: string,
  isPostfix = false,
  punctuation = false,
) {
  const affix: Affix = { color: tagColor, text: tagText }
  const prefix = isPostfix ? null : affix
  const postfix = isPostfix ? affix : null

  return (text: string): Colored => {
    return { color, text, prefix, postfix, punctuation }
  }
}

type Tag = ReturnType<typeof tag>

const AFFIX_NEXT_WORD_DECIDES = Symbol()
const AFFIX_NONE = Symbol()

function withAffix(
  colored: Colored,
  affix: string | typeof AFFIX_NEXT_WORD_DECIDES | typeof AFFIX_NONE,
): Colored {
  if (affix == AFFIX_NEXT_WORD_DECIDES || affix == AFFIX_NONE) {
    return { ...colored, prefix: null, postfix: null }
  } else {
    return {
      ...colored,
      prefix: colored.prefix && { ...colored.prefix, text: affix },
      postfix: colored.postfix && { ...colored.postfix, text: affix },
    }
  }
}

const EN_PARTICLE = "text-sky-800"

const li = tag("text-rose-800", "text-rose-600", "li")
const o = tag("text-rose-800", "text-rose-600", "o")
const e = tag("text-green-800", "text-green-600", "e")
const en = tag(EN_PARTICLE, "text-sky-600", "en")
const sbj = tag(EN_PARTICLE, "text-sky-600", "en")
const la = tag("text-violet-800", "text-violet-600", "la", true)

const lon = tag("text-orange-800", "text-orange-600", "lon")
const tawa = tag("text-orange-800", "text-orange-600", "tawa")
const tan = tag("text-orange-800", "text-orange-600", "tan")
const sama = tag("text-orange-800", "text-orange-600", "sama")
const kepeken = tag("text-orange-800", "text-orange-600", "kepeken")

const interj = tag("text-yellow-800", "text-yellow-600", "")

const tags: Record<string, Tag> = {
  li,
  e,
  en,
  sbj,
  la,
  o,
  lon,
  tawa,
  tan,
  sama,
  kepeken,
  "@": interj,
}

const taso: Colored = {
  color: "text-black",
  text: "taso",
  prefix: null,
  postfix: null,
  punctuation: false,
}

function phrase(text: readonly Colored[]): Phrase {
  if (text.length == 0) {
    throw new Error("Expected at least one word.")
  }

  return text as Phrase
}

function createTagFunction(includeParticles: boolean) {
  function inner(text: string) {
    const output: Colored[] = []

    if (text.startsWith("taso,")) {
      output.push(taso)
      text = text.slice("taso,".length).trim()
    }

    const clauses = text.split(/\bla\b/g).map((x) => x.trim())
    for (const clause of clauses.slice(0, -1)) {
      if (includeParticles) {
        output.push(la(clause))
      } else {
        output.push(withAffix(la(clause), AFFIX_NONE))
      }
    }

    let last = clauses[clauses.length - 1]!

    // mi/sina-only subject special handling
    if (!/\bli\b/.test(last) && /^(?:mi|sina)\b/.test(last)) {
      if (last.startsWith("mi")) {
        last = `mi @li ${last.slice(2)}`
      } else if (last.startsWith("sina")) {
        last = `sina @li ${last.slice(4)}`
      }
    }

    // mu/a/n/kin special handling
    if (/^(?:mu|a|n|kin)(?:[.!?"'`,()]|$)/.test(last)) {
      last = "@@ " + last
    }

    const words = last.match(/[.!?"`,()]|[^.!?"`,()\s]+/g) ?? []

    let currentPhrase = ""
    let currentTag: Tag | undefined
    let currentAffix:
      | string
      | typeof AFFIX_NEXT_WORD_DECIDES
      | typeof AFFIX_NONE
      | undefined
    let nextIsAnuClause = false

    for (let word of words) {
      if (!nextIsAnuClause && '.!?"`,()'.includes(word)) {
        pushCurrent()

        output.push({
          color: null,
          text: word,
          prefix: null,
          postfix: null,
          punctuation: true,
        })

        continue
      }

      if (word.startsWith("@")) {
        const tag = tags[word.slice(1)]
        if (!tag) {
          throw new Error("Cannot use `@` on a nonexistent tag.")
        }

        if (nextIsAnuClause) {
          pushCurrent()
          currentTag = tag
          currentAffix = "anu"
        } else {
          pushCurrent()
          currentTag = tag
          currentAffix = AFFIX_NONE
        }

        continue
      }

      const tag = tags[word]
      if (tag) {
        if (nextIsAnuClause) {
          pushCurrent()
          currentTag = tag
          if (includeParticles) {
            currentAffix = "anu"
          } else {
            currentAffix = AFFIX_NEXT_WORD_DECIDES
          }
        } else {
          pushCurrent()
          currentTag = tag
          if (!includeParticles) {
            if (
              tag == lon ||
              tag == tawa ||
              tag == tan ||
              tag == sama ||
              tag == kepeken ||
              tag == en
            ) {
              currentAffix = AFFIX_NEXT_WORD_DECIDES
            } else {
              currentAffix = AFFIX_NONE
            }
          }
        }

        continue
      }

      if (nextIsAnuClause) {
        throw new Error(
          "`anu` must immediately be followed by a particle name.",
        )
      }

      if (word == "anu") {
        pushCurrent()
        nextIsAnuClause = true
        continue
      }

      if (word.startsWith("$")) {
        word = word.slice(1)
      }

      if (currentPhrase) {
        currentPhrase += " " + word
      } else if (currentAffix == AFFIX_NEXT_WORD_DECIDES) {
        currentAffix = word
      } else {
        currentPhrase = word
      }
    }

    pushCurrent()

    return phrase(output)

    function pushCurrent() {
      // special "o" handling
      if (currentTag == o && currentPhrase == "") {
        const prev = output.pop()
        if (prev) {
          if (
            (prev.prefix == null || prev.prefix.text == "en") &&
            prev.postfix == null
          ) {
            if (includeParticles) {
              output.push({
                ...prev,
                postfix: { color: EN_PARTICLE, text: "o" },
              })
            } else {
              output.push(prev)
            }
          } else {
            throw new Error(
              "Postfix `o` cannot be used after another non-en clause without a punctuation mark separating them. For example, 'ona li moku, sina o' is valid, but 'ona li moku sina o' is not. However, 'jan A en jan E o' is perfectly valid.",
            )
          }
        }
      } else if (currentTag) {
        let colored = currentTag(currentPhrase)
        if (currentAffix !== undefined) {
          colored = withAffix(colored, currentAffix)
        }
        output.push(colored)
      } else if (currentPhrase) {
        output.push(withAffix(en(currentPhrase), AFFIX_NONE))
      }

      currentTag = currentAffix = undefined
      currentPhrase = ""
      nextIsAnuClause = false
    }
  }

  return (strings: TemplateStringsArray) => {
    const text = strings.join("").trim()
    const items = text.match(/[^.!?]+[.!?]|[^.!?]+/g) ?? [text]
    return items.map(inner).flat() as readonly Colored[] as Phrase
  }
}

export const tok = createTagFunction(true)
export const eng = createTagFunction(false)

const pi = tag("text-violet-800", "text-violet-600", "pi")

export function tokPi(strings: TemplateStringsArray) {
  return phrase(
    strings
      .join("")
      .trim()
      .split(/\bpi\b/g)
      .map((x) => x.trim())
      .map((text, index) => {
        if (index == 0) {
          return {
            color: "text-orange-600",
            text,
            prefix: null,
            postfix: null,
            punctuation: false,
          }
        } else {
          return pi(text)
        }
      }),
  )
}
