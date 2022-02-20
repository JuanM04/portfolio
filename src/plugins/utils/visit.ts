import { visit } from "unist-util-visit"

interface Element {
  type: "element"
  tagName: string
  properties: Record<string, string | number | boolean | string[]>
  children: (Element | { type: "text"; value: string })[]
}

const castVisit = visit as any

/**
 * A wrapper around `unist-util-visit` to work around a typescript bug.
 *
 * See
 * https://github.com/microsoft/TypeScript/issues/46900
 * https://github.com/syntax-tree/unist-util-visit/issues/33
 *
 */
export const elementVisit = (
  ast: any,
  visitor: (
    node: Element,
    index: number | null,
    parent: Element | undefined | null
  ) => any,
  reverse = false
) => {
  return castVisit(ast, "element", visitor, reverse)
}
