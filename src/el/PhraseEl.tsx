import type { Color, Phrase, PhraseLang } from "../lib/types"

const DEV_SHOW_COLORS = true

export function PhraseEl(props: {
  children: Phrase<PhraseLang>
  plain?: boolean
}) {
  function cls(text: Color<600 | 800>) {
    if (DEV_SHOW_COLORS && import.meta.env.DEV) {
      return text
    }

    if (props.plain) {
      return undefined
    }

    return text
  }

  return props.children.content
    .map((item, index) => (
      <span
        class={
          DEV_SHOW_COLORS && import.meta.env.DEV && props.plain ?
            "bg-slate-200"
          : undefined
        }
      >
        {!(
          index == 0 ||
          item.punctuation ||
          (item.prefix?.text ?? item.text).startsWith("'")
        ) && " "}
        {item.prefix && [
          <span class={cls(item.prefix.color)}>{item.prefix.text}</span>,
          item.text && " ",
        ]}
        <span class={item.color ? cls(item.color) : undefined}>
          {item.text}
        </span>
        {item.postfix && [
          item.text && " ",
          <span class={cls(item.postfix.color)}>{item.postfix.text}</span>,
        ]}
      </span>
    ))
    .flat()
}
