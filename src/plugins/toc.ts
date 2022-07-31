import type { RemarkPlugin } from "@astrojs/markdown-remark"
import { toc } from "mdast-util-toc"

export const remarkToc: RemarkPlugin<[]> = () => tree => {
  const tocIndex = tree.children.findIndex(
    node => node.type === "html" && node.value.includes("<!-- toc -->")
  )

  if (tocIndex === -1) return

  const result = toc(tree, {
    heading: undefined,
    maxDepth: 3,
    ordered: false,
  })

  if (!result.map) return

  tree.children = [
    ...tree.children.slice(0, tocIndex),

    {
      type: "html",
      value: '<details id="toc"><summary>Table of Contents</summary>',
    },
    result.map,
    {
      type: "html",
      value: "</details>",
    },

    ...tree.children.slice(tocIndex + 1),
  ]
}
