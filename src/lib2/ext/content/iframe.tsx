import { AsSvgGeneric } from "../../AsSvg"
import { defineExt, unimpl } from "../../define"
import type { Content } from "../../types"

export const ext = defineExt<string>()("content", "iframe", {
  entry: unimpl,
  presenter(): undefined {},
  print: unimpl,
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
})

export function defineIFrame(src: string): Content {
  return ["iframe", src]
}
