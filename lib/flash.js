const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')
const pythonRuntime = require('./python-runtime.js')

module.exports = async function flash (build, opts = {}) {
  const {
    port = null,
    baud = 921600
  } = opts

  if (!build) {
    build = 'build'
  }

  const flasher = JSON.parse(await fs.promises.readFile(path.join(build, 'flasher_args.json')))

  execFileSync(pythonRuntime(), [
    '-m=esptool',

    '--chip=' + flasher.extra_esptool_args.chip,
    port ? ('--port=' + port) : null,
    '--baud=' + baud,

    '--before=' + flasher.extra_esptool_args.before,
    '--after=' + flasher.extra_esptool_args.after,

    'write_flash',

    '--flash_mode=' + flasher.flash_settings.flash_mode,
    '--flash_size=' + flasher.flash_settings.flash_size,
    '--flash_freq=' + flasher.flash_settings.flash_freq,

    flasher.bootloader.offset, flasher.bootloader.file,
    flasher['partition-table'].offset, flasher['partition-table'].file,
    flasher.app.offset, flasher.app.file
  ].filter(v => v), { stdio: 'inherit' })
}
