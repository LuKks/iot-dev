const { execFileSync } = require('child_process')
const pythonRuntime = require('./python-runtime.js')

module.exports = async function flash (file, opts = {}) {
  const {
    chip = 'auto'
  } = opts

  const output = execFileSync(pythonRuntime(false), [
    '-m=esptool',
    '--chip=' + chip,
    'image_info',
    file,
    '--version=2'
  ], { encoding: 'utf8' })

  const match = output.match(/ELF file SHA256: ([a-z0-9]{64})/i)

  return match[1]
}
