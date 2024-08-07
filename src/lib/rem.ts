import { createSignal, onCleanup, onMount } from "solid-js"

export function createRemSize() {
  if (typeof document == "undefined") {
    return () => 16
  }

  const [size, setSize] = createSignal(
    parseFloat(getComputedStyle(document.documentElement).fontSize),
  )

  const observer = new MutationObserver(([mutation]) => {
    if (
      mutation!.type === "attributes" &&
      mutation!.attributeName === "style"
    ) {
      setSize(parseFloat(getComputedStyle(document.documentElement).fontSize))
    }
  })

  onMount(() =>
    observer.observe(document.documentElement, { attributeFilter: ["style"] }),
  )
  onCleanup(() => observer.disconnect())

  return () => {
    const s = size()
    if (isNaN(s)) return 16
    return s
  }
}
