const fs = require('fs')
const { execFileSync } = require('child_process')

exports.patch = bump.bind(null, 'patch')
exports.minor = bump.bind(null, 'minor')
exports.major = bump.bind(null, 'major')

async function bump (type) {
  if (isGit() === false) throw new Error('Git is not initialized')
  if (isGitClean() === false) throw new Error('Git working directory not clean')

  const currentVersion = getCurrentVersion()
  const nextVersion = bumpVersion(type, currentVersion)

  // Arduino
  const library = await readFile('./library.properties')

  if (library) {
    const properties = library.split('\n').map(line => line.split('='))

    const versionIndex = properties.findIndex(p => p[0] === 'version')

    if (versionIndex === -1) {
      throw new Error('library.properties does not have version field')
    }

    properties[versionIndex][1] = nextVersion

    const libraryUpdated = properties.map(p => p.join('=')).join('\n')

    await fs.promises.writeFile('./library.properties', libraryUpdated)

    git(['add', 'library.properties'])
  }

  // TODO: ESP-IDF components supports remote Git dependencies so not needed for now

  git(['commit', '--allow-empty', '-m', nextVersion])
  git(['tag', '-a', 'v' + nextVersion, '-m', nextVersion])
}

function bumpVersion (type, version) {
  const [major, minor, patch] = version.split('.')

  if (type === 'patch') {
    return major + '.' + minor + '.' + (parseInt(patch) + 1)
  }

  if (type === 'minor') {
    return major + '.' + (parseInt(minor) + 1) + '.0'
  }

  if (type === 'major') {
    return (parseInt(major) + 1) + '.0.0'
  }

  throw new Error('Invalid type')
}

function git (args) {
  const out = execFileSync('git', args, { encoding: 'utf-8' })

  return out.trim()
}

function isGit () {
  try {
    return git(['rev-parse', '--is-inside-work-tree']) === 'true'
  } catch {
    return false
  }
}

function isGitClean () {
  return git(['status', '--porcelain']) === ''
}

function getCurrentVersion () {
  try {
    const tags = git(['tag', '--list', 'v*.*.*']).split('\n')

    if (tags.length === 0) {
      return null
    }

    const latest = tags[tags.length - 1]

    return latest.replace('v', '')
  } catch {
    return null
  }
}

async function readFile (filename) {
  try {
    return await fs.promises.readFile(filename, 'utf8')
  } catch (err) {
    if (err.code === 'ENOENT') {
      return null
    }

    throw err
  }
}
