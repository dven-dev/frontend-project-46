import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import buildDiff from './buildDiff.js';
import format from './formatters/index.js';

const getData = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const extname = path.extname(fullPath).slice(1);
  const fileData = fs.readFileSync(fullPath, 'utf-8');
  return parse(fileData, extname);
};

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);
  const diff = buildDiff(data1, data2);
  return format(diff, formatName);
};

export default genDiff;

