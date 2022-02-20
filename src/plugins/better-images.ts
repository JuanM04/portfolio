import { elementVisit } from "./utils/visit"
import type { Plugin } from "unified"

const videoTest = /\/(.*)(.mp4|.mov)$/

export const betterImages: Plugin = () => (tree) => {
  elementVisit(tree, (node, _index, parent) => {
    if (node.tagName !== "img" || parent?.tagName === "figure") return

    const { src, alt } = node.properties

    if (
      typeof src !== "string" ||
      (typeof alt !== "undefined" && typeof alt !== "string")
    ) {
      return
    }

    node.tagName = "figure"
    node.properties = {}
    node.children = []

    if (videoTest.test(src)) {
      node.children.push({
        type: "element",
        tagName: "video",
        properties: { controls: true },
        children: [
          {
            type: "element",
            tagName: "source",
            properties: { src, type: `video/${src.slice(-3)}` },
            children: [],
          },
        ],
      })
    } else {
      node.children.push({
        type: "element",
        tagName: "img",
        properties: { src },
        children: [],
      })
    }

    if (alt) {
      node.children.push({
        type: "element",
        tagName: "figcaption",
        properties: {},
        children: [{ type: "text", value: alt }],
      })
    }
  })
}
