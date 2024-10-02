import {
  ch,
  ex,
  slideshow,
  ul,
} from "../../lib/helpers"
import {
  e,
  ike,
  kama,
  ken,
  lili,
  mute,
  ona,
  pilin,
  tan,
  wile,
  sitelen,
} from "../../lib/vocab"

const [
  slide,
  {
    createReview,
  },
] =
  slideshow(
    3,
  )`direct objects`

slide`recap: basic sentences`(
  ch.tok`mi sona.`
    .into`I li know.`
    .tok`lon li pona.`
    .into`existence li is nice.`
    .tok`tenpo li tawa.`
    .into`time li ticks by.`,
  ch.eng`li there are @en people.`
    .into`jan li $lon.`
    .eng`you li yelled at your friends.`
    .into`sina toki.`
    .eng`facts li are mine.`
    .into`sona li mi.`,
)

slide`basics of "e"`.vocab(
  wile,
  ona,
  mute,
  e,
  tan,
)(
  ul`to add a direct object to a sentence, write "e" followed by the object at the end of the sentence.`,
  ex.tok`mi wile e ni.`
    .eng`I li want e that.`,
  ex.tok`ona li sona e mute.`
    .eng`they li know e a lot.`,
  ch.tok`ona li toki e tan.`
    .into`she li said e the reason.`,
  ch.eng`it li knows e the people.`
    .into`ona li sona e jan.`,
)

slide`~"make ..." predicates with "e"`.vocab(
  kama,
  ike,
  ken,
  pilin,
  lili,
  sitelen,
)
  .note`"@li weka" is perfect for the first English challenge, but it hasn't appeared yet.`
  .note`"@li wawa" and "@li awen" are wonderful for the second, but, again, they haven't appeared yet.`(
  ul`"e" can also mean ~"to give a target a quality"`,
  ex.tok`sina kama e ona.`
    .eng`you li make-arrive e him.`
    .alt`you li bring e him.`,
  ex.tok`ona li ken e toki.`
    .eng`they li turned on e video call chat.`,
  ch.tok`sona li ken e sina.`
    .into`knowledge li gives e you li possibilities.`
    .tok`pilin li lili e $tan.`
    .into`feelings li make e reasons li insignificant.`,
  ch.eng`time li fades e memories.`
    .into`tenpo li ike e sona.`
    .alt`tenpo li lili e sona.`
    .alt`tenpo li weka e sona.`
    .eng`writing strengthens them.`
    .into`sitelen li pona e ona.`
    .alt`sitelen li wawa e ona.`
    .alt`sitelen li awen e ona.`,
)

createReview`review: direct objects with "e"`
  .slide(
    ul`to add a direct object to a sentence, write "e" followed by the object at the end of the sentence.`,
    ex.tok`mi wile e ni.`
      .eng`I li want e that.`,
    ex.tok`ona li sona e mute.`
      .eng`they li know e a lot.`,
    ul`"e" can also mean ~"to give a target a quality"`,
    ex.tok`sina kama e ona.`
      .eng`you li make-arrive e him.`
      .alt`you li bring e him.`,
  )
  .sheet(
    ul`to add a direct object to a sentence, write "e" followed by the object at the end of the sentence.`,
    ex.tok`mi wile e ni.`
      .eng`I li want e that.`,
    ex.tok`ona li sona e mute.`
      .eng`they li know e a lot.`,
    ul`"e" can also mean ~"to give a target a quality"`,
    ex.tok`sina kama e ona.`
      .eng`you li make-arrive e him.`
      .alt`you li bring e him.`,
    ex.tok`tenpo li ike e sona.`
      .eng`time li worsens e memories.`,
  )
