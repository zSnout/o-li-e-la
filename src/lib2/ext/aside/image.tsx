import { Show } from "solid-js"
import { clsx } from "../../clsx"
import { defineExt } from "../../define"
import type { Aside, Note, Slide } from "../../types"
import { note } from "../note/p"
import { defineSlideImage } from "../slide/image"
import { fmt, type FmtParams } from "../text/fmt"

export const ext = defineExt<
  [
    src: string,
    alt: string,
    fit: "contain" | "cover",
    aspect: "square" | "half" | "auto",
  ]
>()("aside", "image", {
  slide(data) {
    return (
      <>
        <Show when={data[2] != "cover" && data[3] != "auto"}>
          <div
            class={clsx(
              "absolute right-0 flex h-full overflow-clip",
              data[3] == "square" && "aspect-square",
              data[3] == "half" && "aspect-[8/9]",
            )}
          >
            <img
              src={data[0]}
              alt={data[1]}
              class="h-full w-full scale-110 object-cover opacity-50 blur"
            />
          </div>
        </Show>
        <img
          src={data[0]}
          alt={data[1]}
          class={clsx(
            "relative h-full",
            data[3] == "square" && "aspect-square",
            data[3] == "half" && "aspect-[8/9]",
            data[2] != "cover" ? "object-contain" : "object-cover",
          )}
        />
      </>
    )
  },
  presenter() {
    return undefined
  },
  entry(data, _, filter) {
    return (
      <Show when={filter.media.images}>
        <div class="relative overflow-hidden rounded">
          <div class="aspect-video w-full" />
          <img
            src={data[0]}
            alt={data[1]}
            class="absolute left-0 top-0 h-full w-full scale-110 object-cover opacity-50 blur"
          />
          <img
            src={data[0]}
            alt={data[1]}
            class="absolute left-0 top-0 h-full w-full object-contain"
          />
        </div>
      </Show>
    )
  },
})

export function image(
  src: string,
  alt: string,
  fit: "contain" | "cover" = "contain",
  aspect: "square" | "half" | "auto" = "half",
): Aside {
  return ["image", [src, alt, fit, aspect]]
}

export interface QSlideImage {
  note(...note: FmtParams): QSlideImage
  done(): Slide
}

export interface QSlideImageFit extends QSlideImage {
  cover(): QSlideImage
  containWhite(): QSlideImage
}

export function builderImage(src: string) {
  return {
    alt([alt]: readonly string[]): QSlideImageFit {
      let fit: "contain-white" | "cover" | undefined
      const notes: Note[] = []

      const result: QSlideImageFit = {
        done() {
          return defineSlideImage(src, alt ?? "", fit, notes)
        },
        note(...n) {
          notes.push(note(fmt(...n)))
          return result
        },
        containWhite() {
          fit = "contain-white"
          return result
        },
        cover() {
          fit = "cover"
          return result
        },
      }

      return result
    },
  }
}
