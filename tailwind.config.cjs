/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,svelte,ts,tsx,vue}"],
  darkMode: "media",
  theme: {
    extend: {
      typography: theme => ({
        DEFAULT: {
          css: {
            "--tw-prose-body": theme("colors.red.800"),
            "--tw-prose-bullets": theme("colors.red.500"),
            a: {
              textDecoration: `underline ${theme("colors.red.500")}`,
            },
            blockquote: {
              fontWeight: "inherit",
              fontStyle: "inherit",
              color: theme("colors.stone.700"),
              quotes: "none",
            },
            "blockquote p:first-of-type::before, blockquote p:first-of-type::after": {
              content: "none",
            },
            "h1, h2, h3, h4, h5, h6, th": {
              // text-display
              fontStretch: "normal",
              color: "#000000",
            },
            figcaption: {
              fontStyle: "italic",
              textAlign: "center",
            },
            video: {
              marginTop: "0",
              marginBottom: "0",
            },
          },
        },
        invert: {
          css: {
            blockquote: {
              color: theme("colors.stone.400"),
            },
            "h1, h2, h3, h4, h5, h6, th": {
              color: "#ffffff",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
