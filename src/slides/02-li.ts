import {
  ch,
  ex,
  slideshow,
  ul,
} from "../lib/helpers"
import {
  lon,
  mi,
  pona,
  sina,
} from "../lib/vocab"

const [slide] =
  slideshow`basic sentences`

slide`"mi" and "sina" subjects`
  .vocab(mi)
  .vocab(sina)
  .vocab(lon)
  .vocab(pona)
  .content(
    ul`a basic sentence has "mi" or "sina" followed by a predicate.`,
    ex.tok`mi jan.`
      .eng`I li 'm a person.`,
    ex.tok`sina toki.`
      .eng`You li 're talking.`,
    ch.tok`sina pona.`
      .eng`You li are good.`,
    ch.eng`We li understand.`
      .tok`mi sona.`,
  )
