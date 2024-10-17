import {
  ch,
  ex,
  p,
  print,
  slide,
  ul,
} from "../../lib/helpers"
import { Group } from "../../lib/slideshow"
import {
  ante,
  ilo,
  la,
  ma,
  moku,
  mu,
  nasin,
  sama,
  soweli,
  wawa,
  weka,
} from "./vocab"

export const DECK_TOK_05 = Group.of`05``#"la"`

DECK_TOK_05.slide(
  slide`basics of #"la"`.vocab(
    ilo,
    la,
    moku,
    ante,
  )(
    p`#"la" adds context to an utterance. the context comes first.`,
    ex.tok`context phrase la main sentence.`
      .eng`^la In_the_context_of context_phrase, main sentence.`,
    p`we will use boxes to represent how #"la" provides context for a sentence:`,
    ex.la`tenpo ni la mi ante e moku mi`
      .eng`this time la I li change e my food`
      .full`now la I li change e what I eat`,
    ch.discuss`Translate the above to a coherent English sentence.`,
  ),

  slide`#"la" for chaining`.vocab(
    mu,
    moku,
  )
    .note`$"tan from the premises" doesn't have to be translated.`(
    ul.li`#"la" is often used for conditional or causative chains`
      .li`$"^la if ..."`
      .li`$"^la because_of ..."`,
    ex.la`tomo la mi pona pilin`
      .eng`home la I li 'm happy`
      .full`when I'm at home, la I li 'm happy`,
    ch.la`pali la ona li moku ala`
      .eng`working la they li don't eat`
      .full`while working, la they li don't eat`,
    ch.eng`if you're loud, la we li 'll remove e you tan [from the premises]`
      .into`sina mu suli la mi $lon ala e sina`,
  ),

  slide`#"la" for themes and topics`.vocab(
    wawa,
    ilo,
    weka,
    ma,
    soweli,
    nasin,
  )
    .note`$"tan from the premises" doesn't have to be translated, but it could be #"tan ma ni".`
    .note`#"nasin (suli)" is a neat translation for $"social hierarchy", but others will possibly have other ideas.`(
    ul.li`#"la" is often used to set an overall theme`
      .li`$"^la regarding ..."`
      .li`$"^la speaking_of ..."`,
    ex.la`ilo la mi wawa e mute`
      .eng`tools la I li empower e many things`
      .full`Using tools, la I li make e many things li more pwoerful.`,
    ch.la`ma weka la soweli li ilo`
      .eng`distant place la creatures li are robots`
      .full`in far places, la creatures li are robots`,
    ch.eng`in the social hierarchy, la you li are weak`
      .into`nasin (suli) la sina wawa ala`,
  ),

  slide`#"la" for sentence-level modifiers`.vocab(
    sama,
    ante,
    mu,
  )(
    ul.li`#"la" can make a word modify an entire sentence`
      .li`this is similar to english adverbs`,
    ex.la`sama la soweli li mu`
      .eng`similar la creatures li make noises`
      .full`similarly, la fuzzy creatures li make noises`,
    ch.la`ken la mi kama`
      .eng`possible la I li 'll show up`
      .full`maybe la I li 'll show up`,
    ch.eng`unrelatedly, la my eraser li has erased the people`
      .into`ante la ilo weka mi li $lon ala e jan`
      .into`ante la ilo weka mi li weka e jan`,
  ),

  slide`#"la" for perspective and opinions`.vocab(
    ma,
    nasin,
    sama,
  )(
    ul.li`#"la" can represent perspectives and opinions`
      .li`$"^la from_the_perspective_of ..."`,
    ex.la`ona la $sama li ike`
      .eng`them la similarity li is bad`
      .full`they think la similarity li is bad`
      .full`they think la uniformity li is bad`,
    ch.la`mi la nasin ma li ilo pilin`
      .eng`me la the roads li feel robotic`
      .full`to me, la the roads li feel robotic`,
    ch.discuss`Give a perspective of your own using #"la".`,
  ),

  slide`#"la" for location`.vocab(
    mu,
    wawa,
    weka,
    ante,
  )
    .note`Interestingly, $"@la tenpo weka" can be both the distant past and the distant future! From that, we can interpret this either as the weakness of young children or the weakness of old age.`(
    ul.li`#"la" can give locations in space and time`
      .li`$"^la at ..." or $"^la in ..."`
      .li`$"^la during ..."`,
    ex.la`tenpo weka la sina wawa lili`
      .eng`distant time la you li 're a little strong`
      .full`a long time ago, la you li were a little strong`
      .full`in a long time, la you li will be a little strong`,
    ch.la`tomo mu la mi weka`
      .eng`music room la I li 'm absent`
      .full`I li 'm absent @la from the music room`,
    ch.eng`in the spy center, la we li know e everything`
      .into`ma lukin la mi sona e ale`,
  ),

  slide`review: #"la"`.vocabReview(
    ilo,
    moku,
    ante,
    mu,
    wawa,
    weka,
    ma,
    soweli,
    nasin,
    sama,
    la,
  )(
    p`#"la" goes between $"context la" and "the main sentence"`,
    ex.la`tenpo ni la mi ante e moku mi`
      .eng`this time la I li change e my food`
      .full`now la I li change e what I eat`,
    p`the context can be a full sentence or just a phrase`,
    ex.la`sina mu suli la mi $lon ala e sina`
      .eng`if you're loud, la we li 'll remove e you`
      .full`if you're loud, la we li 'll remove e you`,
  ),
)

DECK_TOK_05.print(
  print(
    DECK_TOK_05,
  ).vocab(
    ilo,
    moku,
    ante,
    mu,
    wawa,
    weka,
    ma,
    soweli,
    nasin,
    sama,
    la,
  )(
    p`#"la" goes between $"context la" and "the main sentence"`,
    ex.la`tenpo ni la mi ante e moku mi`
      .eng`this time la I li change e my food`
      .full`now la I li change e what I eat`,
    p`the context can be a full sentence or just a phrase`,
    ex.la`sina mu suli la mi $lon ala e sina`
      .eng`if you're loud, la we li 'll remove e you`
      .full`if you're loud, la we li 'll remove e you`,
    p`some kinds of context #"la" can provide:`,
    ul.li`chains: $"^la if ..." or $"^la because_of ..."`
      .li`themes: $"^la regarding ..."`
      .li`adverbs: $"@la similarly ..." or $"@la unrelatedly ..." or $"@la possibly ..."`
      .li`opinions: $"^la from_the_perspective_of ..."`
      .li`locations: $"^la at ..." or $"^la during ..."`,
  ),
)

// TODO: show .eng[0].full in speaker view
