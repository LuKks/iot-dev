const fs = require('fs')
const path = require('path')

module.exports = async function init (opts = {}) {
  const {
    cwd = '.'
  } = opts

  await writeFile(path.join(cwd, 'CMakeLists.txt'), `
cmake_minimum_required(VERSION 3.16)

include($ENV{IDF_PATH}/tools/cmake/project.cmake)

project(main)
  `)

  await writeFile(path.join(cwd, 'main', 'CMakeLists.txt'), `
idf_component_register(SRCS "main.c" INCLUDE_DIRS ".")
  `)

  await writeFile(path.join(cwd, 'main', 'main.c'), `
#include <stdio.h>
#include <unistd.h>

void app_main () {
  while (true) {
    printf("Hello World!\n");
    sleep(1);
  }
}
  `)
}

async function writeFile (filename, content) {
  await fs.promises.mkdir(path.dirname(filename), { recursive: true })
  await fs.promises.writeFile(filename, content.trim() + '\n', { flag: 'wx' })
}
