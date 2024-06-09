const fs = require('fs')
const path = require('path')

module.exports = async function writeFile (filename, content) {
  await fs.promises.mkdir(path.dirname(filename), { recursive: true })
  await fs.promises.writeFile(filename, content.trim() + '\n', { flag: 'wx' })
}
