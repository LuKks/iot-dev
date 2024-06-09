const path = require('path')
const writeFile = require('./write-file.js')

module.exports = async function init (name, opts = {}) {
  const {
    cwd = '.'
  } = opts

  const component = path.join(cwd, name)

  await writeFile(path.join(component, 'CMakeLists.txt'), `
idf_component_register(
  SRCS "${name}.c"
  INCLUDE_DIRS "include"
)
  `)

  await writeFile(path.join(component, name + '.c'), `
#include <stdio.h>
#include "${name}.h"

void func () {

}
  `)

  await writeFile(path.join(component, 'include', name + '.h'), `
void func(void);
  `)
}
