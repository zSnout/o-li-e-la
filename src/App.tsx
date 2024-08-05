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

import { ExampleFromTokEl, Title } from "./el/Section"
import { SlideWithVocab } from "./el/Slide"
import { Vocab } from "./el/Vocab"
import { eng, tok } from "./lib/colors"
import { text } from "./lib/text"
import { pana, pilin } from "./lib/vocab"

function App() {
  return (
    <SlideWithVocab vocab={[<Vocab word={pilin} />, <Vocab word={pana} />]}>
      <Title>{text`the particle pi`}</Title>
      <ExampleFromTokEl>
        {{
          type: "ex:tok",
          tok: tok`mu! tenpo ni la mi wile pana e sona suli anu e toki tawa sina ale.`,
          eng: [
            eng`hi! Right now, la I li want to give e important information tawa to you all.`,
          ],
        }}
      </ExampleFromTokEl>
    </SlideWithVocab>
  )
}

export default App
