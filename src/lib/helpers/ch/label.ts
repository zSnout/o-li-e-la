import { eng, tok } from "../../colors"
import { text, type TextParams } from "../../text"
import { create } from "./tr"

export function label(...label: TextParams) {
  return {
    eng(strings: TemplateStringsArray) {
      return create(strings, eng, tok, text(...label))
    },
    tok(strings: TemplateStringsArray) {
      return create(strings, tok, eng, text(...label))
    },
  }
}
