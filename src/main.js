// Dependencies
const fs = require('uxp').storage.localFileSystem
const application = require('application')
const clipboard = require('clipboard')
const commands = require('commands')
const { createDialog, error } = require('./lib/dialogs.js')
const optimize = require('./optimize.js')
const convertAllTextsToPaths = require('./convert-all-texts-to-paths.js')
const svg2css = require('./svg2css.js')

// Main function
async function copySvgCode(toCSS, selection) {
  // Error if nothing selected
  if (!selection.hasArtwork) {
    error('No SVG selected', 'Please select an SVG before running.')
    return
  }

  // Convert all texts to paths
  convertAllTextsToPaths(selection)

  // Group if multiple selections
  if (selection.items.length >= 2) {
    commands.group()
  }

  // Setup tmp folder and file
  const tmpFolder = await fs.getTemporaryFolder()
  const file = await tmpFolder.createFile('export.svg', {
    overwrite: true
  })

  // Rendition settings
  const renditions = [
    {
      node: selection.items[0],
      outputFile: file,
      type: application.RenditionType.SVG,
      minify: true,
      embedImages: true
    }
  ]

  // Create rendition
  await application.createRenditions(renditions)

  // Read tmp file and generate SVG code
  const markup = await file.read()
  const { data, info } = await optimize(markup)

  if (toCSS) {
    const css = svg2css(data, info)
    const escaped = escapeHtml(css)

    clipboard.copyText(css)

    await createDialog({
      title: 'CSS Output',
      template: () => `<textarea rows="10" cols="60">${escaped}</textarea>`
    })
  } else {
    const escaped = escapeHtml(data)

    clipboard.copyText(data)

    await createDialog({
      title: 'SVG Output',
      template: () => `<input value="${escaped}">`
    })
  }
}

// Helper(s)
function escapeHtml(unsafe) {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

// Exports
module.exports = {
  commands: {
    copySvgCode: copySvgCode.bind(null, false),
    copySvgAsBackgroundImage: copySvgCode.bind(null, true)
  }
}
