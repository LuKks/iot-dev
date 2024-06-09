const { createCommand } = require('commander')

module.exports = createCommand('configure')
  .description('set up the build environment')
  .option('-s, --source <path>')
  .option('-b, --build <path>')
  .option('-t, --target <chip>')
  .option('-v, --verbose', 'print more information')
  .action(require('../lib/configure.js'))
