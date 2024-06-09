const { execFileSync } = require('child_process')
const runtime = require('cmake-runtime')
const pythonRuntime = require('./python-runtime.js')

module.exports = async function configure (opts = {}) {
  const {
    source = '.',
    build = 'build',
    target = 'esp32',
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
    '-DCMAKE_MESSAGE_LOG_LEVEL=' + (verbose ? 'VERBOSE' : 'NOTICE'),

    '-DCMAKE_TOOLCHAIN_FILE=' + process.env.IDF_PATH + '/tools/cmake/toolchain-' + target + '.cmake',
    '-DIDF_TARGET=' + target
  ], { stdio: 'inherit' })
}
