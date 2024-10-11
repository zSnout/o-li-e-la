import "./refresh"

import { render } from "solid-js/web"
import { Render } from "./el/Slide"
import "./index.css"
import { pilin } from "./lib/vocab"
import { ext as a } from "./lib2/exts/aside/image"
import { ext as b, vocab } from "./lib2/exts/aside/vocab"
import { ext as c } from "./lib2/exts/aside/vocabWithoutDefinition"
import { ext as d, p } from "./lib2/exts/content/p"
import { ext as e, title } from "./lib2/exts/content/title"
import { ext as f } from "./lib2/exts/content/titleIndexed"
import { ext as n, ul } from "./lib2/exts/content/ul"
import { ext as g } from "./lib2/exts/note/p"
import { ext as h, standard } from "./lib2/exts/slide/standard"
import { arr, ext as i } from "./lib2/exts/text/arr"
import { ext as j } from "./lib2/exts/text/fmt"
import { ext as k, str } from "./lib2/exts/text/str"
import { ext as l, styledEng, styledTok } from "./lib2/exts/text/styled"
import { ext as m, tokipona } from "./lib2/exts/vocab/tokipona"
import { Slideshow } from "./lib2/slideshow"
import { SLIDE_TEST_SYNTAX_HIGHLIGHTING } from "./slides/02-dev/99-test"

const root = document.getElementById("root")

render(() => {
  const s = new Slideshow().add(a, b, c, d, e, f, g, h, i, j, l, k, m, n)
  const slide = standard(
    [
      title(str("goodbye world")),
      p(arr([str("hello "), str("world")])),
      ul([
        str("wow"),
        styledTok(
          "@ mu, ijo wawa oo! tenpo ni la mi wile pana e sona suli tawa sina ale. o \
weka ala e tomo mi. seme la sina wile ni? ni li ike wawa a! ijo ale en jaki ale \
oo, o ni ala a! o weka ala e tomo ante ale a! ante la sina wile e kili ^e anu pan?",
        ),
        styledEng(
          "@ Hi, cool being! Right now, la I li want to give e important information tawa to you all. o Don't make e my house o disappear. Why la li would @en you li want to do this? That li 's terrible! All beings en and all disgusting things, o don't do this! o Don't remove e any other buildings! Also, la do you li want e fruit ^e or bread?",
        ),
      ]),
    ],
    vocab(
      tokipona({
        ...pilin,
        defnLipamanka: undefined,
        defnShort: str("hello world"),
      }),
      tokipona({
        ...pilin,
        defnLipamanka: undefined,
        defnShort: str("hello world"),
      }),
      tokipona({
        ...pilin,
        defnLipamanka: undefined,
        defnShort: str("hello world"),
      }),
    ),
    // image("https://placecats.com/400/200", "", "contain", "half"),
  )

  return (
    <div class="flex flex-col gap-4">
      <Render>{SLIDE_TEST_SYNTAX_HIGHLIGHTING}</Render>
      {s.Slide(slide)}
      <div class="w-96 bg-z-body">{s.SlidePresenter(slide)}</div>
    </div>
  )
}, root!)
