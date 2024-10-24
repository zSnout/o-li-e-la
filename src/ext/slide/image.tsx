import { For, Show } from "solid-js"
import { clsx } from "../../lib/clsx"
import { defineExt } from "../../lib/define"
import type { Note, Slide } from "../../lib/types"

export const ext = defineExt<
  [
    src: string,
    alt: string,
    fit: "contain" | "cover" | "contain-white",
    notes: readonly Note[],
  ]
>()("slide", "image", {
  vocab(data, exts, proxy) {
    for (const note of data[3]) {
      exts.NoteVocab(note, proxy)
    }
  },
  render(data) {
    return (
      <article class="size-slide relative flex bg-z-body text-2xl text-z contain-strict">
        <Show when={data[2] == "contain"}>
          <img
            src={data[0]}
            alt={data[1]}
            class="absolute left-0 top-0 h-full w-full scale-110 object-cover opacity-50 blur"
          />
        </Show>
        <img
          src={data[0]}
          alt={data[1]}
          class={clsx(
            "absolute left-0 top-0 h-full w-full",
            {
              contain: "object-contain",
              cover: "object-cover",
              "contain-white": "object-contain",
            }[data[2]],
          )}
        />
      </article>
    )
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
  presenter(data, exts) {
    return <For each={data[3]}>{(x) => exts.NotePresenter(x)}</For>
  },
})

export function defineSlideImage(
  src: string,
  alt: string,
  fit: "contain" | "cover" | "contain-white" = "contain",
  notes: readonly Note[],
): Slide {
  return ["image", [src, alt, fit, notes]]
}
