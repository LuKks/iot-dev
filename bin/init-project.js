const { createCommand } = require('commander')

module.exports = createCommand('project')
  .description('create a new project')
  .action(require('../lib/init-project.js'))
