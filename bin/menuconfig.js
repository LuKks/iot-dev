const { createCommand } = require('commander')

module.exports = createCommand('menuconfig')
  .description('open configuration menu')
  .action(require('../lib/menuconfig.js'))
