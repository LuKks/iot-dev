const os = require('os')
const { execFileSync } = require('child_process')
const runtime = require('cmake-runtime')

module.exports = async function build (opts = {}) {
  const {
    build = 'build',
    target = 'all',
    parallel = os.availableParallelism(),
    verbose = false
  } = opts

  execFileSync(runtime('cmake'), [
    '--build' + build,
    '--target=' + target,
    '--parallel=' + parallel,
    verbose ? '--verbose' : null
  ].filter(v => v), { stdio: 'inherit' })
}
