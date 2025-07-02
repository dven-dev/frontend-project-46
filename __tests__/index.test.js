import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import genDiff from '../src/index.js'
import buildDiff from '../src/buildDiff.js'
import parse from '../src/parsers.js'
import formatStylish from '../src/formatters/stylish.js'
import formatPlain from '../src/formatters/plain.js'
import format from '../src/formatters/index.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename =>
  path.join(__dirname, '..', '__fixtures__', filename)

const readFile = filename =>
  fs.readFileSync(getFixturePath(filename), 'utf-8')

describe('genDiff', () => {
  test('JSON format', () => {
    expect(
      genDiff(
        getFixturePath('file1.json'),
        getFixturePath('file2.json'),
        'json',
      ),
    ).toEqual(readFile('expectedJSON.txt').trim())
  })

  test('stylish format', () => {
    expect(
      genDiff(
        getFixturePath('file1.yml'),
        getFixturePath('file2.yml'),
        'stylish',
      ),
    ).toEqual(readFile('expectedStylish.txt').trim())
  })

  test('plain format', () => {
    expect(
      genDiff(
        getFixturePath('file1.yml'),
        getFixturePath('file2.yml'),
        'plain',
      ),
    ).toEqual(readFile('expectedPlain.txt').trim())
  })

  test('unknown format', () => {
    expect(() => {
      genDiff(
        getFixturePath('file1.json'),
        getFixturePath('file2.json'),
        'lol',
      )
    }).toThrow()
  })
})

describe('formatters', () => {
  const parsed1 = parse(readFile('file1.json'), 'json')
  const parsed2 = parse(readFile('file2.json'), 'json')
  const diff = buildDiff(parsed1, parsed2)

  test('formatStylish', () => {
    expect(formatStylish(diff)).toEqual(readFile('expectedStylish.txt').trim())
  })

  test('formatPlain', () => {
    expect(formatPlain(diff)).toEqual(readFile('expectedPlain.txt').trim())
  })

  test('formatJson', () => {
    expect(format(diff, 'json')).toEqual(readFile('expectedJSON.txt').trim())
  })

  test('format throws on unknown formatter', () => {
  const emptyDiff = buildDiff({}, {})
    expect(() => format(emptyDiff, 'unsupported')).toThrow()
  })
})

describe('parsers', () => {
  test('parse JSON and YAML correctly', () => {
    const jsonData = readFile('file1.json')
    const ymlData = readFile('file1.yml')
    const expected = JSON.parse(readFile('file1.json'))

    expect(parse(jsonData, 'json')).toEqual(expected)
    expect(parse(ymlData, 'yml')).toEqual(expected)
  })

  test('throws on unknown format', () => {
    expect(() => parse('{}', '.txt')).toThrow()
  })
})

describe('buildDiff', () => {
  test('returns correct diff object', () => {
    const before = {
      host: 'hexlet.io',
      timeout: 50,
      proxy: '123.234.53.22',
      follow: false,
    }
    const after = {
      timeout: 20,
      verbose: true,
      host: 'hexlet.io',
    }

    const diff = buildDiff(before, after)
    expect(diff).toEqual([
      { key: 'follow', type: 'deleted', value: false },
      { key: 'host', type: 'unchanged', value: 'hexlet.io' },
      { key: 'proxy', type: 'deleted', value: '123.234.53.22' },
      { key: 'timeout', type: 'changed', oldValue: 50, newValue: 20 },
      { key: 'verbose', type: 'added', value: true },
    ])
  })

  test('correctly handles empty files', () => {
    const empty1 = {}
    const empty2 = {}

    const diff = buildDiff(empty1, empty2)
    expect(diff).toEqual([])
  })
})
