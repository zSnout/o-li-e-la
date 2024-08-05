// <div class="m-auto flex aspect-video max-h-screen max-w-[100vw] flex-1 flex-col bg-white">
//   <ExampleTok
//     example={{
//       type: "ex:tok",
//       tok: tok`mi wile toki tawa sina lon tenpo ale`,
//       inter: [],
//       eng: [eng`I li want to talk tawa to you lon (at) all the time`],
//     }}
//   />
// </div>

import { SlideWithVocab } from "./el/Slide"
import { Vocab } from "./el/Vocab"
import { pana, pilin } from "./lib/vocab"

function App() {
  return (
    <SlideWithVocab
      vocab={
        <>
          <Vocab word={pilin} />
          <Vocab word={pana} />
        </>
      }
    />
  )
}

export default App
