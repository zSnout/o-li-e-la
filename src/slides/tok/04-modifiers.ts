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
  musi,
  nimi,
  pali,
  pi,
  suli,
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
  pali,
  musi,
  lukin,
  ale,
)
  .note`Careful of $"That time li doesn't work"! It uses $"li work" as in "@li pali", but there, $"li work" contextually means $"li bad", not $"li something you put effort into".`(
  ul`to modify a word, put any modifier after the base word. both must be content words.`,
  ex.align`~jan`
    .eng`~person`
    .tok`~jan mute`
    .eng`~many people`,
  ex.tok`mi pali mute e musi.`
    .eng`I li often work on e art.`
    .alt`we li worked hard on e the board game.`,
  ch.tok`ona kin li sona e ni.`
    .into`they too li know e that.`
    .tok`ni ale li kama e pilin ike.`
    .into`all those things li bring about e negative feelings.`,
  ch.eng`that time li doesn't work.`
    .into`tenpo ni li ike.`,
)

slide`clarifications + practice`.vocab(
  kin,
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
    .eng`y'all li really want e buildings.`
    .into`sina ale li wile mute e tomo.`
    .eng`those games li aren't fun.`
    .into`musi ni li musi ala.`,
)

slide`negation`.vocab(
  ala,
  tomo,
  lukin,
  a,
  ale,
)(
  ul`most modifiers add specificity to the base word. however, ~"ala" instead _negates_ a phrase!`,
  ex.tok`tomo li lukin ala e sina.`
    .eng`the buildings li aren't watching e you.`,
  ch.tok`ale ala li pona.`
    .into`not everything li is fine.`,
  ch.eng`no eyes li are mine.`
    .into`lukin ala li mi.`
    .eng`he li has no opinion.`
    .into`ona li pilin ala.`,
)

slide`multiple modifiers + practice`.vocab(
  tomo,
  lukin,
  suli,
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
    .eng`none of your houses li are pretty.`,
  ch.tok`nimi ni li pona ala.`
    .into`that word li isn't real.`
    .alt`that name li isn't correct.`
    .tok`suli ni li lili pilin e mi.`
    .into`these grand scales li make e me li feel small.`,
  ch.eng`your name li is very nice.`
    .into`nimi sina li pona mute.`
    .alt`nimi sina li pona a!`
    .alt`nimi sina li pona mute a!`,
)

slide`grouping modifiers with "pp"`.vocab(
  pi,
  musi,
  nimi,
  pali,
  suli,
)(
  ul`when you have multiple modifiers, every modifier applies to the first word.`,
  ul`~"pi" regroups modifiers so that an entire phrase applies to an entire other phrase.`,
  ex.align`pb pali musi suli`
    .eng`pb big and entertaining activity`
    .tok`pb pali pp musi suli`
    .eng`pp very entertaining pb activity`,
  ex.align`pb nimi pali ni`
    .eng`pb this activity-related name`
    .tok`pb nimi pp pali ni`
    .eng`pp this activity's pb name`,
  ch.diff`pb tomo ike mute`
    .against`pb tomo pp ike mute`
    .explain`"pb tomo ike mute" could mean "many bad buildings", whereas "pb tomo pp ike mute" is more like "very-bad building(s)".`,
)

slide`practice (last one!)`.vocab(
  pi,
)(
  ch.tok`mi $lon ala e sona sina.`
    .into`I li have unexisted/falsified e your knowledge.`
    .tok`jan pi mute ike li $lon.`
    .into`too many people li are here.`,
  ch.eng`she li does her homework quite well.`
    .into`ona li pali mute.`
    .alt`ona li pali pona a!`
    .eng`they all li aren't here.`
    .into`ona ale li $lon ala.`
    .eng`all-knowing people tell lies.`
    .into`jan pi sona ale li toki pi $lon ala.`,
  ch.discuss`Do you think ~"mi pi li pali" is a grammatical phrase?`
    .note`Absolutely not. "pp" is only for grouping modifiers, and "li" isn't a modifier. Maybe you meant "pb mi pali"?`
    .prompt`Why or why not? If not, how could you fix it?`,
  ch.discuss`What about ~"ona pi mute"?`
    .note`Nope. "pp" groups modifiers, but here, $"pp mute" isn't modified by anything, so the "pp" is useless! Plain old "pb ona mute" works perfectly.`
    .prompt`Why or why not? If not, how could you fix it?`,
)

createReview`review: modifiers and "pp"`
  .slide(
    ul`to modify a word, put a _modifer_ after the _base word_. multiple modifiers all modify the first word.`,
    ex.align`~jan`
      .eng`~person`
      .tok`~jan pona`
      .eng`~good person`
      .tok`~jan pona musi`
      .eng`~funny, good people`,
    ul`to make a phrase modify another phrase, use "pp".`,
    ex.align`pb pali musi mute`
      .eng`pb many fun activities`
      .tok`pb pali pp musi mute`
      .eng`pp very fun pb activity`,
  )
  .sheet(
    ul`to modify a word, put the _modifer_ after the _base word_`,
    ex.align`~jan`
      .eng`~person`
      .tok`~jan pona`
      .eng`~good person`
      .tok`~jan pona musi`
      .eng`~funny, good people`,
    ul`to make a phrase modify another phrase, use "pp".`,
    ex.align`pb pali musi mute`
      .eng`pb many fun activities`
      .tok`pb pali pp musi mute`
      .eng`pp very fun pb activity`,
    ex.align`pb nimi pali ni`
      .eng`pb this activity-related name`
      .tok`pb nimi pp pali ni`
      .eng`pp this activity's pb name`,
  )

slide`activity: names`
  .note`As an example, take ~"Bob". This is a person's name, so its _headnoun_ will be ~"jan". As for the name, ~"Po" or ~"Pa" works. Thus, the full name is ~"jan Po" or ~"jan Pa".`
  .note`Let's try a country. Take China, for example. ~"China" is natively pronounced as ~"Zhōngguó", which would best be tokiponized as ~"Sonko". Note that ~"Sonkujo" might also work, but that increases the number of syllables, and is thus discouraged. China is a place, so we'll use ~"ma" as a headnoun for a final result of ~"ma Sonko".`
  .note`Try converting your own name, and remember: you don't need to use a headnoun like ~"jan", even if you're a person. Play around with different headnouns and see which one fits best, or switch them around whever you feel like it!`
  .note`And of course, you can break the rules around names to some degree. The primary author of this website goes by just ~"sakawi" or ~"sakisa", all lowercase, no headnoun. It's nonstandard, but plenty of people do it, and you can too!`(
  ul`names in toki pona are like proper adjectives: they always attach to a base word`
    .li`names are always capitalized (pali Sakisa, ma Mewika)`,
  ul`names must follow toki pona's phonotactics (sound-rules):`,
  ul`every syllable is a consonant, then a vowel, then an optional 'n'`
    .li`the first syllable doesn't need an initial consonant`
    .li`the clusters 'ji', 'ti', 'wo', 'wu', 'mn', and 'nn' are banned`,
  ul`tips for converting names:`,
  ul`'b d g z' become 'p t k s' respectively`
    .li`names are based on pronunciation`
    .li`keep syllable count constant by removing sounds if you have to`,
)
