import { start, type View } from "../../.."
import { DECK_CONLANGS } from "../../../slides/misc/conlangs"

export function Main({ view }: { view: View }) {
  return start(view, (slideshow) => {
    slideshow.adopt(DECK_CONLANGS)
  })
}
