import {
  ch,
  ex,
  slideshow,
  ul,
} from "../lib/helpers"
import {
  pana,
  pilin,
} from "../lib/vocab"

const [
  slide,
] =
  slideshow`Test of various functionalities`

export const SLIDE_TEST_SYNTAX_HIGHLIGHTING =
  slide`syntax highlighting test`(
    ex.tok`mu, ijo wawa o! tenpo ni la mi wile pana e sona suli tawa sina ale. o weka ala e tomo mi. seme la sina wile ni? ni li ike wawa a! ijo ale en jaki ale o, o ni ala a! o weka ala e tomo ante ale a! ante la sina wile e kili anu e pan?`
      .eng`@@ Hi, cool being o! Right now, la I li want to give e important information tawa to you all. o Don't make e my house o disappear. Why la li would @en you li want to do this? That li 's terrible! All beings en and all disgusting things, o don't do this! o Don't remove e any other buildings! Also, la do you li want e fruit anu e or bread?`,
  )

export const SLIDE_PREPOSITIONS_AS_PREDICATES =
  slide`prepositions as predicates`
    .vocab(
      pilin,
    )
    .vocab(
      pana,
    )
    .content(
      ul`prepositions can be entire predicates, without needing a verb before them`,
      ex.tok`mi tawa tomo sina.`
        .eng`I tawa 'm_going_to your house.`,
      ch.tok`ona li lon ma.`
        .into`They lon 're_at a place.`
        .tok`sina kepeken ilo moku.`
        .into`You kepeken 're_using a fork.`
        .alt`You kepeken 're_using chopsticks.`
        .tok`ni li sama sina.`
        .into`This sama is_like you.`,
      ch.eng`He tawa 's_going_to the school.`
        .into`ona li tawa ma sona.`
        .eng`We tawa 're_walking_towards the loud sound.`
        .into`mi tawa kalama suli.`,
    )

export const SLIDE_LA_FOR_MARKING_TIME =
  slide`la for marking time`(
    ul`"tenpo ... la" phrases are used to mark when something occurs in time`,
    ex.la`tenpo kama la soweli kama tawa ma kasi`
      .eng`coming time la furry creatures li come tawa to the forest`,
    ch.la`tenpo weka la toki uta li ante mute`
      .eng`far time la spoken language li was very different`,
    ch.label`Translate using "la":`
      .eng`Right now, la my parents li are grounding e me.`
      .into`tenpo ni la mama mi li awen e mi lon tomo.`,
  )

export const SLIDE_THE_PARTICLE_LA =
  slide`the particle la`(
    ul`the particle "la" works like this, where the context phrase can be a phrase or a sentence`,
    ex.tok`[context phrase] la [main sentence].`
      .eng`prela In_the_context_of [context phrase], [main sentence].`,
    ex.la`tenpo pini poka la jan li alasa pona e mi`
      .eng`a nearby finished time la somebody li tried to improve e me`,
    ex.la`kon li wawa la mi ken ala tawa lon wile`
      .eng`the wind is strong la I li cannot move lon on my will`,
  )

export const SLIDE_MODIFIER_STACKING =
  slide`modifier stacking`(
    ul`__**usually, you don't need modifiers!**__`
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
      .eng`~ bad, large group of people`,
    ch.eng`~% sleeping adult`
      .hint`decompose $%"adult"`
      .into`~% jan suli lape`
      .eng`~% nice picture of fruit`
      .hint`find the core word first`
      .into`~% sitelen kili pona`,
  )

export const SLIDE_THE_PARTICLE_SEME =
  slide`the particle seme (for open-ended questions)`(
    ul`to make a fill-in-the-blank question, make a normal sentence and use "@@ seme" to replace what you want to know`
      .li`don't change the word order from what the sentence would be without "@@ seme"`
      .li`you can response with a full sentence, or with just what was asked for`,
    ex.qa`sina wile e seme?`
      .eng`You li want e what?`
      .tok`@e kasi.`
      .eng`e A plant.`,
    ex.qa`seme li lon tomo ni?`
      .eng`What lon 's_in this building?`
      .tok`akesi li lon tomo ni.`
      .eng`Reptiles lon are_in this building.`,
    ex.qa`ni li seme?`
      .eng`li What is @en this?`
      .tok`@li esun moku.`
      .eng`li A restaurant.`,
  )

export const SLIDE_RESPONDING_TO_X_ALA_X =
  slide`responding to "@li X ala X"`
    .note`hello *people*!`.content(
    ex.qa`sina moku ala moku e kasi?`
      .eng`Did you li eat e the plants?`
      .tok`@li moku.`
      .eng`li Eat (yes).`
      .alt`@li moku ala.`
      .eng`li Didn't eat (no).`
      .alt`@li ala.`
      .eng`li No.`
      .alt`mi ni.`
      .eng`I li did that.`
      .alt`mi ni ala.`
      .eng`I li didn't do that.`,
    ch
      .discuss
      .label`Respond to these questions:`
      .prompt`~"akesi li moli ala moli?"`
      .note`hi`
      .note`world`
      .note`goodbye`
      .prompt`~"mi o moli ala moli e ona?"`
      .note`goodbye`
      .prompt`~"sina pana ala pana e ona tawa sike?"`,
  )

export const SLIDE_THE_PARTICLE_PI =
  slide`the particle %"pi"`(
    ch.diff`% tomo moku lili`
      .against`% tomo pi moku lili`
      .explain`While %"tomo moku lili" refers to a small food-place (like a small restaurant), %"tomo pi moku lili" refers to a small-food place (like a snack bar).`
      .also`% lipu sona suno`
      .against`% lipu pi sona suno`
      .explain`While %"lipu sona suno" refers to a lit-up sheet of knowledge (like a page of a Kindle reader), %"lipu pi sona suno" could be a book about sun-knowledge (like a book on astrophysics).`
      .also`% jan poka mute`
      .against`% jan pi poka mute`
      .explain`While %"jan poka mute" refers to many close people (maybe many friends, or maybe the people next to you in class), %"jan pi poka mute" refers to people who are very close by (think: the people next to you in a tight crowd).`,
  )
