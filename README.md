# o li e la

**o li e la** is a slideshow software designed for teaching toki pona.

## Conventions

All text is lowercase except speaker notes, which are always properly
capitalized.

Slides should use short phrases as bullet points. More information can be moved
into speaker notes, which are then easily accessible.

## Text Features

**o li e la** can automatically color and stylize certain fragments of text in
slideshows. There are two main stylization categories: phrase and sentence.

### Sentence Stylization

Sentences may be stylized using slightly altered Markdown syntax.

```
This is some text with **bolded text**, *italicized text*, __underlines__, and ~~strikethroughs~~. Regarding embedded toki pona, "ona li ken toki pona kepeken poki Double Quote" and may have %"toki lili". Regarding embedded colored English, $"dollar signs li mark e embeds", and $%"dollar signs followed by percent signs" mark phrases. Writing ~"a quote starting with ~ will avoid text highlighting".
```

See the section below for rules on coloring text.

### Phrase Stylization

There are four phrase types: toki pona, English, toki pona pi phrases, and
English pi phrases.

See the `SLIDE_TEST_SYNTAX_HIGHLIGHTING` slide in
[`src/slides/00-test`](./src/slides/00-test.ts) for a wonderful example of all
the features described below in use. It may be more helpful than the set of
rules outlined below.

Stylized toki pona works as expected, with these special features:

- `taso,` alone at the beginning of a paragraph will have the comma removed and
  will be colored black to distinguish from surrounding text.
- `anu` phrases must be written as `anu e ...` or `anu li ...` to indicate what
  `anu` marks.
- `@li` will highlight the following text as if it follows the word `li`, but
  will not actually write `li`. This works with other particles as well.

Stylized English is quite strange. Because it is not automatically parseable, it
is written using additional syntax.

- Words following `li` or `e` will be highlighted appropriately, and the words
  `li` and `e` themselves will be removed.
- `prela word` will highlight `word` in the dark `la` color, and everything
  after it in the `la` color.
- `lon word ...` will highlight `word` in the dark `lon` color, and everything
  after it in the `lon` color. This works with other prepositions and `en`.
- `anu` must be written as `anu e word` to highlight `word` in the dark `e`
  color and everything after in the normal `e` color. This works with particles
  other than `e`.
- `@@ word` will highlight `word` in the `mu` color.
- `@li` will highlight the following text as if it follows the word `li`, but
  will not actually write `li`. This works with other particles as well.
- `'s` alone will prefix onto the previous word. This is useful for
  contractions, as in `That li 's terrible!`.

`pi` phrase styles for both languages are simpler. Everything is orange until
the first `pi`. `pi ...` then highlights like a normal particle. Note that `pi`
phrase styles only apply in `%"..."` and `$%"..."` quotes; normally, `pi` is
treated as a plain word.

## Usage

```bash
$ npm install # or pnpm install or yarn install
```

Learn more on the [Solid Website](https://solidjs.com) and come chat with us on
our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.<br> Open
[http://localhost:5173](http://localhost:5173) to view it in the browser.

### `npm run build`

Builds the app for production to the `dist` folder.<br> It correctly bundles
Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br> Your app is
ready to be deployed!

## Deployment

Learn more about deploying your application with the
[documentations](https://vitejs.dev/guide/static-deploy.html)
