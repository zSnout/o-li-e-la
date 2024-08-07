import type { WordKind } from "./types"

export const content: WordKind = {
  content: true,
  particle: false,
  prep: false,
  preverb: false,

  name: "content",
  abbr: "c.",
  color: "bg-sky-500 text-sky-50",
}

export const particle: WordKind = {
  content: false,
  particle: true,
  prep: false,
  preverb: false,

  name: "particle",
  abbr: "p.",
  color: "bg-orange-500 text-orange-50",
}

export const semiparticle: WordKind = {
  content: true,
  particle: true,
  prep: false,
  preverb: false,

  name: "semiparticle",
  abbr: "sp.",
  color: "bg-green-500 text-green-50",
}

export const prep: WordKind = {
  content: true,
  particle: false,
  prep: true,
  preverb: false,

  name: "preposition",
  abbr: "prep.",
  color: "bg-violet-500 text-violet-50",
}

export const preverb: WordKind = {
  content: true,
  particle: false,
  prep: false,
  preverb: true,

  name: "preverb",
  abbr: "pv.",
  color: "bg-rose-500 text-rose-50",
}
