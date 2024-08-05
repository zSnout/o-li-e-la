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
          tok: tok`mu, ijo wawa o! tenpo ni la mi wile pana e sona suli tawa sina ale. o weka ala e tomo mi. seme la sina wile ni? ni li ike wawa a! ijo ale en jaki ale o, o ni ala a! o weka ala e tomo ante ale a! ante la sina wile e kili anu e pan?`,
          eng: [
            eng`@@ Hi, cool being o! Right now, la I li want to give e important information tawa to you all. o Don't make e my house o disappear. Why la li would sbj you li want to do this? That li 's terrible! All beings en and all disgusting things, o don't do this! o Don't remove e any other buildings! Also, la do you li want e fruit anu e or bread?`,
          ],
        }}
      </ExampleFromTokEl>
    </SlideWithVocab>
  )
}

export default App
