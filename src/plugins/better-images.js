import { visit } from "unist-util-visit"

const videoTest = /\/(.*)(.mp4|.mov)$/

export default () => (tree) => {
  visit(tree, "element", (node, index, parent) => {
    if (node.tagName !== "img" || parent.tagName === "figure") return

    const { src, alt } = node.properties
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
