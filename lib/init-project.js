const path = require('path')
const writeFile = require('./write-file.js')

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

  await writeFile(path.join(cwd, '.gitignore'), `
build/
managed_components/
dependencies.lock
sdkconfig
  `)
}
