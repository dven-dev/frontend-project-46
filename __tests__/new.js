import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

import genDiff from '../src/index.js';
import buildDiff from '../src/buildDiff.js';
import parse from '../src/parsers.js';
import formatStylish from '../src/formatters/stylish.js';
import formatPlain from '../src/formatters/plain.js';
import formatJson from '../src/formatters/json.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8').trim();

const file1PathJson = getFixturePath('file1.json');
const file2PathJson = getFixturePath('file2.json');
const file1PathYaml = getFixturePath('file1.yml');
const file2PathYaml = getFixturePath('file2.yml');

const expectedStylish = readFile('expectedStylish.txt');
const expectedPlain = readFile('expectedPlain.txt');
const expectedJson = readFile('expectedJSON.txt');

describe('genDiff', () => {
  test('stylish format from YAML', () => {
    const result = genDiff(file1PathYaml, file2PathYaml, 'stylish');
    expect(result).toEqual(expectedStylish);
  });

  test('plain format from YAML', () => {
    const result = genDiff(file1PathYaml, file2PathYaml, 'plain');
    expect(result).toEqual(expectedPlain);
  });

  test('json format from JSON', () => {
    const result = genDiff(file1PathJson, file2PathJson, 'json');
    expect(result).toEqual(expectedJson);
  });
});

describe('formatters', () => {
  const parsed1 = parse(readFile('file1.json'), '.json');
  const parsed2 = parse(readFile('file2.json'), '.json');
  const diff = buildDiff(parsed1, parsed2);

  test('formatStylish', () => {
    expect(formatStylish(diff)).toEqual(expectedStylish);
  });

  test('formatPlain', () => {
    expect(formatPlain(diff)).toEqual(expectedPlain);
  });

  test('formatJson', () => {
    expect(formatJson(diff)).toEqual(expectedJson);
  });
});
