import { children, createMemo, For, Show, type JSXElement } from "solid-js"
import type { AnySlide, SlideStandard } from "../lib/types"
import { Content, Title } from "./Content"
import { ContentPresenter } from "./ContentPresenter"
import { TextEl } from "./TextEl"
import { Vocab, VocabPresenter } from "./Vocab"
import { clsx } from "../lib/clsx"

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
        class={
          "flex-1 px-8 py-12" +
          (props.children.type == "suli" ?
            " flex flex-col items-center justify-center text-center"
          : "")
        }
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
            "wx-80 hx-[calc(540px_-_2rem)] my-4 ml-8 flex flex-col border-l border-z py-4 pl-6 pr-8 text-lg",
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

export function Render(props: { children: AnySlide }) {
  return (
    <Show when={props.children.type == "insa" || props.children.type == "suli"}>
      <RenderStandard>{props.children as SlideStandard}</RenderStandard>
    </Show>
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
              <a
                class="block truncate text-z-link underline underline-offset-2"
                href={source.url}
              >
                {source.url.startsWith("https://www.reddit.com/r/") ?
                  source.url.slice("https://www.reddit.com/".length)
                : source.url.startsWith("https://") ?
                  source.url.slice("https://".length)
                : source.url.startsWith("http://") ?
                  source.url.slice("http://".length)
                : source.url}
              </a>
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

export function PresenterNotes(props: { class?: string; children: AnySlide }) {
  return (
    <Show when={props.children.type == "insa" || props.children.type == "suli"}>
      <PresenterNotesStandard class={props.class}>
        {props.children as SlideStandard}
      </PresenterNotesStandard>
    </Show>
  )
}
