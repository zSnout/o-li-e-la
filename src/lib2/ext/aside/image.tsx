import { Show } from "solid-js"
import { clsx } from "../../clsx"
import { defineExt } from "../../define"
import type { Aside } from "../../types"

export const ext = defineExt<{
  src: string
  alt: string
  fit?: "contain" | "cover"
  aspect?: "square" | "half" | "auto"
}>()("aside", "image", {
  slide(data) {
    return (
      <>
        <Show when={data.fit != "cover" && data.aspect != "auto"}>
          <div
            class={clsx(
              "absolute right-0 flex h-full overflow-clip",
              data.aspect == "square" && "aspect-square",
              data.aspect == "half" && "aspect-[8/9]",
            )}
          >
            <img
              src={data.src}
              alt={data.alt}
              class="h-full w-full scale-110 object-cover opacity-50 blur"
            />
          </div>
        </Show>
        <img
          src={data.src}
          alt={data.alt}
          class={clsx(
            "relative h-full",
            data.aspect == "square" && "aspect-square",
            data.aspect == "half" && "aspect-[8/9]",
            data.fit != "cover" ? "object-contain" : "object-cover",
          )}
        />
      </>
    )
  },
  presenter() {
    return undefined
  },
  entry(data) {
    return <img src={data.src} alt={data.alt} class="object-contain" />
  },
})

export function image(
  src: string,
  alt: string,
  fit?: "contain" | "cover",
  aspect?: "square" | "half" | "auto",
): Aside {
  return ["image", { src, alt, fit, aspect }]
}
