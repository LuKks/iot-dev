module.exports = function pythonRuntime (idf) {
  if (idf) {
    if (process.env.IDF_PYTHON_ENV_PATH) {
      return process.env.IDF_PYTHON_ENV_PATH
    }

    // TODO: "configure" command depends on this,
    // unsure why it fails when using normal Python
    throw new Error('IDF_PYTHON_ENV_PATH is not defined')
  }

  return process.platform === 'win32' ? 'python' : 'python3'
}
