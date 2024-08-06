import {
  ChallengeDiscussEl,
  ChallengeEngEl,
  ChallengeExplainDifferenceEl,
  ChallengeLaEl,
  ChallengeTokEl,
  ExampleLaEl,
  ExampleSetManyEl,
  ExampleSetQAEl,
  ExampleTokEl,
  InfoListUlEl,
  Title,
} from "./el/Content"
import { SlideWithoutVocab, SlideWithVocab } from "./el/Slide"
import { Vocab } from "./el/Vocab"
import { eng, peng, ptok, tok, tokPi } from "./lib/colors"
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
            eng`@@ Hi, cool being o! Right now, la I li want to give e important information tawa to you all. o Don't make e my house o disappear. Why la li would @en you li want to do this? That li 's terrible! All beings en and all disgusting things, o don't do this! o Don't remove e any other buildings! Also, la do you li want e fruit anu e or bread?`,
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

export function SlideLaForMarkingTime() {
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

export function SlideTheParticleLa() {
  return (
    <SlideWithoutVocab>
      <Title>{text`the particle la`}</Title>
      <InfoListUlEl>
        {{
          type: "ul",
          items: [
            {
              text: text`the particle "la" works like this, where the context phrase can be a phrase or a sentence`,
            },
          ],
        }}
      </InfoListUlEl>
      <ExampleTokEl>
        {{
          type: "ex:tok",
          tok: tok`[context phrase] la [main sentence].`,
          eng: [
            eng`prela In_the_context_of [context phrase], [main sentence].`,
          ],
        }}
      </ExampleTokEl>
      <ExampleLaEl>
        {{
          type: "ex:la",
          tok: ["tenpo pini poka", tok`jan li alasa pona e mi`],
          eng: [
            ["a nearby finished time", eng`somebody li tried to improve  e me`],
          ],
        }}
      </ExampleLaEl>
      <ExampleLaEl>
        {{
          type: "ex:la",
          tok: ["kon li wawa", tok`mi ken ala tawa lon wile`],
          eng: [["the wind is strong", eng`I li cannot move lon on my will`]],
        }}
      </ExampleLaEl>
    </SlideWithoutVocab>
  )
}

export function SlideModifierStacking() {
  return (
    <SlideWithoutVocab>
      <Title>{text`modifier stacking`}</Title>
      <InfoListUlEl>
        {{
          type: "ul",
          items: [
            { text: text`__**usually, you don't need modifiers!**__` },
            { text: text`all modifiers modify the first word` },
            { text: text`1-2 words are usually specific enough` },
            { text: text`3+ is acceptable, but is probably overspecifying` },
          ],
        }}
      </InfoListUlEl>
      <ExampleSetManyEl>
        {{
          type: "exs:many",
          entries: [
            { tok: ptok`kulupu`, eng: peng`group` },
            { tok: ptok`kulupu jan`, eng: peng`group of people` },
            { tok: ptok`kulupu jan suli`, eng: peng`large group of people` },
            {
              tok: ptok`kulupu jan suli ike`,
              eng: peng`bad, large group of people`,
            },
          ],
        }}
      </ExampleSetManyEl>
      <ChallengeEngEl>
        {{
          type: "ch:eng",
          items: [
            {
              eng: peng`sleeping adult`,
              tok: [ptok`jan suli lape`],
              hint: text`decompose $"adult"`,
            },
            {
              eng: peng`nice picture of fruit`,
              tok: [ptok`sitelen kili pona`],
              hint: text`find the core word first`,
            },
          ],
        }}
      </ChallengeEngEl>
    </SlideWithoutVocab>
  )
}

export function SlideTheParticleSeme() {
  return (
    <SlideWithoutVocab>
      <Title>{text`the particle seme (for open-ended questions)`}</Title>
      <InfoListUlEl>
        {{
          type: "ul",
          items: [
            {
              text: text`to make a fill-in-the-blank question, make a normal sentence and use "seme" to replace what you want to know`,
            },
            {
              text: text`don't change the word order from what the sentence would be without "seme"`,
            },
            {
              text: text`you can respond with a full sentence or with what was asked for`,
            },
          ],
        }}
      </InfoListUlEl>
      <ExampleSetQAEl>
        {{
          type: "exs:qa",
          q: { tok: tok`sina wile e seme?`, eng: eng`You li want e what?` },
          a: [{ tok: tok`@e kasi.`, eng: eng`e A plant.` }],
        }}
      </ExampleSetQAEl>
      <ExampleSetQAEl>
        {{
          type: "exs:qa",
          q: {
            tok: tok`seme li lon tomo ni?`,
            eng: eng`What lon 's_in this building?`,
          },
          a: [
            {
              tok: tok`akesi li lon tomo ni.`,
              eng: eng`Reptiles lon are in this building.`,
            },
          ],
        }}
      </ExampleSetQAEl>
      <ExampleSetQAEl>
        {{
          type: "exs:qa",
          q: {
            tok: tok`ni li seme?`,
            eng: eng`li What is @en this?`,
          },
          a: [
            {
              tok: tok`@li esun moku.`,
              eng: eng`li A restaurant.`,
            },
          ],
        }}
      </ExampleSetQAEl>
    </SlideWithoutVocab>
  )
}

export function SlideRespondingToXAlaX() {
  return (
    <SlideWithoutVocab>
      <Title>{text`responding to "@li X ala X"`}</Title>
      <ExampleSetQAEl>
        {{
          type: "exs:qa",
          q: {
            tok: tok`sina moku ala moku e kasi?`,
            eng: eng`Did you li eat e the plants?`,
          },
          a: [
            { tok: tok`@li moku.`, eng: eng`li Eat (yes).` },
            { tok: tok`@li moku ala.`, eng: eng`li Didn't eat (no).` },
            { tok: tok`@li ala.`, eng: eng`li No.` },
            { tok: tok`mi ni.`, eng: eng`I li did that.` },
            { tok: tok`mi ni ala.`, eng: eng`I li didn't do that.` },
          ],
        }}
      </ExampleSetQAEl>
      <ChallengeDiscussEl>
        {{
          type: "ch:discuss",
          label: text`Respond to these questions:`,
          items: [
            text`akesi li moli ala moli?`,
            text`mi o moli ala moli e ona?`,
            text`sina pana ala pana e ona tawa sike?`,
          ],
        }}
      </ChallengeDiscussEl>
    </SlideWithoutVocab>
  )
}

export function SlideTheParticlePi() {
  return (
    <SlideWithoutVocab>
      <Title>{text`the particle %"pi"`}</Title>
      <ChallengeExplainDifferenceEl>
        {{
          type: "ch:diff",
          items: [
            {
              a: tokPi`tomo moku lili`,
              b: tokPi`tomo pi moku lili`,
              eng: [
                text`While %"tomo moku lili" refers to a small food-place (like a small restaurant), %"tomo pi moku lili" refers to a small-food place (like a snack bar).`,
              ],
            },
            {
              a: tokPi`lipu sona suno`,
              b: tokPi`lipu pi sona suno`,
              eng: [
                text`While %"lipu sona suno" refers to a lit-up sheet of knowledge (like a page of a Kindle reader), %"lipu pi sona suno" could be a book about sun-knowledge (like a book on astrophysics).`,
              ],
            },
            {
              a: tokPi`jan poka wawa`,
              b: tokPi`jan pi poka wawa`,
              eng: [
                text`While %"jan poka wawa" is a powerful person who is close by, %"jan pi poka wawa" is a person who is **very** close by.`,
              ],
            },
          ],
        }}
      </ChallengeExplainDifferenceEl>
    </SlideWithoutVocab>
  )
}

export default SlideTheParticlePi
