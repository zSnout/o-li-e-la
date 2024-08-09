import {
  ch,
  ex,
  slideshow,
  styled,
  ul,
} from "../lib/helpers"
import {
  jan,
  mi,
  pona,
  sina,
  sona,
  toki,
} from "../lib/vocab"

const [slide] =
  slideshow`basic sentences`

slide`"mi" and "sina" subjects`
  .vocab(mi)
  .vocab(sina)
  .vocab(jan)
  .vocab(toki)
  .vocab(pona)
  .content(
    ul`a basic sentence is just "~mi" or "~sina" and a predicate.`,
    ex.tok`mi jan.`
      .eng`I li 'm a person.`
      .alt`We li are people.`,
    ex.tok`sina toki.`
      .eng`You li 're talking.`
      .alt`You li spoke.`,
    ul`try some translations!`,
    ch.tok`sina pona.`
      .into`You li are good.`
      .tok`mi toki.`
      .into`I li 'm communicating.`
      .alt`We li use sign language.`
      .alt`a`,
  )

slide`any word can be a predicate`
  .vocab(sona)
  .content(
    ul`you may have noticed: any word can be a predicate in toki pona! **there's no noun/adjective/verb distinction.**`,
    ul`this *can* lead to confusing situations, but these are always solved with Context™.`,
    ex.tok`mi sona.`
      .eng`I li am knowledge.`
      .alt`I li understand.`,
  )

// slide`what is context?`(
//   ul`tokiponists talk a lot about context, but what does it mean?`,
//   ul`imagine I say "o moku ala e telo" (don't consume the liquid) to you. depending on our environment, you will have different reactions.`,
//   ul`if we're at the beach `,
// )

slide`what is context?`(
  styled()
    .my("auto")
    .size("xl")
    .content(
      ex.tok`o moku ala e telo.`
        .eng`o Don't consume e the liquid.`,
    ),
)
