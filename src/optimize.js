const SVGO = require('svgo')
const defaultConfig = {
  plugins: [
    {
      removeViewBox: false
    },
    {
      inlineStyles: {
        onlyMatchedOnce: false
      }
    }
  ]
}

function optimize(svgstr, config = defaultConfig) {
  const svgo = new SVGO(config)
  return svgo.optimize(svgstr)
}

module.exports = optimize
