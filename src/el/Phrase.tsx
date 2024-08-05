import type { Phrase } from "../lib/types"

export function Phrase(props: { phrase: Phrase; class?: string }) {
  return (
    <span class={props.class}>
      {props.phrase.map((item, index) => {
        const el = (
          <span>
            {item.prefix && [
              <span class={item.prefix.color}>{item.prefix.text}</span>,
              " ",
            ]}
            <span class={item.color}>{item.text}</span>
            {item.postfix && [
              " ",
              <span class={item.postfix.color}>{item.postfix.text}</span>,
            ]}
          </span>
        )
        return index == 0 ? el : [" ", el]
      })}
    </span>
  )
}
