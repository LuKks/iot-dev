const { createCommand } = require('commander')

const version = createCommand('version')
  .description('bump a library or component version')

version
  .command('patch')
  .description('when you make bug fixes (0.0.X)')
  .action(require('../lib/version.js').patch)

version
  .command('minor')
  .description('when you add functionality (0.X.0)')
  .action(require('../lib/version.js').minor)

version
  .command('major')
  .description('when you make incompatible changes (X.0.0)')
  .action(require('../lib/version.js').major)

module.exports = version
