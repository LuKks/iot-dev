#!/usr/bin/env node

const { program } = require('commander')
const safetyCatch = require('safety-catch')
const pkg = require('./package.json')

const main = program
  .version(pkg.version)
  .description(pkg.description)
  .addCommand(require('./bin/init.js'))
  .addCommand(require('./bin/configure.js'))
  .addCommand(require('./bin/build.js'))
  .addCommand(require('./bin/flash.js'))
  .addCommand(require('./bin/elf-hash.js'))

main.parseAsync().catch(err => {
  safetyCatch(err)
  console.error('error: ' + err.message)
  process.exit(1)
})
