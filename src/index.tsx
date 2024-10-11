import "./refresh"

import { render } from "solid-js/web"
import "./index.css"
import { pilin } from "./lib/vocab"

import { all, aside, content, slide, text, vocab } from "./lib2/ext"
import { Exts } from "./lib2/exts"

const root = document.getElementById("root")

render(() => {
  const s = new Exts().add(...all())
  const slide1 = slide.standard(
    [
      content.title(text.str("goodbye world")),
      content.p(text.arr([text.str("hello "), text.str("world")])),
      content.ul([
        text.str("wow"),
        text.styled.styledTok(
          "@ mu, ijo wawa oo! tenpo ni la mi wile pana e sona suli tawa sina ale. o \
weka ala e tomo mi. seme la sina wile ni? ni li ike wawa a! ijo ale en jaki ale \
oo, o ni ala a! o weka ala e tomo ante ale a! ante la sina wile e kili ^e anu pan?",
        ),
        text.styled.styledEng(
          "@ Hi, cool being! Right now, la I li want to give e important information tawa to you all. o Don't make e my house o disappear. Why la li would @en you li want to do this? That li 's terrible! All beings en and all disgusting things, o don't do this! o Don't remove e any other buildings! Also, la do you li want e fruit ^e or bread?",
        ),
      ]),
    ],
    aside.vocab(
      vocab.tokipona({
        ...pilin,
        defnLipamanka: undefined,
        defnShort: text.str("hello world"),
      }),
      vocab.tokipona({
        ...pilin,
        defnLipamanka: undefined,
        defnShort: text.str("hello world"),
      }),
      vocab.tokipona({
        ...pilin,
        defnLipamanka: undefined,
        defnShort: text.str("hello world"),
      }),
    ),
  )
  const slide2 = slide.image("/jonathan-gabel-waso-walo.jpg", "")
  return (
    <div class="flex flex-col gap-4">
      {s.Slide(slide1)}
      {s.Slide(slide2)}
    </div>
  )
}, root!)
