import {
  ChallengeEngEl,
  ChallengeLaEl,
  ChallengeTokEl,
  ExampleLaEl,
  ExampleTokEl,
  InfoListUlEl,
  Title,
} from "./el/Content"
import { SlideWithoutVocab, SlideWithVocab } from "./el/Slide"
import { Vocab } from "./el/Vocab"
import { eng, tok } from "./lib/colors"
import { text } from "./lib/text"
import { pana, pilin } from "./lib/vocab"

export function SlideTestSyntaxHighlighting() {
  return (
    <SlideWithVocab vocab={[<Vocab word={pilin} />, <Vocab word={pana} />]}>
      <Title>{text`the particle pi`}</Title>
      <ExampleTokEl>
        {{
          type: "ex:tok",
          tok: tok`mu, ijo wawa o! tenpo ni la mi wile pana e sona suli tawa sina ale. o weka ala e tomo mi. seme la sina wile ni? ni li ike wawa a! ijo ale en jaki ale o, o ni ala a! o weka ala e tomo ante ale a! ante la sina wile e kili anu e pan?`,
          eng: [
            eng`@@ Hi, cool being o! Right now, la I li want to give e important information tawa to you all. o Don't make e my house o disappear. Why la li would sbj you li want to do this? That li 's terrible! All beings en and all disgusting things, o don't do this! o Don't remove e any other buildings! Also, la do you li want e fruit anu e or bread?`,
          ],
        }}
      </ExampleTokEl>
    </SlideWithVocab>
  )
}

export function SlidePrepositionsAsPredicates() {
  return (
    <SlideWithVocab vocab={[<Vocab word={pilin} />, <Vocab word={pana} />]}>
      <Title>{text`prepositions as predicates`}</Title>
      <InfoListUlEl>
        {{
          type: "ul",
          items: [
            {
              text: text`prepositions can be entire predicates, without needing a verb before them`,
            },
          ],
        }}
      </InfoListUlEl>
      <ExampleTokEl>
        {{
          type: "ex:tok",
          tok: tok`mi tawa tomo sina.`,
          eng: [eng`I tawa 'm_going_to your house.`],
        }}
      </ExampleTokEl>
      <ChallengeTokEl>
        {{
          type: "ch:tok",
          items: [
            {
              tok: tok`ona li lon ma.`,
              eng: [eng`They lon 're_at a place.`],
            },
            {
              tok: tok`sina kepeken ilo moku.`,
              eng: [
                eng`You kepeken 're_using a fork.`,
                eng`You kepeken 're_using chopsticks.`,
              ],
            },
            {
              tok: tok`ni li sama sina.`,
              eng: [eng`This sama is_like you.`],
            },
          ],
        }}
      </ChallengeTokEl>
      <ChallengeEngEl>
        {{
          type: "ch:eng",
          items: [
            {
              eng: eng`He tawa 's_going_to the school.`,
              tok: [tok`ona li tawa ma sona.`],
            },
            {
              eng: eng`We tawa 're_walking_towards the loud sound.`,
              tok: [tok`ona li tawa ma sona.`],
            },
          ],
        }}
      </ChallengeEngEl>
    </SlideWithVocab>
  )
}

export function App() {
  return (
    <SlideWithoutVocab>
      <Title>{text`la for marking time`}</Title>
      <InfoListUlEl>
        {{
          type: "ul",
          items: [
            {
              text: text`"tenpo ... la" phrases are used to mark when something occurs in time`,
            },
          ],
        }}
      </InfoListUlEl>
      <ExampleLaEl>
        {{
          type: "ex:la",
          tok: ["tenpo kama", tok`soweli li kama tawa ma kasi`],
          eng: [["coming time", eng`land mammals li come tawa to the forest`]],
        }}
      </ExampleLaEl>
      <ChallengeLaEl>
        {{
          type: "ch:la",
          tok: ["tenpo weka", tok`toki uta li ante mute`],
          eng: [["far time", eng`spoken language li was very different`]],
        }}
      </ChallengeLaEl>
      <ChallengeEngEl>
        {{
          type: "ch:eng",
          label: text`Translate using "la":`,
          items: [
            {
              eng: eng`Right now, la my parents li are grounding e me.`,
              tok: [tok`tenpo ni la mama mi li awen e mi lon tomo.`],
            },
          ],
        }}
      </ChallengeEngEl>
    </SlideWithoutVocab>
  )
}

export default App
