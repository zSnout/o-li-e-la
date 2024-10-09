import { VIEW } from "./lib/query"

if (import.meta.env.DEV && VIEW == "latest") {
  setTimeout(() => location.reload(), 200)
}
