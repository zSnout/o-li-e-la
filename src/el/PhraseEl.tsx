import type { Phrase } from "../lib/types"

export function PhraseEl(props: { children: Phrase; class?: string }) {
  return props.children
    .map((item, index) => {
      const el = (
        <span>
          {item.prefix && [
            <span class={item.prefix.color}>{item.prefix.text}</span>,
            " ",
          ]}
          <span class={item.color ?? undefined}>{item.text}</span>
          {item.postfix && [
            " ",
            <span class={item.postfix.color}>{item.postfix.text}</span>,
          ]}
        </span>
      )
      return (
          index == 0 ||
            item.punctuation ||
            (!item.prefix && item.text.startsWith("'"))
        ) ?
          el
        : [" ", el]
    })
    .flat()
}
