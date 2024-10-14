import "./refresh"

import { render } from "solid-js/web"
import "./index.css"
import { all } from "./lib2/ext"
import { DECK_CONLANGS } from "./lib2/slides/misc/conlangs"
import {
  Slideshow,
  startBackgroundProcess,
  ViewDocument,
  ViewEdit,
  ViewEntry,
  ViewLatest,
  ViewSpeaker,
} from "./lib2/slideshow"

const root = document.getElementById("root")

render(() => {
  const slideshow = new Slideshow()
  slideshow.exts.add(...all())
  startBackgroundProcess(slideshow.exts)

  slideshow.adopt(DECK_CONLANGS)

  if (new URL(location.href).searchParams.get("view") == "doc") {
    return <ViewDocument slideshow={slideshow} />
  } else if (new URL(location.href).searchParams.get("view") == "latest") {
    return <ViewLatest slideshow={slideshow} />
  } else if (new URL(location.href).searchParams.get("view") == "entry") {
    document.documentElement.classList.remove("bg-z-body-selected")
    document.documentElement.classList.add("bg-z-body")
    return <ViewEntry slideshow={slideshow} />
  } else if (new URL(location.href).searchParams.get("view") == "edit") {
    return <ViewEdit slideshow={slideshow} />
  } else {
    return (
      <ViewSpeaker
        slideshow={slideshow}
        index={import.meta.env.DEV ? slideshow.slides.length - 1 : 0}
      />
    )
  }
}, root!)
