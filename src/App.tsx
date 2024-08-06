import { For } from "solid-js"
import { PresenterNotes, Render } from "./el/Slide"
import {
  SLIDE_LA_FOR_MARKING_TIME,
  SLIDE_MODIFIER_STACKING,
  SLIDE_PREPOSITIONS_AS_PREDICATES,
  SLIDE_RESPONDING_TO_X_ALA_X,
  SLIDE_TEST_SYNTAX_HIGHLIGHTING,
  SLIDE_THE_PARTICLE_LA,
  SLIDE_THE_PARTICLE_PI,
  SLIDE_THE_PARTICLE_SEME,
} from "./slides/test"

const PRESENTATION = [
  SLIDE_TEST_SYNTAX_HIGHLIGHTING,
  SLIDE_PREPOSITIONS_AS_PREDICATES,
  SLIDE_LA_FOR_MARKING_TIME,
  SLIDE_THE_PARTICLE_LA,
  SLIDE_MODIFIER_STACKING,
  SLIDE_THE_PARTICLE_SEME,
  SLIDE_RESPONDING_TO_X_ALA_X,
  SLIDE_THE_PARTICLE_PI,
]

export function ViewAllSlides() {
  return (
    <div class="flex flex-col items-center gap-4 p-8">
      <For each={PRESENTATION}>
        {(slide) => (
          <div class="flex gap-4">
            <Render>{slide}</Render>
            <PresenterNotes class="hx-slide wx-96 bg-white px-4 py-6">
              {slide}
            </PresenterNotes>
          </div>
        )}
      </For>
    </div>
  )
}

export default ViewAllSlides
