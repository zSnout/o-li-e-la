import {
  ch,
  ex,
  slideshow,
  ul,
} from "../../lib/helpers"

const [
  slide,
] =
  slideshow.meta(
    98,
  )`info for presenters`

slide.suli`thanks for choosing ~"o li e la"`(
  ul`lots of software exists`
    .li`lots of toki pona teaching content exists`
    .li`thanks for picking us :)`,
)

slide`if you are teaching toki pona (1/2)`(
  ul`click any slide in the main view to open __**presenter mode**__`
    .li`presenter mode shows speaker notes and other tools`
    .li`you'll also see possible answers to challenges`,
  ul`if you have a second display, press ~"Popup" to open a __**viewer mode**__ window`
    .li`viewer mode shows the slide in fullscreen`
    .li`it's also linked to your presenter mode window`
    .li`drag the tab onto your second screen to start`,
  ul`reload or press ~"Home" to see the full deck (NOT your browser's back button!!!)`,
)

slide`if you are teaching toki pona (2/2)`(
  ul`examples are always colored, like so:`,
  ex.tok`suwi o, @@ mu a!`
    .eng`hey you o, @@ hi!`,
  ul`challenges are grayscale and have a thin grey line on their left sides, like so:`,
  ch.discuss`how do you like this software so far?`,
  ul`to make review sheets, go back to the /?view=home URL you got from sakawi, then select the very wide button labeled ~"Review sheets". print them on at least 8.5x11in paper with **double-sided mode enabled, margins set to none, and background graphics enabled**.`,
)

slide`if you are contributing to the slide deck (tysm :3)`(
  ul`send examples and challenges to @zsakowitz on discord`,
  ul`the software accepts these types of content (shown on the next three slides):`,
  ul`regular translations`
    .li`translations using la-boxes`
    .li`translations using Q/A-style alignment`
    .li`multiple lines of related translations`,
  ul`translation challenges (tok to eng or eng to tok)`
    .li`translation challenges using la-boxes`
    .li`comparison challenges`
    .li`discussion prompts`,
)

slide`content types (text, list, plain example, and la-box)`(
  ul`here's a paragraph of text. it can be **bolded** or _italicized_ or __underlined__ or ~~struck through~~ or __***a combination of those***__. it can have ~"plain quotes" or colored $"english li sentences" or "pb toki kule pp toki pona". coloring is mostly automatic; you don't get to pick the colors you want.`,
  ul`here's a bulleted list`
    .li`there are no sublists or numbered lists`,
  ex.tok`ni li toki Inli e toki pona lon kule`
    .eng`this li makes into English e toki pona text lon using colors`,
  ex.la`tenpo ni la poki pi nimi La li kule`
    .eng`now la contextualizing boxes li are colored`
    .full`now, la contextualizing boxes li are colored`,
)

slide`example types (aligned examples and aligned Q/As)`(
  ex.align`~toki pona #1`
    .eng`~first english row`
    .tok`~toki pona #2`
    .eng`~second english row`
    .tok`~toki pona #3`
    .eng`~third english row`,
  ex.qa`sina musi ala musi?`
    .eng`@~ are @en you li playing?`
    .tok`ala`
    .eng`no`,
  ex.qa`sina musi ala musi?`
    .eng`@~ are @en you li playing?`
    .tok`musi ala`
    .eng`no`
    .alt`musi`
    .eng`yes`
    .alt`mi moli`
    .eng`I li 'm dead`,
)

slide`challenges (normal, la-box, discuss, comparison)`(
  ch.tok`mi toki e seme`
    .into`e what @~ am @en I li saying?`,
  ch.eng`this li is a car`
    .into`ni li soweli $tawa`,
  ch.la`tenpo weka la mi seme?`
    .eng`far time la li who was @en I?`
    .full`a while ago, la li who was @en I?`,
  ch.discuss`what is the meaning of life?`,
  ch.diff`toki ni li nanpa wan`
    .against`toki ni li nanpa tu`
    .explain`there are different numbers for each piece of text.`,
)

slide.suli`that's it!`(
  ul`sorry for the text walls earlier :>`,
)
