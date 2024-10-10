import "./refresh"

import { render } from "solid-js/web"
import "./index.css"
import { pilin } from "./lib/vocab"
import { plugin as a } from "./lib2/plugins/aside/image"
import { plugin as b, vocab } from "./lib2/plugins/aside/vocab"
import { plugin as c } from "./lib2/plugins/aside/vocabWithoutDefinition"
import { plugin as d, p } from "./lib2/plugins/content/p"
import { plugin as e, title } from "./lib2/plugins/content/title"
import { plugin as f } from "./lib2/plugins/content/titleIndexed"
import { plugin as g } from "./lib2/plugins/note/p"
import { plugin as h, standard } from "./lib2/plugins/slide/standard"
import { arr, plugin as i } from "./lib2/plugins/text/arr"
import { plugin as j } from "./lib2/plugins/text/fmt"
import { plugin as k, str } from "./lib2/plugins/text/str"
import { plugin as l } from "./lib2/plugins/text/styled"
import { plugin as m, tokipona } from "./lib2/plugins/vocab/tokipona"
import { Slideshow } from "./lib2/slideshow"

const root = document.getElementById("root")

render(() => {
  const s = new Slideshow().add(a, b, c, d, e, f, g, h, i, j, l, k, m)
  const slide = standard(
    [title(str("goodbye world")), p(arr(str("hello "), str("world")))],
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
  console.log(slide)
  return (
    <div class="flex gap-4">
      {s.Slide(slide)}
      <div class="w-96 bg-z-body">{s.SlidePresenter(slide)}</div>
    </div>
  )
}, root!)
