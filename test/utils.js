const fs = require('fs')
const path = require('path')

function rimraf(dirPath) {
    try {
        fs.statSync(dirPath)
    } catch (error) {
        console.error(error)
        return
    }

    fs.readdirSync(dirPath).forEach((entry) => {
        const entryPath = path.join(dirPath, entry)
        if (fs.lstatSync(entryPath).isDirectory()) {
            rimraf(entryPath)
            return
        }
        fs.unlinkSync(entryPath)
    })
    fs.rmdirSync(dirPath)
}

module.exports = {
    rimraf
}
