const { createCommand } = require('commander')

module.exports = createCommand('component')
  .description('create a new component')
  .argument('<name>')
  .action(require('../lib/init-component.js'))
