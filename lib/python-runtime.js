module.exports = function pythonRuntime () {
  return process.platform === 'win32' ? 'python' : 'python3'
}
