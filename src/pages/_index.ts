import { start, type View } from ".."
import { DECK_TOK_01 } from "../slides/toki-pona/01-welcome"
import { DECK_TOK_02 } from "../slides/toki-pona/02-li"
import { DECK_TOK_03 } from "../slides/toki-pona/03-objects"
import { DECK_TOK_04 } from "../slides/toki-pona/04-modifiers"
import { DECK_TOK_05 } from "../slides/toki-pona/05-la"

export function Main({ view }: { view: View }) {
  return start(view, (slideshow) => {
    slideshow.adopt(DECK_TOK_01)
    slideshow.adopt(DECK_TOK_02)
    slideshow.adopt(DECK_TOK_03)
    slideshow.adopt(DECK_TOK_04)
    slideshow.adopt(DECK_TOK_05)
  })
}
