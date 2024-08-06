import type { Color, Phrase } from "../lib/types"

export function PhraseEl(props: {
  children: Phrase
  class?: string
  plain?: boolean
}) {
  function cls(text: Color<600 | 800>) {
    if (import.meta.env.DEV) {
      if (!props.plain) {
        return text
      }

      return (
        {
          "text-black":
            "text-[color-mix(in_srgb,theme(colors.black),theme(colors.slate.50)_50%)]",

          "text-rose-600":
            "text-[color-mix(in_srgb,theme(colors.rose.600),theme(colors.slate.50)_50%)]",
          "text-orange-600":
            "text-[color-mix(in_srgb,theme(colors.orange.600),theme(colors.slate.50)_50%)]",
          "text-fuchsia-600":
            "text-[color-mix(in_srgb,theme(colors.fuchsia.600),theme(colors.slate.50)_50%)]",
          "text-green-600":
            "text-[color-mix(in_srgb,theme(colors.green.600),theme(colors.slate.50)_50%)]",
          "text-sky-600":
            "text-[color-mix(in_srgb,theme(colors.sky.600),theme(colors.slate.50)_50%)]",
          "text-violet-600":
            "text-[color-mix(in_srgb,theme(colors.violet.600),theme(colors.slate.50)_50%)]",
          "text-slate-600":
            "text-[color-mix(in_srgb,theme(colors.slate.600),theme(colors.slate.50)_50%)]",

          "text-rose-800":
            "text-[color-mix(in_srgb,theme(colors.rose.800),theme(colors.slate.50)_50%)]",
          "text-orange-800":
            "text-[color-mix(in_srgb,theme(colors.orange.800),theme(colors.slate.50)_50%)]",
          "text-fuchsia-800":
            "text-[color-mix(in_srgb,theme(colors.fuchsia.800),theme(colors.slate.50)_50%)]",
          "text-green-800":
            "text-[color-mix(in_srgb,theme(colors.green.800),theme(colors.slate.50)_50%)]",
          "text-sky-800":
            "text-[color-mix(in_srgb,theme(colors.sky.800),theme(colors.slate.50)_50%)]",
          "text-violet-800":
            "text-[color-mix(in_srgb,theme(colors.violet.800),theme(colors.slate.50)_50%)]",
          "text-slate-800":
            "text-[color-mix(in_srgb,theme(colors.slate.800),theme(colors.slate.50)_50%)]",
        }[text] + " bg-slate-200"
      )
    }

    if (props.plain) {
      return undefined
    }

    return text
  }

  return props.children
    .map((item, index) => {
      const el = (
        <span>
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
      )
      return (
          index == 0 ||
            item.punctuation ||
            (item.prefix?.text ?? item.text).startsWith("'")
        ) ?
          el
        : [" ", el]
    })
    .flat()
}
