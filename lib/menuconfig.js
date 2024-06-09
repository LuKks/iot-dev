const os = require('os')
const { execFileSync } = require('child_process')
const runtime = require('cmake-runtime')

module.exports = async function menuconfig (opts = {}) {
  const {
    build = 'build'
  } = opts

  execFileSync(runtime('cmake'), [
    '--build',
    build,
    '--target=menuconfig'
  ].filter(v => v), { stdio: 'inherit' })
}
