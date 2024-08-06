import type { Color, Phrase, PhraseLang } from "../lib/types"

const DEV_SHOW_COLORS = true
const force = DEV_SHOW_COLORS && import.meta.env.DEV

export function PhraseEl(props: {
  children: Phrase<PhraseLang>
  style?: "plain" | "force" | undefined
}) {
  const forced = () => props.style == "force" || force

  function cls(text: Color<600 | 800>) {
    if (forced()) {
      return text
    }

    if (props.style == "plain") {
      return undefined
    }

    return text
  }

  return (
    forced() ?
      (props.children.actual ?? props.children.content)
    : props.children.content)
    .map((item, index) => (
      <span
        class={
          (
            force &&
            (props.style == "plain" ||
              (props.style != "force" && props.children.actual))
          ) ?
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
