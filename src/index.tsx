import "./refresh"

import { For, render, Show } from "solid-js/web"
import { PresenterNotes, RenderScalable } from "./el/Slide"
import "./index.css"
import { AsSvg } from "./lib2/AsSvg"
import { all } from "./lib2/ext"
import { DECK_TOK_00 } from "./lib2/slides/toki-pona/00-test"
import {
  Slideshow,
  startBackgroundProcess,
  ViewDocument,
  ViewEdit,
  ViewEntry,
  ViewLatest,
  ViewSpeaker,
} from "./lib2/slideshow"

import { slides } from "./lib/helpers"
import "./slides/02-dev/99-test"

const root = document.getElementById("root")

render(() => {
  const slideshow = new Slideshow()
  slideshow.exts.add(...all())
  startBackgroundProcess(slideshow.exts)

  slideshow.adopt(DECK_TOK_00)

  return (
    <div class="grid grid-cols-[auto,24rem,auto,24rem]">
      <For each={slideshow.slides}>
        {(slide, idx) => (
          <>
            <AsSvg exts={slideshow.exts} slide={slide} />
            <div class="flex h-full flex-col gap-4 bg-z-body px-3 py-4">
              {slideshow.exts.SlidePresenter(slide)}
            </div>
            <Show when={slides[idx()]}>
              <RenderScalable>{slides[idx()]!}</RenderScalable>
              <div class="flex h-full flex-col gap-4 bg-z-body px-3 py-4">
                <PresenterNotes>{slides[idx()]!}</PresenterNotes>
              </div>
            </Show>
          </>
        )}
      </For>
    </div>
  )

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
