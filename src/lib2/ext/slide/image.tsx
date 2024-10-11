import { Show } from "solid-js"
import { defineExt } from "../../define"
import type { Slide } from "../../types"

export const ext = defineExt<{
  src: string
  alt: string
  fit?: "contain" | "cover"
}>()("slide", "image", {
  render(data) {
    return (
      <article class="size-slide relative flex bg-white text-2xl text-z contain-strict">
        <Show
          when={data.fit != "cover"}
          fallback={
            <img
              src={data.src}
              alt={data.alt}
              class="absolute left-0 top-0 h-full w-full object-cover"
            />
          }
        >
          <img
            src={data.src}
            alt={data.alt}
            class="absolute left-0 top-0 h-full w-full scale-110 object-cover opacity-50 blur"
          />
          <img
            src={data.src}
            alt={data.alt}
            class="absolute left-0 top-0 h-full w-full object-contain"
          />
        </Show>
      </article>
    )
  },
  entry(): undefined {},
  presenter(): undefined {},
})

export function image(
  src: string,
  alt: string,
  fit?: "contain" | "cover",
): Slide {
  return ["image", { src, alt, fit }]
}
