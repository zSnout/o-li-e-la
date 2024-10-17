import { start, type View } from "@"
import { decks } from "@/index"
import { unwrap } from "solid-js/store"
import { str } from "src/ext/text/str"
import type { Group } from "src/lib/slideshow"

export function Main(props: {
  slug: keyof typeof decks
  view: View
  groups: readonly Group[]
}) {
  const groups = unwrap(props.groups)
  return start(
    props.slug,
    props.view,
    str(decks[props.slug].title),
    (slideshow) => {
      for (const group of groups) {
        slideshow.adopt(group)
      }
    },
  )
}
