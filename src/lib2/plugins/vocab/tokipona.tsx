import { definePlugin } from "../../define"
import type { Text, Vocab } from "../../types"

export const plugin = definePlugin<{
  word: string
  defnShort: Text
  defnLipamanka?: Text
  kind: { name: string }
}>()("vocab", "tokipona", {
  render(data, slideshow) {
    return (
      <li class="flex w-full flex-col font-sans">
        <strong class="font-semibold text-z-heading">{data.word}</strong>
        <p class="text-balance pl-6 text-z">{slideshow.Text(data.defnShort)}</p>
      </li>
    )
  },
  withoutDefinition(data) {
    return (
      <li class="flex w-full flex-col font-sans font-semibold text-z-heading">
        {data.word}
      </li>
    )
  },
  presenter(data, slideshow) {
    return (
      <details>
        <summary class="font-sans marker:text-z-dimmed">
          <span class="font-sp-sans text-z-heading">{data.word}</span>{" "}
          <span class="font-semibold text-z-heading">{data.word}</span>{" "}
          <span class="text-z-subtitle">({data.kind.name})</span>
        </summary>

        <p class="pl-8 pt-1 font-ex-eng text-z">
          {slideshow.Text(data.defnLipamanka ?? data.defnShort)}
        </p>
      </details>
    )
  },
})

export function tokipona(data: {
  word: string
  defnShort: Text
  defnLipamanka?: Text
  kind: { name: string }
}): Vocab {
  return ["tokipona", data]
}
