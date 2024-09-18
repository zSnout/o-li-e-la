import {
  children,
  createMemo,
  For,
  Match,
  Show,
  Switch,
  type JSXElement,
} from "solid-js"
import { clsx } from "../lib/clsx"
import type { AnySlide, SlideReview, SlideStandard } from "../lib/types"
import { Content, Title } from "./Content"
import { ContentPresenter } from "./ContentPresenter"
import { TextEl } from "./TextEl"
import { Vocab, VocabPresenter } from "./Vocab"

function SlideBase(props: { children: JSXElement; class?: string }) {
  return (
    <div
      class={
        "size-slide bg-white text-2xl text-z " +
        (props.class ? " " + props.class : "")
      }
    >
      {props.children}
    </div>
  )
}

function RenderStandard(props: { children: SlideStandard }) {
  function Main() {
    return (
      <>
        <Title>{props.children.title}</Title>
        <For each={props.children.content}>{(e) => <Content>{e}</Content>}</For>
      </>
    )
  }

  return (
    <SlideBase class="flex">
      <main
        class={clsx(
          "flex-1 px-8 py-12",
          props.children.suli &&
            "flex flex-col items-center justify-center text-center",
        )}
      >
        <div>
          <Main />
        </div>
      </main>
      <Show
        when={
          props.children.vocab?.length || props.children.vocabNoDefn?.length
        }
      >
        <ul
          class={clsx(
            "wx-80 hx-[calc(540px_-_2rem)] my-4 flex flex-col border-l border-z py-4 pl-6 pr-8 text-lg",
            props.children.vocab?.length ? "gap-4" : "gap-2",
          )}
        >
          <For each={props.children.vocab}>
            {(word) => <Vocab>{word}</Vocab>}
          </For>
          <For each={props.children.vocabNoDefn}>
            {(word) => <Vocab noDefn>{word}</Vocab>}
          </For>
        </ul>
      </Show>
      <Show when={props.children.image} keyed>
        {(image) => (
          <>
            <Show when={image.contain != null && image.aspect != "auto"}>
              <div
                class={clsx(
                  "absolute right-0 flex h-full overflow-clip",
                  image.aspect == "square" && "aspect-square",
                  image.aspect == "half" && "aspect-[8/9]",
                )}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  class="h-full w-full scale-110 object-cover opacity-50 blur"
                />
              </div>
            </Show>
            <img
              src={image.src}
              alt={image.alt}
              class={clsx(
                "relative h-full",
                image.aspect == "square" && "aspect-square",
                image.aspect == "half" && "aspect-[8/9]",
                image.contain != null ? "object-contain" : "object-cover",
                image.contain,
              )}
            />
          </>
        )}
      </Show>
    </SlideBase>
  )
}

function RenderReview(props: { children: SlideReview }) {
  return (
    <SlideBase class="flex">
      <main class="grid flex-1 px-8 py-12">
        <Title>{props.children.titleEng}</Title>
        <table>
          <tbody>
            <For each={props.children.vocab}>
              {(word) => (
                <tr>
                  <td class="font-ex-eng">
                    <span class="font-sp-sans text-z-heading">{word.word}</span>{" "}
                    <span class="text-z-heading">{word.word}</span>
                  </td>
                  <td class="font-ex-eng text-z">
                    <TextEl>{word.defnShort}</TextEl>
                  </td>
                </tr>
              )}
            </For>
          </tbody>
        </table>
      </main>
      <div class="wx-96 hx-[calc(540px_-_2rem)] my-4 flex flex-col border-l border-z py-4 pl-6 pr-8 text-lg">
        <ul>
          <For each={props.children.titles}>
            {(title) => (
              <li class="flex items-baseline gap-4 font-ex-eng text-xl">
                <span class="inline-block size-2 min-w-2 -translate-y-0.5 rounded-full bg-z-text-dimmed" />
                <span>
                  <TextEl>{title}</TextEl>
                </span>
              </li>
            )}
          </For>
        </ul>
        <Show when={props.children.sources.length}>
          <ul class="mt-4 flex flex-col gap-4 border-t border-z pt-4">
            <For each={props.children.sources}>
              {(source) => (
                <li class="font-ex-eng text-z">
                  <p class="text-z">
                    <span class="font-bold text-z-heading">{source.title}</span>{" "}
                    <span class="text-z-subtitle">by</span> {source.author}
                  </p>
                  <div class="pl-4">
                    <SourceLink href={source.url} />
                  </div>
                </li>
              )}
            </For>
          </ul>
        </Show>
      </div>
    </SlideBase>
  )
}

export function PrintReview(props: { children: SlideReview }) {
  function Front() {
    return (
      <div class="h-screen w-full break-inside-avoid bg-white px-6 py-8 text-z">
        <h1 class="mb-4 flex text-xl text-z-heading">
          <span class="flex-1 text-balance text-center font-ex-title">
            <TextEl>{props.children.titleEng}</TextEl>
          </span>
          <span class="font-ex-eng text-z-subtitle">
            #{props.children.index}
          </span>
        </h1>
        <div class="grid grid-cols-[auto,1fr] items-baseline gap-x-4">
          <For each={props.children.vocab}>
            {(word) => (
              <>
                <p class="font-bold text-z-heading">
                  <span class="font-sp-sans">{word.word}</span>{" "}
                  <span class="font-ex-eng">{word.word}</span>
                </p>
                <p class="font-ex-eng">
                  <TextEl>{word.defnShort}</TextEl>
                </p>
              </>
            )}
          </For>
        </div>
        <Show when={props.children.content.length}>
          <div class="group/small">
            <For each={props.children.content}>
              {(element) => <Content>{element}</Content>}
            </For>
          </div>
        </Show>
      </div>
    )
  }

  function Back() {
    return (
      <div class="h-screen w-full break-inside-avoid bg-white px-6 py-8 text-z">
        <div class="grid grid-cols-[auto,1fr] items-baseline gap-x-4">
          <For
            each={props.children.vocab}
            fallback={
              <p class="col-span-2 font-ex-eng italic text-z-subtitle">
                This sheet does not include any vocabulary.
              </p>
            }
          >
            {(word) => (
              <>
                <p class="font-bold text-z-heading">
                  <span class="font-sp-sans">{word.word}</span>{" "}
                  <span class="font-ex-eng">{word.word}</span>
                </p>
                <p class="font-ex-eng">
                  <TextEl>{word.defnShort}</TextEl>
                </p>
                <Show when={word.defnLipamanka}>
                  <p class="col-span-2 line-clamp-3 pl-6 font-ex-eng text-xs text-z-subtitle">
                    <TextEl>{word.defnLipamanka!}</TextEl>
                  </p>
                </Show>
              </>
            )}
          </For>
        </div>
      </div>
    )
  }

  return (
    <>
      <div class="flex break-inside-auto">
        <Front />
        <Front />
      </div>
      <div class="flex break-inside-auto">
        <Back />
        <Back />
      </div>
    </>
  )
}

export function Render(props: { children: AnySlide }) {
  return (
    <Switch>
      <Match when={props.children.type == "insa"}>
        <RenderStandard>{props.children as SlideStandard}</RenderStandard>
      </Match>

      <Match when={props.children.type == "pini"}>
        <RenderReview>{props.children as SlideReview}</RenderReview>
      </Match>
    </Switch>
  )
}

export function Scaled(props: {
  width: number
  height: number
  children: JSXElement
  class?: string
}) {
  return (
    <svg viewBox={`0 0 ${props.width} ${props.height}`} class={props.class}>
      <foreignObject
        x={0}
        y={0}
        width={props.width}
        height={props.height}
        viewBox={`0 0 ${props.width} ${props.height}`}
      >
        {props.children}
      </foreignObject>
    </svg>
  )
}

export function RenderScalable(props: {
  children: AnySlide
  class?: string
  onClick?: () => void
}) {
  return (
    <svg viewBox="0 0 960 540" class={props.class} onClick={props.onClick}>
      <foreignObject x={0} y={0} width={960} height={540} viewBox="0 0 960 540">
        <Render>{props.children}</Render>
      </foreignObject>
    </svg>
  )
}

function SourceLink(props: { href: string }) {
  return (
    <a
      class="block truncate text-z-link underline underline-offset-2"
      href={props.href}
    >
      {props.href.startsWith("https://www.reddit.com/r/") ?
        props.href.slice("https://www.reddit.com/".length)
      : props.href.startsWith("https://") ?
        props.href.slice("https://".length)
      : props.href.startsWith("http://") ?
        props.href.slice("http://".length)
      : props.href}
    </a>
  )
}

function PresenterNotesStandard(props: {
  class?: string
  children: SlideStandard
}) {
  const main = children(() => (
    <For each={props.children.content}>
      {(e) => <ContentPresenter>{e}</ContentPresenter>}
    </For>
  ))

  const isEmpty = createMemo(() => {
    const m = main()
    if (Array.isArray(m)) {
      if (m.some((x) => x)) {
        return false
      }
    } else if (m) {
      return false
    }

    if (props.children.vocab?.length) {
      return false
    }

    if (props.children.notes?.length) {
      return false
    }

    return true
  })

  return (
    <div
      class={
        "flex flex-col gap-4 overflow-auto text-z" +
        (props.class ? " " + props.class : "")
      }
    >
      <Show when={props.children.source} keyed>
        {(source) => (
          <div class="font-ex-eng text-z">
            <p>Sourced from {source.author}’s</p>
            <div class="pl-4">
              <p class="font-bold text-z-heading">{source.title}</p>
              <SourceLink href={source.url} />
            </div>
          </div>
        )}
      </Show>
      <Show when={isEmpty()}>
        <p class="font-sans italic text-z-subtitle">
          There are no notes on this slide.
        </p>
      </Show>
      {main()}
      <Show when={props.children.notes?.length}>
        <For each={props.children.notes}>
          {(note) => (
            <p class="whitespace-pre-line font-ex-eng text-z">
              <TextEl>{note}</TextEl>
            </p>
          )}
        </For>
      </Show>
      <For each={props.children.vocab}>
        {(word) => <VocabPresenter>{word}</VocabPresenter>}
      </For>
      <For each={props.children.vocabNoDefn}>
        {(word) => <VocabPresenter>{word}</VocabPresenter>}
      </For>
      <For each={props.children.vocabNoteOnly}>
        {(word) => <VocabPresenter>{word}</VocabPresenter>}
      </For>
      <Show
        when={
          props.children.vocab?.some((x) => x.defnLipamanka) ||
          props.children.vocabNoDefn?.some((x) => x.defnLipamanka) ||
          props.children.vocabNoteOnly?.some((x) => x.defnLipamanka)
        }
      >
        <p class="font-ex-eng text-z-subtitle">
          Paragraph-style word definitions available in the dropdowns above were
          written by{" "}
          <a
            class="text-z-link underline underline-offset-2"
            href="https://lipamanka.gay/essays/dictionary"
          >
            lipamanka
          </a>
          .
        </p>
      </Show>
    </div>
  )
}

function PresenterNotesReview(props: {
  children: SlideReview
  class?: string
}) {
  return (
    <div class={clsx("flex flex-col gap-4 overflow-auto text-z", props.class)}>
      <p class="font-sans italic text-z-subtitle">
        There are no notes on review slides.
      </p>
      <Show when={props.children.notes?.length}>
        <For each={props.children.notes}>
          {(note) => (
            <p class="whitespace-pre-line font-ex-eng text-z">
              <TextEl>{note}</TextEl>
            </p>
          )}
        </For>
      </Show>
      <For each={props.children.vocab}>
        {(word) => <VocabPresenter>{word}</VocabPresenter>}
      </For>
      <Show when={props.children.vocab?.some((x) => x.defnLipamanka)}>
        <p class="font-ex-eng text-z-subtitle">
          Paragraph-style word definitions available in the dropdowns above were
          written by{" "}
          <a
            class="text-z-link underline underline-offset-2"
            href="https://lipamanka.gay/essays/dictionary"
          >
            lipamanka
          </a>
          .
        </p>
      </Show>
    </div>
  )
}

export function PresenterNotes(props: { class?: string; children: AnySlide }) {
  return (
    <Switch>
      <Match when={props.children.type == "insa"}>
        <PresenterNotesStandard class={props.class}>
          {props.children as SlideStandard}
        </PresenterNotesStandard>
      </Match>
      <Match when={props.children.type == "pini"}>
        <PresenterNotesReview class={props.class}>
          {props.children as SlideReview}
        </PresenterNotesReview>
      </Match>
    </Switch>
  )
}
