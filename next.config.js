module.exports = {
  webpack: config => {
    config.module.rules.push({
      test: /docs\/.+\.md$/,
      use: "raw-loader",
    })
    return config
  },
  target: "serverless",
}
