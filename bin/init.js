const { createCommand } = require('commander')

module.exports = createCommand('init')
  .description('create a new project')
  .action(require('../lib/init.js'))
