const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')

function noDirectory(path) {
    if (!path) {
        return false
    }

    try {
        fs.statSync(path).isDirectory()
    } catch (error) {
        if (error.code === 'ENOENT') {
            return true
        }

        throw error
    }

    return false
}

function createObject(filename, content) {
    const filenameParts = filename.split(path.sep)
    const baseName = filenameParts.slice(-1)[0]
    const dirname = filenameParts.slice(0, -1).join(path.sep)

    if (noDirectory(dirname)) {
        fs.mkdirSync(dirname, {recursive: true, mode: 0o755})
    }

    if (baseName === '' || content === null) {
        return
    }

    const baseNameParts = baseName.split('.')
    const suffix = baseNameParts.slice(-1)[0].toLowerCase()

    let data = content
    if (['yaml', 'yml'].includes(suffix)) {
        data = yaml.dump(content, {
            noArrayIndent: true,
            lineWidth: -1
        })
    }

    if (typeof data !== 'string') {
        data = JSON.stringify(content)
    }

    fs.writeFileSync(filename, data, {mode: 0o644})
}

module.exports = {
    noDirectory,
    createObject
}
