import {
  ch,
  ex,
  slideshow,
  ul,
} from "../../lib/helpers"
import {
  taso,
  ma,
  mu,
  ilo,
  ijo,
  sama,
  ante,
  wawa,
  nasin,
  moku,
  la,
} from "../../lib/vocab"

const [
  slide,
  {
    createReview,
  },
] =
  slideshow.draft(
    5,
  )`"la"`

slide`basics of "la"`.vocab(
  ilo,
  la,
  moku,
  ante,
)(
  ul`"la" adds context to an utterance. the context comes first.`,
  ex.tok`[context phrase] la [main sentence].`
    .eng`prela In_the_context_of [context_phrase], [main sentence].`,
  ul`we will use boxes to represent how "la" provides context for a sentence:`,
  ex.la`tenpo la mi ante e moku mi`
    .eng`time la I li change e my food`
    .full`sometimes la I li change e what I eat`,
  ch.discuss`Translate the above to a coherent English sentence.`,
)

slide`"la" for chaining`.vocab(
  mu,
  moku,
)
  .note`$"tan from the premises" doesn't have to be translated.`(
  ul`"la" is often used for conditional or causative chains`
    .li`conditional = ~"if ... then ..."`
    .li`causative = ~"because of ..., ... happened"`,
  ex.la`tomo la mi pona pilin`
    .eng`home la I li 'm happy`
    .full`when I'm at home, la I li 'm happy`,
  ch.la`pali la ona li moku ala`
    .eng`working la they li don't eat`
    .full`while working, la they li don't eat`,
  ch.eng`if you're loud, la we li 'll remove e you tan [from the premises]`
    .into`sina mu suli la mi $lon ala e sina`,
)

slide`"la" for themes`.vocab(
  wawa,
  ilo,
  ante,
)
  .note`$"tan from the premises" doesn't have to be translated.`(
  ul`"la" is often used to set an overall theme`
    .li`"postla regarding ..."`
    .li`"from the perspective of ..."`,
  ex.la`tomo la mi pona pilin`
    .eng`home la I li 'm happy`
    .full`when I'm at home, la I li 'm happy`,
  ch.la`pali la ona li moku ala`
    .eng`working la they li don't eat`
    .full`while working, la they li don't eat`,
  ch.eng`if you're loud, la we li 'll remove e you tan [from the premises]`
    .into`sina mu suli la mi $lon ala e sina`,
)

// TODO: show .eng[0].full in speaker view
