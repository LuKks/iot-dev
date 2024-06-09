const { createCommand } = require('commander')

module.exports = createCommand('init')
  .description('create from a template')
  .addCommand(require('../bin/init-project.js'))
  .addCommand(require('../bin/init-component.js'))
  .action(require('../lib/init-project.js'))
