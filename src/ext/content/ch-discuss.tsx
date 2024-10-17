import { For, Show } from "solid-js"
import { Ch } from "../../lib/Ch"
import { defineExt, unimpl } from "../../lib/define"
import { VocabVis, type Content, type Note, type Text } from "../../lib/types"

export const ext = defineExt<
  [label: Text, prompts: [prompt: Text, notes: readonly Note[]][]]
>()("content", "ch/discuss", {
  vocab(data, exts, proxy) {
    exts.TextVocab(data[0], proxy, VocabVis.CH_EXPL)
    for (const [prompt, notes] of data[1]) {
      exts.TextVocab(prompt, proxy, VocabVis.CH_LABEL)
      for (const note of notes) {
        exts.NoteVocab(note, proxy)
      }
    }
  },
  slide(data, exts) {
    return (
      <div class="my-4 flex w-full flex-col border-l border-z-ch px-4 font-ex-eng">
        <p class="text-base text-z-subtitle">{exts.Text(data[0])}</p>
        <For each={data[1]}>
          {(challenge) => <p>{exts.Text(challenge[0])}</p>}
        </For>
      </div>
    )
  },
  entry(data, exts, filter) {
    return (
      <>
        {exts.TextEntry(data[0], filter)}
        <For each={data[1]}>
          {([prompt, notes]) => (
            <>
              <Show when={filter.ch.discuss}>
                <Ch>
                  <p class="font-sans">{exts.Text(prompt)}</p>
                </Ch>
              </Show>
              <For each={notes}>{(note) => exts.NoteEntry(note, filter)}</For>
            </>
          )}
        </For>
      </>
    )
  },
  presenter(data, exts) {
    return (
      <For each={data[1]}>
        {([prompt, notes]) => (
          <Show when={notes.length}>
            <div class="text-z">
              <p class="font-sans font-semibold">{exts.Text(prompt)}</p>
              <For each={notes}>{(note) => exts.NotePresenter(note)}</For>
            </div>
          </Show>
        )}
      </For>
    )
  },
  print: unimpl,
})

export function discuss(
  label: Text,
  prompts: [prompt: Text, notes: readonly Note[]][],
): Content {
  return [
    "ch/discuss",
    [label, prompts.map(([prompt, notes]) => [prompt, notes ?? []])],
  ]
}
