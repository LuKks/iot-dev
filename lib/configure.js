const { execFileSync } = require('child_process')
const runtime = require('cmake-runtime')
const pythonRuntime = require('./python-runtime.js')

module.exports = async function create (opts = {}) {
  const {
    source = '.',
    build = 'build',
    verbose = false
  } = opts

  execFileSync(runtime('cmake'), [
    '-S=' + source,
    '-B=' + build,

    '-G=Unix Makefiles',

    '-DPYTHON_DEPS_CHECKED=1',
    '-DPYTHON=' + pythonRuntime(),

    '-DESP_PLATFORM=1',

    '-DCCACHE_ENABLE=0',
    '-DCMAKE_MESSAGE_LOG_LEVEL=' + (verbose ? 'VERBOSE' : 'NOTICE')
  ], { stdio: 'inherit' })
}
