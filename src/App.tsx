import { ExampleTok } from "./el/Example"
import { eng, tok } from "./lib/colors"

function App() {
  return (
    <ExampleTok
      example={{
        type: "ex:tok",
        tok: tok`mi wile toki tawa sina lon tenpo ale`,
        inter: [],
        eng: [eng`I li want to talk tawa to you lon (at) all the time`],
      }}
    />
  )
}

export default App
