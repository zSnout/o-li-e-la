## The `lib2` slide system

`lib2` is fundamentally built around the ideas of items and extensions. An item
is a piece of data which encodes any information necessary to render it. An
extension is what renders an item.

For example, an extension called `text/styled` renders colored text items, the
`slide/standard` extension renders slides with content and an optional aside,
and the `aside/vocab` extension renders an aside with vocabulary.

To maximize extensibility, all non-core functionality is provided through
extensions. The central manager in `lib2`, known as `Slideshow`, is really only
responsible for holding extensions together and providing a convenient way to
render them.

## Item Kinds

As of October 10, 2024, there are eight item kinds. The item kinds are selected
to be useful for slideshow applications, and more may be added in the future.

- `Text`: plain or formatted text
- `Note`: notes in the presenter's screen
- `Entry`: boxes in the collect mode
- `Vocab`: a vocabulary word
- `Content`: short-form content added onto slides
- `Aside`: large-form sidebars added onto slides
- `Slide`: a slide as shown to viewers and presenters
- `Print`: a sheet which may be printed at approximately 5.5x8.5in

Items typically have the following hierarchy of dependence, although this is not
mandated by the software and may be changed by any plugin.

- `Text`: independent
- `Note`: relies on `Text`
- `Entry`: relies on `Text`
- `Vocab`: relies on `Text`
- `Content`: relies on `Text`
- `Aside`: sometimes uses `Text`
- `Slide`: uses `Content` and `Aside`
- `Print`: uses `Content`

## Extension Kinds

An extension renders a particular item kind. For example, the `aside/image`
extension adds an `Aside` item called `"image"` and provides rendering
capabilities for it.

See `types.ts` for the full interface of what a particular kind of extension
must provide. In particular, many extension kinds must provide output for the
viewer, presenter, and collect view, as these typically vary wildly.

An extension is typically a self-contained file which exports at least two
things. First, the extension's definition itself, which is by convention named
`ext`. Second, a builder to construct an item for that extension, which is by
convention named after the extension itself.

An extension requires an ID to differentiate itself from other extensions of the
same kind. The core libraries here use only letters and underscores in their
names. It is recommended that third-party extensions use their package name
followed by `::` followed by the extension name to avoid conflicts with future
standard extensions.

For instance, if `@zsnout/ithkuil` provided a text extension which rendered
Ithkuil script, it would be recommended to give it an ID of
`@zsnout/ithkuil::script`.

As it is so common, the plain text extension uses the ID of the empty string
`""`.
