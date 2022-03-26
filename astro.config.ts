// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference
import { defineConfig } from "astro/config"
import markdownRemark, { AstroMarkdownOptions } from "@astrojs/markdown-remark"
import solid from "@astrojs/solid-js"
import sitemap from "@astrojs/sitemap"

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

// https://astro.build/config
export default defineConfig({
  integrations: [solid(), sitemap()],
  buildOptions: {
    site: "https://juanm04.com",
  },
  markdownOptions: {
    render: [markdownRemark, markdownConfig],
  },
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
})
