const { createCommand } = require('commander')

module.exports = createCommand('build')
  .description('compile the project')
  .option('-s, --source <path>')
  .option('-t, --target <name>')
  .option('-v, --verbose', 'print more information')
  .action(require('../lib/build.js'))
