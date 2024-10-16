import { pssll } from "../../ext/aside/pssll"
import { defineIFrame } from "../../ext/content/iframe"
import { title } from "../../ext/content/title"
import { defineTwoCol } from "../../ext/content/two-col"
import { note } from "../../ext/note/p"
import { defineNoPad } from "../../ext/slide/no-pad"
import { fmt } from "../../ext/text/fmt"
import { link } from "../../ext/text/linked"
import {
  im,
  p,
  slide,
  ul,
} from "../../lib/helpers"
import { Group } from "../../lib/slideshow"

export const DECK_CONLANGS = Group.of`00``conlangs`

DECK_CONLANGS.slide(
  slide`conlangs`
    .center()
    .image(
      "/tshevu_community_icon.jpg",
      "A koi fish with five ripples on it and a sixth in front of it.",
      "cover",
    )
    .note`If you're viewing this online, you're hopefully in document view, where you see one column with all the slides and one column with these notes. If you're not in that view, ${link`/?view=doc``switch to it to make your viewing life easier`}.`
    .note`If you're about to criticize me for only providing the slides in light mode, switch your computer to dark mode. If you're confused by why the slides are dark blue instead of white, switch your computer to light mode.`.content(
    p`(constructed languages)`,
  ),
  slide`guiding questions`.center()
    .note`This presentation will revolve around answering two important questions: what are conlangs, and why do people make them?`.content(
    ul.li`what are conlangs?`
      .li`why make conlangs?`,
  ),
  slide``.center()
    .note`What are conlangs? Conlangs are one of the two classes of languages.`
    .note`**Natural languages** are those like English, Chinese, Swahili, and Tok Pisin. These are formed when people speak normally and naturally evolve through the linguistic processes of change. Today, we have thousands of natural languages because groups of people split up and their languages diverged through continuous evolution.`
    .note`**Constructed languages** are those like toki pona, Esperanto, Dothraki, Ithkuil, Viossa, Toaq, and Lojban. These exist because somebody decided to create their own language _with intention_. Many constructed languages are intended to be spoken by humans, but certainly not all. While constructed languages often don't have many native speakers, they are still real languages.`
    .note`These two are often called **natlangs** and **conlangs** respectively.`.content(
    title`natural languages`,
    title`constructed languages`,
  ),
  slide`a brief history`.center()
    .note`Many conlangs have been created over the years, with one very old one we we have direct evidence for being **Lingua Ignota**. Lingua Ignota was created in the 12th century by the nun Hildegard von Bingen as a way to connect more deeply with God. Its vocabulary drew primarily from Latin.`
    .note`Hildegard cited divine inspiration for their language, and it thus fits into a subcategory of conlangs primarily used for spiritual purposes.`
    .note`Many other languages have been created their own languages since then, with a massive explosion in the 20th and 21st centuries. Many recent movies have hired professional conlangers, who have made **Klingon** for Star Trek, **Na'vi** for Avatar, and **Dothraki** for Game of Thrones, among others.`(
    ul.li`1100s: Lingua Ignota`
      .li`1879: Volapük`
      .li`1887: Esperanto`
      .li`1910: Tolkien's langs`
      .li`1980s: Klingon`
      .li`today: your language??`,
  ),
  slide`why make conlangs?`.center()
    .note`Why do people make conlangs? There are many reasons, but they largely fall into five categories: to unite the world under a common language, to make a work of media more complete, to provide a medium for artwork, to test the limits of language, and simply because there's no reason not to.`
    .note`We'll look at one example of each.`(
    ul.li`to unite the world`
      .li`for a movie, tv show, or book`
      .li`as artistic expression`
      .li`to test language`
      .li`because why not`,
  ),
  slide`esperanto: to
unite the world`
    .center()
    .image(
      "/eo_flag_wikimedia.png",
      "A green flag with a white square in its top-left corner and a green star within that.",
    )
    .note`The most well-known conlang is probably Esperanto.`
    .note`Esperanto was created in 1887 by Ludwik Lejzer Zamenhof as an **international auxiliary language**, a language which everybody would learn in addition to their native tongue. The idea was to simplify cross-linguistic communication by simply ensuring that everybody spoke Esperanto.`
    .note`Esperanto was created as an "easy" language by having its grammar be dramatically reduced from that of other European languages, and its vocabulary was said to come from many different sources, so that everybody would have some familiarity with its words before having any Esperanto exposure.`
    .note`However, Zamenhof's sources were all primarily European languages, and the sounds came from his mother tongue, Polish. As such, the grammar can be very difficult for speakers of non-European languages, such as over half of the world. As tangible examples, Esperanto includes three tenses (which are not mandatory in Chinese), two cases (which are not mandatory in English), and singular-plural distinctions (which are not mandatory in Japanese).`
    .note`Esperanto has experienced many criticisms since its inception, and its status as a possible world language has been entirely usurped by English. However, it still is the only conlang with confirmed native speakers (estimated in the thousands), and, according to some estimates, has millions of non-native speakers. The sheer quantity of Esperanto speakers makes it an important language to know about, despite all the critics.`(
    ul.li`1887`
      .li`L. L. Zamenhof`
      .li`most-spoken conlang`,
  ),
  slide`dothraki: for the media`
    .center()
    .image(
      "/Living-language-dothraki.webp",
      "The cover of “Living Language: Dothraki” by David J. Peterson.",
    )
    .note`**Dothraki** is another well-known conlang. It was created in 2009 by David J. Peterson as part of the TV series *Game of Thrones*.`
    .note`It was built off of the few phrases found in Game of Thrones's source series, *A Song of Ice and Fire*, originally written by George R. R. Martin.`
    .note`Because it was created for a TV show, Dothraki had some constraints. First, it had to be pronouncable for native English speakers, the show's primary actors, and so Dothraki does not have as unique a **phonology** (sound system) as some other languages. However, the ways in which its sounds *are* combined with the few non-English sounds makes it sound highly foreign to English natives, perfect for a TV show portraying a different world.`
    .note`Dothraki has since become well-known in the conlanging community, and even has a book created by DJP which teaches it. The book's cover is pictured here.`
    .note`Dothraki is part of a category known as **artlangs**: languages created for artistic purposes.`(
    ul.li`2009`
      .li`David J. Peterson`
      .li`known due to Game of Thrones`,
  ),
  slide`tshevu: as
  artistic expression`
    .center()
    .image(
      // https://www.reddit.com/r/conlangs/comments/mocrjd/what_does_a_recipe_look_like_in_tsevhu/
      "/6mpmn36ures61.webp",
      "A work of Koiwrit created in the language Tshevu.",
    )
    .note`**Tshevu** \`/tsεβu/\`, created in 2020 by koallary, is semi-famous for its beautiful **non-linear writing system**.`
    .note`Instead of the standard rows of text, Tshevu's primary writing system, **Koiwrit**, is drawn using stylistic ripples on koi fish. The different rings of a ripple indicate different letters, the position of the ripple overall on a fish indicates its grammatical function in the sentence, and ripples outside of the fish convey additional information.`
    .note`The art shown here is a recipe in Tshevu. The cover image of this slide deck was also a picture of Tshevu script.`
    .note`Tshevu, like Dothraki, is an **artlang**.`(
    ul.li`2020`
      .li`koallary`
      .li`known for its writing system`,
  ),
  slide`ithkuil: to test language`
    .center()
    .image(
      "/ocqvalaa-tali-sqio.svg",
      "The Ithkuil words “očvalá tali šio malëuţřaitie ogvbřalörxeu” written using Ithkuil calligraphic script.",
    )
    .note`**Ithkuil** is the ever-present example of a conlang created to test language.`
    .note`It was originally created in 2004 by John Quijada, and has a reputation as being the most difficult language to learn. This is primarily due to that Ithkuil stacks many grammatical categories into single words, and that there is no language on Earth which has all the same categories as Ithkuil.`
    .note`Ithkuil has undergone three major revisions since its initial debut. In the fourth and easiest version, it inflects for a minimum of 22 categories on each of its primary nominal words, with only two or three having English equivalents.`
    .note`(These are concatenation, stem, version, root, function, specification, context, affiliation, configuration, extension, perspective, essence, case-scope/mood, valence/phase/effect/aspect, case/illocution/validation, and word category, respectively.)`
    .note`Ithkuil uses its expansive grammar to do away with a large lexicon, and thus only has around 6000 roots and 400 affixes. Even its native name, "malëuţřait", literally means "this feedback-driven/self-sustaining system based on linguistic utterances for communication", or "this language" in simple English. Because why include a word for "language" when you can derive it yourself?`
    .note`Due to its systematic derivations, Ithkuil is considered a **loglang**, a logical language.`(
    ul.li`2004, 2007, 2011, 2023`
      .li`John Quijada`
      .li`notable for grammatical capability`,
  ),
  im.src`/ithkuil_grammar.png`
    .alt`A highly packed table containing the entirety of Ithkuil's grammar and conjugations on it. No definitions are given for any of the abbreviations used.`
    .note`One neat thing about Ithkuil is that even though the grammar is complicated, it is almost perfectly regular. Thus, the entirety of Ithkuil's conjugations and modifiers can be written on a single sheet of paper. All the reader needs to know is the meaning of each abbreviation and the order to put these strings together in a word. And that's definitely possible /serious!`,
  im.src`/ithkuil_script.png`
    .alt`A highly packed table containing almost the entirety of Ithkuil's script on it. Every element is given with pointers written to explain when it is used, and only the numeric characters are missing.`
    .note`Ithkuil also has a very beautiful and logical writing system. Its writing system is quite different from how spoken Ithkuil works, though, and so many analyze the two as related, but different languages.`
    .note`As one tangible difference, spoken Ithkuil can differentiate between 9 types of names, but written Ithkuil can differentiate between 22 types of names.`
    .note`Written Ithkuil is also somewhat more logical than spoken Ithkuil. While spoken Ithkuil has to make concessions so that it is efficiently pronounceable, increasing the spoken language's irregularities, written Ithkuil has zero irregularities. Everything is in perfect order.`,
  slide`pin suo sie lep lan:
  because why not`
    .center()
    .aside(
      pssll`mai lep pak eis ein fet den der nin tik asa han sei res aet nin per ues eis bon kon mai rai pak eis ein fet den der uai han len ari nou kau kas sei mai kon sti pas nou ser den sei bon aet uon uer sie sli aet tui bed ibe sie dan ein lab bat isi ibe aso sie uak uer han ser ein epi pak ibe sie pat sem ein ade kas lab kas aso nou kur aso aso han ein mai uon spi sat mai tri uer bra has tuo kai bao fru uer sei nin api kot sei nin pit nin sae rie bat sei nou lai sat kas tru eis mai kao uer mai nok aet iet ade aet nai sou mai uon nin ame sti`,
    )
    .note`While all the languages we've talked about today have clear reasons for their existence, not all languages are like that. **sakawi's stupid three-letter language** is such an example.`
    .note`**sakawi's stupid three-letter language** is really only notable for its unique design decisions to 1) make all words precisely three letters long, 2) have no documentation anywhere other than past writings, and 3) elide the concept of sentences.`
    .note`The text on the right here is a translation of a poem from my literature class. It has not been adjusted to be a perfect rectangle; it simply had a word count which was a perfect multiple of nine, enhancing the vision of it as a language where everything blends together in perfect regularity.`
    .note`I originally created this language as part of a joke among friends. I have since revised it during most of my class periods during school.`(
    ul.li`2024`
      .li`sakawi`
      .li`not particularly notable`,
  ),
  slide`toki pona`
    .center()
    .image(
      // https://www.reddit.com/r/tokipona/comments/oklgka/len_anpa_pi_tomo_musi_toki_pona_arcade_carpet/?tl=nl
      "/len_anpa.png",
      "An array of colorful sitelen pona symbols.",
      "cover",
    )
    .note`Bonus example! **toki pona** is one of my favorite languages, and it's renowned for being one of the simplest and most approachable languages.`
    .note`Created in 2001 by Canadian linguist Sonja Lang, toki pona is a minimalist language with only around 130 words and a very simple grammar. It accomplishes this by having words which talk about very generic concepts, like "liquid" as opposed to "acid" or "orange juice made using yellow 3 dye".`
    .note`toki pona is a great first second language, in that it's a great gateway drug into learning other languages. I originally learned toki pona because I thought it would be easy, and that experience opened me up to learning two and two halves more languges since!`
    .note`toki pona also has its own writing system which uses easily-recognizable pictographs for its words, such that one icon represents one word. The picture on the right here is an array of rotated and colored icons, although they are normally written left-to-right, top-to-bottom, perfectly straight, just like English.`
    .note`If you'd like to learn more about toki pona, come to toki pona club, hosted on Wednesdays in <room>!`(
    ul.li`2001`
      .li`Sonja Lang`
      .li`best language /unbiased //s`,
  ),
  slide`your conlangs`.center()
    .note`Have any audience members made conlangs? If so, feel free to share about them now!`(),
  defineNoPad(
    [
      defineTwoCol(
        [
          [
            defineIFrame(
              "https://www.youtube.com/embed/AcctlGjvLnY",
            ),
          ],
          [
            defineIFrame(
              "https://www.youtube.com/embed/Ql0VKM7tCCo",
            ),
          ],
          [
            defineIFrame(
              "https://www.youtube.com/embed/DDwf0dorgN8",
            ),
          ],
          [
            defineIFrame(
              "https://www.youtube.com/embed/hwQlRshsxyk",
            ),
          ],
        ],
      ),
    ],
    [
      note(
        fmt`This would be an incomplete presentation about conlangs without explaining the wonderful **Cursed Conlang Circus**. Hosted by **Agma Schwa**, also known as **/ŋə/**, each year for the past three years, the CCC is a contest where anybody who wants to may submit their own cursed constructed language. Languages are considered "cursed" when some aspect of the language is highly unnatural or unusual.`,
      ),
      note(
        fmt`So many wonderful limit-testing and why-not languages have been created for the CCC, including three shown on-screen here, and countless others. If you've seen a video on YouTube about a strange language, chances are it was made for the Cursed Conlang Circus.`,
      ),
    ],
  ),
  im.src`/uscript-p1.png`
    .alt`The opening page of the Uscript self-defining sheet.`.containWhite()
    .note`To finish off today's presentation, we'll talk about one final practical conlang. **Uscript**, short for "universal script", is a language which is meant to use mathematics and logic to be self-defining. In short, one can theoretically learn Uscript just by studying its source text, provided they have some background in mathematics, programming, and physics.`
    .note`Uscript could theoretically be used on something like the Voyager spacecraft, where the goal is to communicate with another species who may have vastly different knowledge than us. Since it does not depend on human constructs (mathematics and physics are the same everywhere in the universe), it is a great way to communicate with far-away worlds.`
    .note`A section of the first page of Uscript's source text is provided here. It is one of the easier parts of the Uscript source to understand, and does not require any background in programming, physics, or advanced mathematics.`
    .note`I leave it here as a challenge for anybody who wants to decipher it. And while there are no rules for Uscript, that is, you may discuss it with others, I'd encourage you not to give a friend all the answers, especially if they're trying to learn it themselves.`
    .note`Questions?`,
)

/* TODO:
 - na'vi
 - that one band
 - twin langs
 - viossa
 - conlang relay
 */
