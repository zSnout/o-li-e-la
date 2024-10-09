import { definePlugin } from "../define"

export const plugin = definePlugin("text", "", {
  render(data: string) {
    return data
  },
})
