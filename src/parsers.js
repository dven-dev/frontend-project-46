

const parsers = {
  json: JSON.parse,
};

export default (data, format) => {
  const parse = parsers[format];
  if (!parse) {
    throw new Error(`Unknown format: ${format}`);
  }
  return parse(data);
};


