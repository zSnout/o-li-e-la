import { createStore } from "solid-js/store"
import { createEventListener } from "./event"

export function createScreenSize() {
  if (typeof window == "undefined") {
    return { width: 0, height: 0 }
  }

  const [size, setSize] = createStore({
    width: innerWidth,
    height: innerHeight,
  })

  window.addEventListener("resize", () => {
    setSize("width", innerWidth)
  })

  createEventListener(window, "resize", () => {
    setSize("width", innerWidth)
    setSize("height", innerHeight)
  })

  return size
}
