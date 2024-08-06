import type { Content } from "../../types"

export interface ToContent<T extends Content> {
  finalize(): T
}

export { la } from "./la"
export { many } from "./many"
export { qa } from "./qa"
export { tok } from "./tok"
