import fs from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'
import genDiff from '../src/index.js'
import buildDiff from '../src/buildDiff.js'
import parse from '../src/parsers.js'
import formatStylish from '../src/formatters/stylish.js'
import formatPlain from '../src/formatters/plain.js'
import formatJson from '../src/formatters/json.js'

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
})

describe('formatters', () => {
  const parsed1 = parse(readFile('file1.json'), '.json')
  const parsed2 = parse(readFile('file2.json'), '.json')
  const diff = buildDiff(parsed1, parsed2)

  test('formatStylish', () => {
    expect(formatStylish(diff)).toEqual(readFile('expectedStylish.txt').trim())
  })

  test('formatPlain', () => {
    expect(formatPlain(diff)).toEqual(readFile('expectedPlain.txt').trim())
  })

  test('formatJson', () => {
    expect(formatJson(diff)).toEqual(readFile('expectedJSON.txt').trim())
  })
})
