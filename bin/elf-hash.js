const { createCommand } = require('commander')

module.exports = createCommand('elf_hash')
  .description('read the ELF hash from a binary')
  .argument('<file>', 'binary filename')
  .option('-c, --chip [name]', 'chip name', 'auto')
  .action(require('../lib/elf-hash.js'))
