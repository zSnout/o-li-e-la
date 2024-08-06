import type { Color, Phrase } from "../lib/types"

export function PhraseEl(props: {
  children: Phrase
  class?: string
  plain?: boolean
}) {
  function cls(text: Color<600 | 800>) {
    if (import.meta.env.DEV) {
      return text
    }

    if (props.plain) {
      return undefined
    }

    return text
  }

  return props.children
    .map((item, index) => (
      <span
        class={import.meta.env.DEV && props.plain ? "bg-slate-200" : undefined}
      >
        {!(
          index == 0 ||
          item.punctuation ||
          (item.prefix?.text ?? item.text).startsWith("'")
        ) && " "}
        {item.prefix && [
          <span class={cls(item.prefix.color)}>{item.prefix.text}</span>,
          " ",
        ]}
        <span class={item.color ? cls(item.color) : undefined}>
          {item.text}
        </span>
        {item.postfix && [
          " ",
          <span class={cls(item.postfix.color)}>{item.postfix.text}</span>,
        ]}
      </span>
    ))
    .flat()
}
