/*
 * original code:
 * https://github.com/yoksel/url-encoder
 */

const symbols = /[\r\n%#()<>?\[\\\]^`{|}]/g

function encodeSVG(externalQuotesValue, data) {
  // Use single quotes instead of double to avoid encoding.
  if (externalQuotesValue === 'double') {
    data = data.replace(/"/g, "'")
  } else {
    data = data.replace(/'/g, '"')
  }

  data = data.replace(/>\s{1,}</g, '><')
  data = data.replace(/\s{2,}/g, ' ')

  return data.replace(symbols, encodeURIComponent)
}

function svg2css(externalQuotesValue, data, info) {
  const escaped = encodeSVG(externalQuotesValue, data)
  const level1 = externalQuotesValue === 'double' ? `"` : `'`
  const props = []
  props.push(
    `background-image: url(${level1}data:image/svg+xml,${escaped}${level1});`
  )
  if (info != null) {
    props.push(`background-size: 100%;`)
    props.push(`width: ${info.width}px;`)
    props.push(`height: ${info.height}px;`)
  }
  return props.join('\n')
}

module.exports = svg2css
