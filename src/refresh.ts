import { VIEW } from "./lib/query"

if (import.meta.env.DEV) {
  if (VIEW == "latest") {
    setTimeout(() => location.reload(), 200)
  }
}
