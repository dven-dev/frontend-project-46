import fs from 'fs';
import path from 'path';

const parseFile = (filepath) => {
  const fullPath = path.resolve(process.cwd(), filepath);
  const extname = path.extname(fullPath);
  const fileData = fs.readFileSync(fullPath, 'utf-8');

  if (extname === '.json') {
    return JSON.parse(fileData);
  }
  throw new Error(`Unsupported file format: ${extname}`);
};

export default parseFile;

