// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference
import { defineConfig } from "astro/config"
import solid from "@astrojs/solid-js"
import sitemap from "@astrojs/sitemap"
import vercel from "@astrojs/vercel/serverless"

import { betterImages } from "./src/plugins/better-images"
import { mermaid } from "./src/plugins/mermaid"
import { getLanguages } from "./src/plugins/languages"

// https://astro.build/config
export default defineConfig({
  site: "https://juanm04.com",
  adapter: vercel(),
  integrations: [solid(), sitemap()],
  trailingSlash: "always",
  markdown: {
    syntaxHighlight: "shiki",
    shikiConfig: {
      theme: "css-variables",
      langs: getLanguages(),
    },
    remarkPlugins: [
      "remark-gfm",
      "remark-smartypants",
      "remark-code-titles",
      "remark-math",
      mermaid,
    ],
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
