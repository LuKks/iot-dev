const { createCommand } = require('commander')

module.exports = createCommand('flash')
  .description('write a firmware to device')
  .argument('[build]', 'path to build dir')
  .option('-p, --port [com]', 'Serial port device')
  .option('-b, --baud [rate]', 'Serial port baud rate', 921600)
  .option('-v, --verbose', 'print more information')
  .action(require('../lib/flash.js'))
