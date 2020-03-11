const sg = require('scenegraph')
const commands = require('commands')

function convertAllTextsToPaths(selection) {
  const srcItems = selection.items
  const dstItems = srcItems.concat()
  collectAllTexts([], srcItems).forEach(node => {
    selection.items = node
    commands.convertToPath()

    const index = srcItems.indexOf(node)
    if (index !== -1) {
      dstItems[index] = selection.items[0]
    }
  })
  selection.items = dstItems
}

function collectAllTexts(results, node) {
  if (Array.isArray(node)) {
    return node.reduce(collectAllTexts, results)
  }
  if (node.children && node.children.length > 0) {
    node.children.forEach(collectAllTexts.bind(null, results))
    return results
  }
  if (node instanceof sg.Text) {
    results.push(node)
  }
  return results
}

module.exports = convertAllTextsToPaths
