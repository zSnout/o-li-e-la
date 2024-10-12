import "./refresh"

import { render } from "solid-js/web"
import "./index.css"
import { all } from "./lib2/ext"
import { DECK_CONLANGS } from "./lib2/slides/conlangs"
import {
  Slideshow,
  startBackgroundProcess,
  ViewSpeaker,
} from "./lib2/slideshow"

const root = document.getElementById("root")

render(() => {
  const slideshow = new Slideshow()
  slideshow.exts.add(...all())
  startBackgroundProcess(slideshow.exts)

  slideshow.adopt(DECK_CONLANGS)

  return (
    <ViewSpeaker slideshow={slideshow} index={slideshow.slides.length - 1} />
  )
}, root!)
