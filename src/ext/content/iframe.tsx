import { Show } from "solid-js"
import { AsSvgGeneric } from "../../lib/AsSvg"
import { defineExt, unimpl } from "../../lib/define"
import type { Content } from "../../lib/types"

export const ext = defineExt<string>()("content", "iframe", {
  slide(data) {
    return (
      <AsSvgGeneric>
        <iframe
          class="origin-top-left scale-[200%]"
          width={480}
          height={270}
          src={data}
          // @ts-ignore
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerpolicy="strict-origin-when-cross-origin"
          allowfullscreen
        />
      </AsSvgGeneric>
    )
  },
  entry(data, _, filter) {
    return (
      <Show when={filter.media.embeds}>
        <AsSvgGeneric class="rounded">
          <iframe
            class="origin-top-left scale-[200%]"
            width={480}
            height={270}
            src={data}
            // @ts-ignore
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen
          />
        </AsSvgGeneric>
      </Show>
    )
  },
  presenter(): undefined {},
  print: unimpl,
})

export function defineIFrame(src: string): Content {
  return ["iframe", src]
}
