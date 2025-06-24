import fs from 'fs';
import path from 'path';
import parse from './parsers.js';
import _ from 'lodash';

const getData = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const fileData = fs.readFileSync(fullPath, 'utf-8');
  return JSON.parse(fileData);
};

const genDiff = (filepath1, filepath2) => {
  const data1 = getData(filepath1);
  const data2 = getData(filepath2);

  const keys = _.sortBy(_.union(Object.keys(data1), Object.keys(data2)));

  const result = keys.map((key) => {
    if (!Object.hasOwn(data2, key)) {
      return `  - ${key}: ${data1[key]}`;
    }
    if (!Object.hasOwn(data1, key)) {
      return `  + ${key}: ${data2[key]}`;
    }
    if (data1[key] !== data2[key]) {
      return `  - ${key}: ${data1[key]}\n  + ${key}: ${data2[key]}`;
    }
    return `    ${key}: ${data1[key]}`;
  });

  return `{\n${result.join('\n')}\n}`;
};

export default genDiff;
