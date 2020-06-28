const withPWA = require("next-pwa")

module.exports = withPWA({
  webpack: (config) => {
    config.module.rules.push({
      test: /docs\/.+\.md$/,
      use: "raw-loader",
    })
    return config
  },
  target: "serverless",
  pwa: {
    disable: process.env.NODE_ENV !== "production",
    register: process.env.NODE_ENV === "production",
    dest: "public",
  },
})
