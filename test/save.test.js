const fs = require('fs')
const save = require('../lib/save')
const { rimraf } = require('./utils')

describe('test createObject()', () => {
    beforeEach(() => {
        this.baseDir = `test/.tmp/${Math.random().toString(36).substring(5)}`
    })

    afterEach(() => rimraf(this.baseDir))
    afterAll(() => rimraf('test/.tmp'))

    test('expect creating file with data from plain text', () => {
        save.createObject(`${this.baseDir}/test.txt`, 'test')
        expect(fs.statSync(`${this.baseDir}/test.txt`).isFile()).toEqual(true)
        expect(fs.readFileSync(`${this.baseDir}/test.txt`, 'utf8')).toEqual('test')
    })

    test('expect creating YAML file with data from object', () => {
        save.createObject(`${this.baseDir}/test.yml`, {
            string: 'test',
            number: 0.0123,
            object: {test: 'abc'},
            array: ['boo', 'foo']
        })
        expect(fs.statSync(`${this.baseDir}/test.yml`).isFile()).toEqual(true)
        expect(fs.readFileSync(`${this.baseDir}/test.yml`, 'utf8'))
            .toEqual('string: test\nnumber: 0.0123\nobject:\n  test: abc\narray:\n- boo\n- foo\n')
    })

    test('expect creating YAML file with data from array', () => {
        save.createObject(`${this.baseDir}/test.yml`, [123, {a: 'b'}])
        expect(fs.statSync(`${this.baseDir}/test.yml`).isFile()).toEqual(true)
        expect(fs.readFileSync(`${this.baseDir}/test.yml`, 'utf8'))
            .toEqual('- 123\n- a: b\n')
    })

    test('expect creating JSON file with data from object', () => {
        save.createObject(`${this.baseDir}/test.json`, {
            string: 'test',
            number: 0.0123,
            object: {test: 'abc'},
            array: ['boo', 'foo']
        })
        expect(fs.statSync(`${this.baseDir}/test.json`).isFile()).toEqual(true)
        expect(fs.readFileSync(`${this.baseDir}/test.json`, 'utf8'))
            .toEqual('{"string":"test","number":0.0123,"object":{"test":"abc"},"array":["boo","foo"]}')
    })

    test('expect creating JSON file with data from array', () => {
        save.createObject(`${this.baseDir}/test.json`, [123, {a: 'b'}])
        expect(fs.statSync(`${this.baseDir}/test.json`).isFile()).toEqual(true)
        expect(fs.readFileSync(`${this.baseDir}/test.json`, 'utf8'))
            .toEqual('[123,{"a":"b"}]')
    })

    test('expect creating JSON file with data from object by default', () => {
        save.createObject(`${this.baseDir}/test.txt`, {
            string: 'test',
            number: 0.0123,
            object: {test: 'abc'},
            array: ['boo', 'foo']
        })
        expect(fs.statSync(`${this.baseDir}/test.txt`).isFile()).toEqual(true)
        expect(fs.readFileSync(`${this.baseDir}/test.txt`, 'utf8'))
            .toEqual('{"string":"test","number":0.0123,"object":{"test":"abc"},"array":["boo","foo"]}')
    })

    test('expect creating directory', () => {
        save.createObject(`${this.baseDir}/test/`, null)
        expect(fs.statSync(`${this.baseDir}/test`).isDirectory()).toEqual(true)
    })

    test('expect skip creating if content is null', () => {
        save.createObject(`${this.baseDir}/test.txt`, null)
        try {
            fs.statSync(`${this.baseDir}/test`)
            expect(true).toEqual(false)
        } catch (error) {
            expect(error.code).toEqual('ENOENT')
        }
    })
})
