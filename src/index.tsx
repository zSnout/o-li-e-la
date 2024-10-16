import { all } from "./ext"
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

export const ALL_VIEWS = [
  undefined,
  "doc",
  "latest",
  "entry",
  "edit",
  "print",
  "present",
] as const

export type View = (typeof ALL_VIEWS)[number]

export function start(view: View, prepare: (slideshow: Slideshow) => void) {
  const slideshow = new Slideshow()
  slideshow.exts.add(...all())
  startBackgroundProcess(slideshow.exts)
  prepare(slideshow)

  switch (view) {
    case undefined:
    case "doc":
      return <ViewDocument slideshow={slideshow} />
    case "latest":
      return <ViewLatest slideshow={slideshow} />
    case "entry":
      if (typeof document == "object") {
        document.documentElement.classList.remove("bg-z-body-selected")
        document.documentElement.classList.add("bg-z-body")
      }
      return <ViewEntry slideshow={slideshow} />
    case "edit":
      return <ViewEdit slideshow={slideshow} />
    case "print":
      return <ViewPrint slideshow={slideshow} />
    case "present":
      return (
        <ViewSpeaker
          slideshow={slideshow}
          index={import.meta.env.DEV ? slideshow.slides.length - 1 : 0}
        />
      )
  }
}
