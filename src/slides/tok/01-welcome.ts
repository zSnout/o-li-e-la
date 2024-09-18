import {
  ch,
  slideshow,
  ul,
} from "../../lib/helpers"
import {
  en,
  ken,
  lukin,
  mi,
  mun,
  toki,
  tu,
  wan,
} from "../../lib/vocab"

const [
  slide,
] =
  slideshow`welcome!`

slide`important! read before using`(
  ul`this slideshow software (%"o li e la") was custom-made by sakawi to help teach toki pona. they also find creating single-use software an incredibly joyful task.`,
  ul`%"o li e la" was also created to move away from increasingly monopolistic mega-corporation-based cloud platforms. your content should be your own, and should be stored in plain text, the only format which will remain accessible forever.`,
  ul`colors, fonts, and some text decorations are used as teaching tools. sentences look like "taso, context la subject li predicate e object lon preposition". phrases look like %"word pi word word".`,
  ul`if you find issues with the content, styling, or usability of this tool, contact @zsakowitz on discord, and state your issue and that it pertains to the project %"o li e la".`,
)

slide.suli`welcome to toki pona club!`()

slide.suli`our goals`(
  ul`to teach you toki pona`
    .li`to explore toki pona's culture`
    .li`to help you break down words`
    .li`to have fun!`,
)

slide.suli`what is toki pona?`
  .note`**The Language:** It's a minimalist language with only around 130 words and not too much grammar. It can also be learned in only a few months, and is a good second language.`
  .note`**The Creator:** Sonja Lang, a Canadian linguist, created toki pona in 2001.` // TODO: why did sonja make it
  .note`**The Community:** toki pona has a vibrant community with hundreds of active individuals communicating online, and around 13,000 more partially active members. It's spread out throughout several`()

slide.suli`why learn toki pona?`
  .note`For those who haven't learned other languages before, or have had trouble in school, toki pona can be a great way to get into language learning.`
  .note`toki pona has a philosophy of breaking down complicated ideas into simple concepts, and internalizing this while learning the language can help you break down ideas in English (or your native language). This can be especially helpful in literature and history classes.`(
  ul`first second language`
    .li`secret communication`
    .li`wonderful community`
    .li`art has an audience`
    .li`introspect your mind`
    .li`simplify complex ideas`
    .li`__**it's easy and fun!**__`,
)

slide.suli`toki pona as art`
  .image
  .half`/jonathan-gabel-waso-walo.jpg`
  .alt`Jonathan Gabel's "waso walo", a three-column text about animals at night written using sitelen sitelen.`
  .source(
    {
      title:
        "waso walo",
      author:
        "Jonathan Gabel",
      url: "https://arc.net/l/quote/sppmbuwf",
    },
  )
  .content(
    ul`Mayan-inspired hieroglyphs`
      .li`color and shading used to write`,
  )

slide.suli`toki pona as art`
  .image
  .half`/ma-pona-banner-kala-pona.png`
  .contain``
  .alt`kala pona's poster for %"ma pona pi toki pona", featuring a rainbow gradient background with small kasi growing from a linja-like ground and a soweli with a kijetesantakalu on its back looking at a sign which reads %"ma pona".`
  .source(
    {
      title:
        "ma pona pi toki pona banner",
      author:
        "kala pona",
      url: "https://dribbble.com/shots/22009456-discord-server-banner-ma-pona-pi-toki-pona",
    },
  )
  .content(
    ul`ma pona pi toki pona's old banner`
      .li`uses sitelen pona as objects`,
  )

// TODO: emojis, sitelen pona, stick figures

slide`letters & pronunciation`
  .note`Tok Pisin is a language spoken throughout Papua New Guinea. It mainly descends from English, but has elements of other languages as well, including German, Malay, Portuguese, and Austronesian languages. It provides many of the words on the list here, and the word %"toki" itself comes from the name __Tok__ Pisin!`
  .vocabNoDefn(
    en,
    mi,
    lukin,
    ken,
    mun,
    toki,
    tu,
    wan,
  )
  .content(
    ul`consonants **(j k l m n p s t w)** are like English`
      .li`exception: **j** is pronounced as **y**`,
    ul`vowels **(a e i o u)** are similar to Spanish`
      .li`ah eh ee oh oo`,
    ch.discuss`try pronouncing the words on the right.`,
    ul`most of the words on the right either come from English or from Tok Pisin, an English-based creole. try guessing their meanings!`,
  )
