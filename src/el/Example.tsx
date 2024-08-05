import { For } from "solid-js"
import type { ExampleFromTok } from "../lib/types"
import { Phrase } from "./Phrase"

export function ExampleTok(props: { example: ExampleFromTok; class?: string }) {
  return (
    <div class={"flex flex-col" + (props.class ? " " + props.class : "")}>
      <p class="font-ex-tok font-bold">
        <Phrase phrase={props.example.tok} />
      </p>

      <For each={props.example.inter}>
        {(x) => (
          <p class="font-ex-eng">
            <Phrase phrase={x} />
          </p>
        )}
      </For>

      <p class="font-ex-eng">
        <Phrase phrase={props.example.eng[0]} />
      </p>
    </div>
  )
}
