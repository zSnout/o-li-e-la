import type { Group } from "./slideshow"
import type { Vocab } from "./types"

export type VocabVisLoc = "ex" | "chq" | "cha" | "note"
export type VocabVisCtx = "defn" | "ref" | "ref_inner"

export class VocabVis {
  private static readonly map: Map<VocabVisLoc, Map<VocabVisCtx, VocabVis>> =
    new Map()

  /** Used in examples. */
  static readonly EX = new VocabVis("ex", "defn")

  /** Used in descriptions (paragraphs, lists). */
  static readonly DESC = new VocabVis("ex", "ref")

  /** Used in challenge prompts. */
  static readonly CH_Q = new VocabVis("chq", "defn")

  /** Used in challenge labels. */
  static readonly CH_LABEL = new VocabVis("chq", "ref")

  /** Used in challenge answers. */
  static readonly CH_A = new VocabVis("cha", "defn")

  /** Used in challenge explanations. */
  static readonly CH_EXPL = new VocabVis("cha", "ref")

  /** Used in speaker notes. */
  static readonly NOTE = new VocabVis("note", "ref")

  private constructor(
    /** Where the vocab was used. */
    private readonly loc: VocabVisLoc,
    /**
     * Whether it was a defining usage (an example or translation challenge
     * prompt), a referential usage (in the middle of a paragraph), or in a
     * properly semanticized portion of a paragraph.
     */
    private readonly ctx: "defn" | "ref" | "ref_inner",
  ) {
    let map = VocabVis.map.get(loc)
    if (!map) {
      map = new Map()
      VocabVis.map.set(loc, map)
    }

    let el = map.get(ctx)
    if (!el) {
      el = this
      map.set(ctx, el)
    }

    return el
  }

  asRefInner() {
    return new VocabVis(this.loc, "ref_inner")
  }

  isDefn() {
    return this.ctx == "defn" || this.ctx == "ref_inner"
  }
}

export class VocabList {
  readonly defs: Map<Group, Map<VocabVis, Map<string, Vocab>>> = new Map()
  readonly refs: Map<Group, Map<VocabVis, string[]>> = new Map()

  /** Marks a word as being defined in this section. */
  def(group: Group, word: string, vocab: Vocab, vis: VocabVis) {
    let map = this.defs.get(group)
    if (!map) {
      map = new Map()
      this.defs.set(group, map)
    }

    let arr = map.get(vis)
    if (!arr) {
      arr = new Map()
      map.set(vis, arr)
    }

    arr.set(word, vocab)
  }

  /** Marks a word as being referenced in this section. */
  ref(group: Group, word: string, vis: VocabVis) {
    let map = this.refs.get(group)
    if (!map) {
      map = new Map()
      this.refs.set(group, map)
    }

    let arr = map.get(vis)
    if (!arr) {
      arr = []
      map.set(vis, arr)
    }

    arr.push(word)
  }
}

export class VocabProxy {
  constructor(
    private readonly list: VocabList,
    private readonly group: Group,
  ) {}

  /** Marks a word as being defined in this section. */
  def(word: string, vocab: Vocab, vis: VocabVis) {
    this.list.def(this.group, word, vocab, vis)
  }

  /** Marks a word as being referenced in this section. */
  ref(word: string, vis: VocabVis) {
    this.list.ref(this.group, word, vis)
  }
}
