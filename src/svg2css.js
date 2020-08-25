const svgToMiniDataURI = require('mini-svg-data-uri')

function svg2css(data, info) {
  const dataURI = svgToMiniDataURI(data)

  const props = []
  props.push(`background-image: url("${dataURI}");`)
  if (info != null) {
    props.push(`background-size: 100%;`)
    props.push(`width: ${info.width}px;`)
    props.push(`height: ${info.height}px;`)
  }
  return props.join('\n')
}

module.exports = svg2css
