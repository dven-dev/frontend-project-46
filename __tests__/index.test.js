import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';
import { test, expect } from '@jest/globals';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('genDiff should return combined data', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  
  expect(genDiff(filepath1, filepath2)).toBe(expected);
});

