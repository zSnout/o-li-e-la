import {
  ch,
  ex,
  p,
  slide,
  ul,
} from "../../helpers"
import { Group } from "../../slideshow"
import {
  pana,
  pilin,
} from "./vocab"

export const DECK_TOK_00 = Group.of`00``test of various functionalities`

export const SLIDE_TEST_SYNTAX_HIGHLIGHTING =
  slide`syntax highlighting test`(
    ex.tok`@ mu, ijo wawa oo! tenpo ni la mi wile pana e sona suli tawa sina ale. o weka ala e tomo mi. seme la sina wile ni? ni li ike wawa a! ijo ale en jaki ale oo, o ni ala a! o weka ala e tomo ante ale a! ante la sina wile e kili anu e pan?`
      .eng`@ Hi, cool being o! Right now, la I li want to give e important information tawa to you all. o Don't make e my house o disappear. Why la li would @en you li want to do this? That li 's terrible! All beings en and all disgusting things, o don't do this! o Don't remove e any other buildings! Also, la do you li want e fruit anu e or bread?`,
  )

export const SLIDE_PREPOSITIONS_AS_PREDICATES =
  slide`prepositions as predicates`
    .vocab(
      pilin,
      pana,
    )
    .content(
      p`prepositions can be entire predicates, without needing a verb before them`,
      ex.tok`mi tawa tomo sina.`
        .eng`I tawa 'm_going_to your house.`,
      ch.tok`ona li lon ma.`
        .into`they lon 're_at a place.`
        .tok`sina kepeken ilo moku.`
        .into`you kepeken 're_using a fork.`
        .into`you kepeken 're_using chopsticks.`
        .tok`ni li sama sina.`
        .into`this sama is_like you.`,
      ch.eng`he tawa 's_going_to the school.`
        .into`ona li tawa ma sona.`
        .eng`we tawa 're_walking_towards the loud sound.`
        .into`mi tawa kalama suli.`,
    )

export const SLIDE_LA_FOR_MARKING_TIME =
  slide`la for marking time`(
    p`#"tenpo ... la" phrases are used to mark when something occurs in time`,
    ex.la`tenpo kama la soweli li kama tawa ma kasi`
      .eng`coming time la furry creatures li come tawa to the forest`
      .full`in the future, la furry creatures li will come tawa to the forest`,
    ch.la`tenpo weka la toki uta li ante mute`
      .eng`far time la spoken language li was/will be very different`
      .full`in a distant time,la  spoken language li was/will be very different`,
    ch.eng`right now, la my parents li are grounding e me.`
      .into`tenpo ni la mama mi li awen e mi lon tomo.`,
  )

export const SLIDE_THE_PARTICLE_LA =
  slide`the particle la`(
    p`the particle #"la" works like this, where the context phrase can be a phrase or a sentence`,
    ex.tok`context phrase la main sentence.`
      .eng`^la In_the_context_of context phrase, main sentence.`,
    ex.la`tenpo pini poka la jan li alasa pona e mi`
      .eng`nearby past la somebody li tried to improve e me`
      .full`recently, la somebody li tried to improve e me`,
    ex.la`kon li wawa la mi ken ala $tawa lon wile`
      .eng`the wind is strong la I li cannot move lon on my will`
      .full`because the wind is strong, la I li cannot move lon on my will`,
  )

export const SLIDE_MODIFIER_STACKING =
  slide`modifier stacking`(
    ul.li`__**usually, you don't need modifiers!**__`
      .li`all modifiers modify the first word`
      .li`1-2 words are usually specific enough`
      .li`3+ is acceptable, but is probably overspecifying`,
    ex.align`~ kulupu`
      .eng`~ group`
      .tok`~ kulupu jan`
      .eng`~ group of people`
      .tok`~ kulupu jan suli`
      .eng`~ large group of people`
      .tok`~ kulupu jan suli ike`
      .eng`~ bad, ~ large group of people`,
    ch.eng`~ sleeping adult`
      .into`~ jan suli lape`
      .hint`decompose "adult"`
      .eng`~ nice picture of fruit`
      .into`~ sitelen kili pona`
      .hint`find the core word first`,
  )

export const SLIDE_THE_PARTICLE_SEME =
  slide`the particle seme (for open-ended questions)`(
    ul.li`to make a fill-in-the-blank question, make a normal sentence and use #"@ seme" to replace what you want to know`
      .li`don't change the word order from what the sentence would be without #"@ seme"`
      .li`you can response with a full sentence, or with just what was asked for`,
    ex.qa`sina wile e seme?`
      .eng`you li want e what?`
      .tok`@e kasi.`
      .eng`e A plant.`,
    ex.qa`seme li lon tomo ni?`
      .eng`what lon 's_in this building?`
      .tok`akesi li lon tomo ni.`
      .eng`reptiles lon are_in this building.`,
    ex.qa`ni li seme?`
      .eng`li What is @en this?`
      .tok`@li esun moku.`
      .eng`li A restaurant.`,
  )

export const SLIDE_RESPONDING_TO_X_ALA_X =
  slide`responding to #"@li X ala X"`
    .note`hello *people*!`.content(
    ex.qa`sina moku ala moku e kasi?`
      .eng`did you li eat e the plants?`
      .tok`@li moku.`
      .eng`li Eat (yes).`
      .tok`@li moku ala.`
      .eng`li Didn't eat (no).`
      .tok`@li ala.`
      .eng`li No.`
      .tok`mi ni.`
      .eng`I li did that.`
      .tok`mi ni ala.`
      .eng`I li didn't do that.`,
    ch.label`Respond to these questions:`
      .discuss`akesi li moli ala moli?`
      .note`hi`
      .note`world`
      .note`goodbye`
      .also`mi o moli ala moli e ona?`
      .note`goodbye`
      .also`sina pana ala pana e ona tawa sike?`,
  )

export const SLIDE_THE_PARTICLE_PI =
  slide`the particle #"pp"`(
    ch.diff`pb tomo moku lili`
      .vsrs`pb tomo pp moku lili`
      .expl`While #"pb tomo moku lili" refers to a small food-place (like a small restaurant), #"pb tomo pp moku lili" refers to a small-food place (like a snack bar).`
      .also`pb lipu sona suno`
      .vsrs`pb lipu pp sona suno`
      .expl`While #"pb lipu sona suno" refers to a lit-up sheet of knowledge (like a page of a Kindle reader), #"pb lipu pp sona suno" could be a book about sun-knowledge (like a book on astrophysics).`
      .also`pb jan poka mute`
      .vsrs`pb jan pp poka mute`
      .expl`While #"pb jan poka mute" refers to many close people (maybe many friends, or maybe the people next to you in class), #"pb jan pp poka mute" refers to people who are very close by (think: the people next to you in a tight crowd).`,
  )

DECK_TOK_00.slide(
  SLIDE_TEST_SYNTAX_HIGHLIGHTING,
  SLIDE_PREPOSITIONS_AS_PREDICATES,
  SLIDE_LA_FOR_MARKING_TIME,
  SLIDE_THE_PARTICLE_LA,
  SLIDE_MODIFIER_STACKING,
  SLIDE_THE_PARTICLE_SEME,
  SLIDE_RESPONDING_TO_X_ALA_X,
  SLIDE_THE_PARTICLE_PI,
)
