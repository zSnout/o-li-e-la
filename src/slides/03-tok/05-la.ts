import {
  ch,
  ex,
  slideshow,
  ul,
} from "../../lib/helpers"
import {
  pini,
  ilo,
  taso,
  ante,
  lape,
  moku,
  sama,
  ma,
  kalama,
  suno,
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
  pini,
  ilo,
  la,
)(
  ul`"la" adds context to an utterance. the context comes first.`,
  ex.tok`[context phrase] la [main sentence].`
    .eng`prela In_the_context_of [context_phrase], [main sentence].`,
  ul`we will use boxes to represent how "la" provides context for a sentence:`,
  ex.la`tenpo pini la mi moku`
    .eng`finished time la I li eat`,
  ch.discuss`Translate the above to a coherent English sentence.`,
)

slide`"la" for chaining`.vocab(
  suno,
  lape,
)(
  ul`"la" is often used for conditional or causative chains`
    .li`conditional = ~"if ... then ..."`
    .li`causative = ~"because of ... this happened: ..."`,
  ex.la`lape la mi pona pilin`
    .eng`sleep la I li 'm happy`,
  ch.la`suno la ona li lape ala`
    .eng`sun la they don't sleep`,
)
