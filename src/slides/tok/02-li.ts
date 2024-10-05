import {
  ch,
  ex,
  slideshow,
  ul,
} from "../../lib/helpers"
import {
  jan,
  li,
  lon,
  mi,
  ni,
  pona,
  sina,
  sona,
  tawa,
  tenpo,
  toki,
} from "../../lib/vocab"

const [
  slide,
  {
    createReview,
  },
] =
  slideshow(
    2,
  )`basic sentences`

slide`"mi" and "sina" subjects`.vocab(
  mi,
  sina,
  jan,
  toki,
  pona,
)
  .note`Notice that "sina toki" could be $"you li 're talking" or $"you li spoke". There's no tense or aspect distinctions made in toki pona by default. They can be added using the word "la", but we'll talk more about that later.`(
  ul`a basic sentence is just ~"mi" or ~"sina" and a predicate.`,
  ex.tok`mi jan.`
    .eng`I li 'm a person.`
    .alt`we li are people.`,
  ex.tok`sina toki.`
    .eng`you li 're talking.`
    .alt`you li spoke.`,
  ul`try some translations!`,
  ch.tok`sina pona.`
    .into`you li are good.`
    .tok`mi toki.`
    .into`I li 'm communicating.`
    .alt`we li use sign language.`,
)

slide`any word can be a predicate`
  .note`You may have noticed: any word can be a predicate in toki pona! **There's no noun/adjective/verb distinction.**`
  .note`The next slide talks about how both translation challenges become "sina sona".`
  .note`¹ Words like "li" and "e" can't be used as subjects or predicates, since their purpose is to mark parts of speech, and they don't actually have any meaning on their own. "li" is explained very soon.`.vocab(
  sona,
)(
  ul`toki pona has no noun/adjective/verb distinction. all¹ words can be used as subjects and predicates.`,
  ex.tok`mi pona.`
    .eng`I li am good.`,
  ex.tok`mi sina.`
    .eng`I li am you.`
    .alt`I li am yours.`,
  ul`try some more translations!`,
  ch.eng`you li understand.`
    .into`sina sona.`
    .eng`you li are knowledge.`
    .into`sina sona.`,
)

slide`context saves the day!`.source(
  {
    title:
      "kijetesantakalu o anpa e linja suli sina!",
    author:
      "u/nomis560",
    url: "https://www.reddit.com/r/tokipona/comments/1898isq/kijetesantakalu_o_kijetesantakalu_o_o_anpa_e",
  },
)
  .image
  .auto`/IMG_7604.jpeg`
  .alt`person at the bottom of a tower with a kijetesantakalu at the top of the tower and an extended tail at the bottom.`
  .note`This picture uses many words that haven't been introduced yet. That's okay; we're trying to get people into the toki pona mindset, not teach them vocabulary.`(
  ul`$"you li understand" and $"you li are knowledge" are the same??`,
  ul`that's right! however, most of the time, you can easily distinguish this!`,
  ul`this person to the right is asking the raccoon in the tower $"raccoon o! raccoon o! o let down e your long and flexible thing!"`,
  ch.discuss`what do you think the person wants? come up with a few ideas and decide on the one you think is most reasonable.`,
)

slide`more subjects with "li"`.vocab(
  sona,
  ni,
  lon,
  tenpo,
  tawa,
)
  .note`$"that li 's you" is a perfectly normal sentence when looking at photographs.`(
  ul`if you want a subject other than "mi" or "sina", put "li" between the subject and predicate.`,
  ex.tok`sona li pona.`
    .eng`knowledge li is good.`,
  ex.tok`ni li $lon.`
    .eng`that li 's true.`,
  ch.eng`that li 's wonderful!`
    .into`ni li pona!`
    .eng`that's running away.`
    .into`ni li $tawa.`,
  ch.tok`tenpo li $tawa.`
    .into`time li flows.`
    .tok`ni li mi.`
    .into`that li 's mine.`,
)

slide`some grammatical terms`.vocab(
  li,
)(
  ul`~"content words" are meaning-words like "sona"`
    .li`~"particles" are grammar-words like "li"`,
  ul`these terms are often used in the toki pona community, so they're useful to know.`,
  ch.discuss`is ~"mi" a content word or a particle?`
    .prompt`is ~"lon" a content word or a particle?`
    .prompt`is ~"tawa" a content word or a particle?`,
)

createReview`review: basic sentences`
  .slide(
    ul`"mi" or "sina" followed by a predicate (any content word) makes a complete sentence.`,
    ex.align`mi toki.`
      .eng`I li speak.`
      .tok`sina sona.`
      .eng`you li know.`,
    ul`for subjects other than "mi" and "sina", say "li" in between the subject and the predicate.`,
    ex.tok`sona li pona.`
      .eng`knowledge li is good.`,
    ex.tok`ni li $lon.`
      .eng`that li 's true.`,
  )
  .sheet(
    ul`"mi" or "sina" followed by a predicate (any content word) makes a complete sentence.`,
    ex.tok`mi toki.`
      .eng`I li speak.`,
    ex.tok`sina sona.`
      .eng`you li know.`,
    ul`for subjects other than "mi" and "sina", say "li" in between the subject and the predicate.`,
    ex.tok`sona li pona.`
      .eng`knowledge li is good.`,
    ex.tok`ni li $lon.`
      .eng`that li 's true.`,
  )
