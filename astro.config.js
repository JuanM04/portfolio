// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference

// @type-check enabled!
// VSCode and other TypeScript-enabled text editors will provide auto-completion,
// helpful tooltips, and warnings if your exported object is invalid.
// You can disable this by removing "@ts-check" and `@type` comments below.

// @ts-check
export default /** @type {import('astro').AstroUserConfig} */ ({
  renderers: ["@astrojs/renderer-solid"],
  buildOptions: {
    site: "https://juanm04.com",
    experimentalStaticBuild: true,
  },
  markdownOptions: {
    render: [
      "@astrojs/markdown-remark",
      {
        remarkPlugins: ["remark-gfm", "remark-smartypants", "remark-math"],
        rehypePlugins: [
          "rehype-slug",
          [
            "rehype-katex",
            {
              macros: {
                "\\unit": "\\ \\text{#1}",
              },
            },
          ],
          new URL("./src/plugins/video.js", import.meta.url).pathname,
        ],
      },
    ],
  },
  vite: { ssr: { external: ["svgo"] } },
})
