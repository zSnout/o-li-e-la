export type ClsxItem =
  | string
  | false
  | null
  | undefined
  | 0
  | 0n
  | readonly ClsxItem[]
  | (object & { readonly [x: string]: boolean })

function clsxOne(item: ClsxItem): string {
  if (typeof item == "string") {
    return item
  }

  if (!item) {
    return ""
  }

  if (Array.isArray(item)) {
    return item
      .map(clsxOne)
      .reduce((a, b) => (a && b ? a + " " + b : a || b), "")
  }

  return Object.entries(item)
    .filter((x) => x[1])
    .map((x) => x[0])
    .reduce((a, b) => (a && b ? a + " " + b : a || b), "")
}

export function clsx(...items: ClsxItem[]): string {
  return clsxOne(items)
}
