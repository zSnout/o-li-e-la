import { title } from "../ext/content/title"
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
  slide`why make conlangs?`
    .center()
    .note`Why do people make conlangs? There are many reasons, but they largely fall into five categories: to unite the world under a common language, to make a work of media more complete, to provide a medium for artwork, to test the limits of language, and simply because there's no reason not to.`
    .note`We'll look at one example of each.`(
    ul.li`to unite the world`
      .li`for a movie, tv show, or book`
      .li`as artistic expression`
      .li`to test language`
      .li`because why not`,
  ),

  slide`esperanto: to unite the world`
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
      .li`L.L. Zamenhof`
      .li`most-spoken conlang`,
  ),
)
