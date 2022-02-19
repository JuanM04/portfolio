// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference

// @type-check enabled!
// VSCode and other TypeScript-enabled text editors will provide auto-completion,
// helpful tooltips, and warnings if your exported object is invalid.
// You can disable this by removing "@ts-check" and `@type` comments below.
import betterImages from "./src/plugins/better-images.js"
import { getLanguages } from "./src/plugins/languages/index.js"

// @ts-check
/** @type{import('@astrojs/markdown-remark').AstroMarkdownOptions} */
const markdownConfig = {
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
}

// @ts-check
/** @type{import('astro').AstroUserConfig} */
const config = {
  renderers: ["@astrojs/renderer-solid"],
  buildOptions: {
    site: "https://juanm04.com",
    experimentalStaticBuild: true,
  },
  markdownOptions: {
    render: ["@astrojs/markdown-remark", markdownConfig],
  },
  vite: { ssr: { external: ["svgo"] } },
}

export default config
