import {
  ch,
  ex,
  slideshow,
  ul,
} from "../../lib/helpers"
import {
  a,
  ala,
  ale,
  kin,
  lukin,
  ma,
  musi,
  nimi,
  pali,
  taso,
  tomo,
} from "../../lib/vocab"

const [
  slide,
  {
    createReview,
  },
] =
  slideshow.draft(
    4,
  )`modifiers`

slide`basics of modifiers`.vocab(
  kin,
  taso,
  pali,
  musi,
  lukin,
  ale,
)
  .note`Careful of $"That time li doesn't work"! It uses $"li work" as in "@li pali", but there, $"li work" contextually means $"li bad", not $"li something you put effort into".`(
  ul`to modify a word, put the modifier after the base word.`,
  ex.align`~jan`
    .eng`~person`
    .tok`~jan taso`
    .eng`~only people`,
  ex.tok`mi pali mute e musi.`
    .eng`I li often work on e art.`
    .alt`We li worked hard on e the board game.`,
  ch.tok`ona kin li sona e ni.`
    .into`They too li know e that.`
    .tok`ni ale li kama e pilin ike.`
    .into`All those things li bring about e negative feelings.`,
  ch.eng`Your eyes li are drawings.`
    .into`lukin sina li sitelen.`
    .eng`That time li doesn't work.`
    .into`tenpo ni li ike.`,
)

slide`clarifications + practice`.vocab(
  kin,
  taso,
  musi,
  lukin,
  ale,
  ala,
)
  .note`Explain that the ~"also" in $"I ~ also li saw e that" is ambiguous. That's why it has two translations given below.`
  .note`(The ambiguity of ~"also" in that sentence required a minor change to the text coloring system to properly be grey, which is quite *musi* to this author.)`(
  ul`if a subject is "mi" or "sina" but has a modifier, it isn't just "mi" or "sina", so you need "li".`,
  ex.tok`mi lili li ni.`
    .eng`I as a child li did that.`,
  ul`modifier order matters!`,
  ex.align`~jan pona`
    .eng`~good person`
    .tok`~pona jan`
    .eng`~the person's goodness`,
  ch.eng`I ~ also li saw e that.`
    .into`mi kin li lukin e ni.`
    .alt`mi lukin e ni kin.`
    .eng`Y'all li only want e buildings.`
    .into`sina ale li wile e tomo taso.`
    .eng`Those games li aren't fun.`
    .into`musi ni li musi ala.`,
)

slide`multiple modifiers + practice`.vocab(
  tomo,
  lukin,
  ala,
  ma,
  nimi,
  a,
)(
  ul`words can have multiple modifiers. all modifiers modify the initial base word.`,
  ex.align`~tomo`
    .eng`~building`
    .tok`~tomo musi`
    .eng`~entertaining building`
    .tok`~tomo musi ni`
    .eng`~this entertaining building`,
  ex.tok`tomo sina ala li pona lukin.`
    .eng`None of your houses li are pretty.`,
  ch.tok`nimi ni li pona ala.`
    .into`That word li isn't real.`
    .alt`That name li isn't correct.`
    .tok`ma ni taso li lili a!`
    .into`Only this place li is small!`,
  // ch.eng`sina a li ni`,
)

createReview`review:`

// TODO: ala

// TODO: pi
