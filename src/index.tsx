import "./refresh"

import { render } from "solid-js/web"
import { all } from "./ext"
import "./index.css"
import {
  Slideshow,
  startBackgroundProcess,
  ViewDocument,
  ViewEdit,
  ViewEntry,
  ViewLatest,
  ViewPrint,
  ViewSpeaker,
} from "./lib/slideshow"
import { DECK_TOK_01 } from "./slides/toki-pona/01-welcome"
import { DECK_TOK_02 } from "./slides/toki-pona/02-li"
import { DECK_TOK_03 } from "./slides/toki-pona/03-objects"
import { DECK_TOK_04 } from "./slides/toki-pona/04-modifiers"
import { DECK_TOK_05 } from "./slides/toki-pona/05-la"

const root = document.getElementById("root")

const VIEW = new URL(location.href).searchParams.get("view")

render(() => {
  const slideshow = new Slideshow()
  slideshow.exts.add(...all())
  startBackgroundProcess(slideshow.exts)

  slideshow.adopt(DECK_TOK_01)
  slideshow.adopt(DECK_TOK_02)
  slideshow.adopt(DECK_TOK_03)
  slideshow.adopt(DECK_TOK_04)
  slideshow.adopt(DECK_TOK_05)

  if (VIEW == "doc") {
    return <ViewDocument slideshow={slideshow} />
  } else if (VIEW == "latest") {
    return <ViewLatest slideshow={slideshow} />
  } else if (VIEW == "entry") {
    document.documentElement.classList.remove("bg-z-body-selected")
    document.documentElement.classList.add("bg-z-body")
    return <ViewEntry slideshow={slideshow} />
  } else if (VIEW == "edit") {
    return <ViewEdit slideshow={slideshow} />
  } else if (VIEW == "print") {
    return <ViewPrint slideshow={slideshow} />
  } else {
    return (
      <ViewSpeaker
        slideshow={slideshow}
        index={import.meta.env.DEV ? slideshow.slides.length - 1 : 0}
      />
    )
  }
}, root!)
