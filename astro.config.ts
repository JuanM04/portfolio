// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference
import { defineConfig } from "astro/config"
import solid from "@astrojs/solid-js"
import sitemap from "@astrojs/sitemap"
import vercel from "@astrojs/vercel"

import { betterImages } from "./src/plugins/better-images"
import { getLanguages } from "./src/plugins/languages"

// https://astro.build/config
export default defineConfig({
  site: "https://juanm04.com",
  adapter: vercel(),
  integrations: [solid(), sitemap()],
  markdown: {
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
  },
  vite: {
    ssr: {
      external: ["svgo"],
    },
  },
})
