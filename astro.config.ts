// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference

import type { AstroUserConfig } from "astro"
import markdownRemark, { AstroMarkdownOptions } from "@astrojs/markdown-remark"
import { betterImages } from "./src/plugins/better-images"
import { getLanguages } from "./src/plugins/languages"

const markdownConfig: AstroMarkdownOptions = {
  syntaxHighlight: "shiki",
  shikiConfig: {
    theme: "css-variables",
    langs: getLanguages(),
  },
  remarkPlugins: ["remark-gfm", "remark-smartypants", "remark-code-titles", "remark-math"],
  rehypePlugins: [
    "rehype-slug",
    [
      "rehype-katex",
      {
        output: "html",
        macros: {
          "\\unit": "\\ \\text{#1}",
        },
      },
    ],
    betterImages,
  ],
}

const config: AstroUserConfig = {
  renderers: ["@astrojs/renderer-solid"],
  buildOptions: {
    site: "https://juanm04.com",
    experimentalStaticBuild: true,
    sitemap: true,
  },
  markdownOptions: {
    render: [markdownRemark, markdownConfig],
  },
  vite: { ssr: { external: ["svgo"] } },
}

export default config
