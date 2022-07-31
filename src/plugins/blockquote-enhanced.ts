import type { RemarkPlugin } from "@astrojs/markdown-remark"
import { visit } from "unist-util-visit"

export const blockquoteEnhanced: RemarkPlugin<[]> = () => tree => {
  visit(tree, "blockquote", node => {
    if (node.children.length === 0) return

    const p = node.children[0]
    if (p.type !== "paragraph") return
    if (p.children.length === 0) return

    const strong = p.children[0]
    if (strong.type !== "strong") return
    if (strong.children.length !== 1) return

    const text = strong.children[0]
    if (text.type !== "text") return

    if (text.value === "Note") {
      strong.children[0] = {
        type: "html",
        value: '<strong class="text-blue-500">Note</strong>',
      }
    } else if (text.value === "Warning") {
      strong.children[0] = {
        type: "html",
        value: '<strong class="text-amber-500">Warning</strong>',
      }
    }
  })
}
