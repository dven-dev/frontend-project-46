const stringify = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return String(value);
};

const formatPlain = (diff) => {
  const lines = diff
    .filter((item) => item.type !== 'unchanged')
    .map((item) => {
      const { key, type } = item;

      switch (type) {
        case 'added':
          return `Property '${key}' was added with value: ${stringify(item.value)}`;
        case 'deleted':
          return `Property '${key}' was removed`;
        case 'changed':
          return `Property '${key}' was updated. From ${stringify(item.oldValue)} to ${stringify(item.newValue)}`;
        default:
          throw new Error(`Unknown type: ${type}`);
      }
    });

  return lines.join('\n');
};

export default formatPlain;
