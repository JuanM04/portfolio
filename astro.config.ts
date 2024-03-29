// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference
import { defineConfig } from "astro/config"
import solid from "@astrojs/solid-js"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"

import { betterImages } from "./src/plugins/better-images"
import { blockquoteEnhanced } from "./src/plugins/blockquote-enhanced"
import { mermaid } from "./src/plugins/mermaid"
import { getLanguages } from "./src/plugins/languages"
import { remarkToc } from "./src/plugins/toc"

// https://astro.build/config
export default defineConfig({
  site: "https://juanm04.com/",
  integrations: [solid(), sitemap(), tailwind({ config: { applyBaseStyles: false } })],
  trailingSlash: "never",
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "vitesse-dark",
      langs: getLanguages(),
    },
    gfm: true,
    smartypants: true,
    remarkPlugins: ["remark-code-titles", "remark-math", blockquoteEnhanced, remarkToc, mermaid],
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
  },
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
})
