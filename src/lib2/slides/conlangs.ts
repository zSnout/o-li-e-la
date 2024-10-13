import { pssll } from "../ext/aside/pssll"
import { defineIFrame } from "../ext/content/iframe"
import { title } from "../ext/content/title"
import { defineTwoCol } from "../ext/content/two-col"
import { defineSlideImage } from "../ext/slide/image"
import { defineNoPad } from "../ext/slide/no-pad"
import { fmt } from "../ext/text/fmt"
import {
  p,
  slide,
  ul,
} from "../helpers"
import { Group } from "../slideshow"

export const DECK_CONLANGS =
  new Group(
    fmt`conlangs`,
    fmt`00`,
  )

DECK_CONLANGS.slide(
  slide`conlangs`
    .center()
    .image(
      "/tshevu_community_icon.jpg",
      "A koi fish with five ripples on it and a sixth in front of it.",
      "cover",
    )
    .content(
      p`(constructed languages)`,
    ),
  slide`guiding questions`.center()
    .note`This presentation will revolve around answering two important questions: what are conlangs, and why do people make them?`.content(
    ul.li`what are conlangs?`
      .li`why make conlangs?`,
  ),
  slide``.center()
    .note`Languages can usually be divided into one of two classes.`
    .note`**Natural languages** are those like English, Chinese, Swahili, and Tok Pisin. These are formed when people speak normally and naturally evolve through the linguistic processes of change. Today, we have thousands of natural languages because groups of people split up and their languages diverged through continuous evolution.`
    .note`**Constructed languages** are those like toki pona, Esperanto, Dothraki, and Ithkuil. These exist because somebody decided to create their own language _with intention_. Many constructed languages are intended to be spoken by humans, but certainly not all. While constructed languages often don't have many native speakers, they are still real languages.`
    .note`These two are often called **natlangs** and **conlangs** respectively.`.content(
    title`natural languages`,
    title`constructed languages`,
  ),
  slide`a brief history`.center()
    .note`Many conlangs have been created over the years, with one very old one we we have direct evidence for being **Lingua Ignota**. Lingua Ignota was created in the 12th century by the nun Hildegard von Bingen as a way to connect more deeply with God. Its vocabulary drew primarily from Latin.`
    .note`Many other languages have been created since then, with a massive explosion in the 20th and 21st centuries. Many recent movies have hired professional conlangers, who have made **Klingon** for Star Trek, **Na'vi** for Avatar, and **Dothraki** for Game of Thrones, among others.`(
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
    .note`Dothraki has since become well-known in the conlang community, and even has a book created by DJP which teaches it. The book's cover is pictured here.`(
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
    .note`Tshevu /tsεβu/`(
    // TODO: notes
    ul.li`2020`
      .li`koallary`
      .li`known for its writing system`,
  ),
  slide`ithkuil: to test language`
    .center()
    .image(
      "/ocqvalaa-tali-sqio.svg",
      "The Ithkuil words “očvalá tali šio malëuţřaitie ogvbřalörxeu” written using Ithkuil calligraphic script.",
    )(
    // TODO: notes
    ul.li`2004, 2007, 2011, 2023`
      .li`John Quijada`
      .li`notable for grammatical capability`,
  ),
  slide`pin suo sie lep lan:
because why not`
    .center()
    .aside(
      pssll`mai lep pak eis ein fet den der nin tik asa han sei res aet nin per ues eis bon kon mai rai pak eis ein fet den der uai han len ari nou kau kas sei mai kon sti pas nou ser den sei bon aet uon uer sie sli aet tui bed ibe sie dan ein lab bat isi ibe aso sie uak uer han ser ein epi pak ibe sie pat sem ein ade kas lab kas aso nou kur aso aso han ein mai uon spi sat mai tri uer bra has tuo kai bao fru uer sei nin api kot sei nin pit nin sae rie bat sei nou lai sat kas tru eis mai kao uer mai nok aet iet ade aet nai sou mai uon nin ame sti`,
    )(
    // TODO: notes
    ul.li`2024`
      .li`sakawi`
      .li`not particularly notable`,
  ),
  slide`your conlangs`.center()(),
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
    [],
  ),
  defineSlideImage(
    "/uscript-p1.png",
    "The opening page of the Uscript self-defining sheet.",
    "contain-white",
    [],
    // TODO: notes
  ),
)
