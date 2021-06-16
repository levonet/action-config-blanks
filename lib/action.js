const { createObject } = require('./save')

function run(core) {
    const source = core.getInput('source', {required: true})

    for (const [file, content] of Object.entries(JSON.parse(source))) {
        core.info(`Create "${file}"`)
        try {
            createObject(file, content)
        } catch (error) {
            core.error(error)
        }
    }
}

module.exports = {
    run
}
