import { visit } from "unist-util-visit"

const videoTest = /\/(.*)(.mp4|.mov)$/

export default () => (tree) => {
  visit(tree, "element", (node, index, parent) => {
    if (node.tagName === "img" && videoTest.test(node.properties.src)) {
      const { src, alt } = node.properties
      node.tagName = "video"
      node.properties = { controls: true, title: alt }
      node.children.push({
        type: "element",
        tagName: "source",
        properties: { src, type: `video/${src.slice(-3)}` },
        children: [],
      })
    }
  })
}
