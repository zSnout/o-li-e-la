import type { Content } from "../../types"
import { la } from "./la"

export interface ToContent<T extends Content> {
  finalize(): T
}

export { la } from "./la"
export { tok } from "./tok"

la`tenpo ni la mi wile lon sina`
  .eng`At this time la I li want to lon be_with you.`
