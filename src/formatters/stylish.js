const formatStylish = (diff) => {
  const lines = diff.flatMap((item) => {
    const { key, type } = item;

    switch (type) {
      case 'added':
        return `  + ${key}: ${item.value}`;
      case 'deleted':
        return `  - ${key}: ${item.value}`;
      case 'changed':
        return [
          `  - ${key}: ${item.oldValue}`,
          `  + ${key}: ${item.newValue}`,
        ];
      case 'unchanged':
        return `    ${key}: ${item.value}`;
      default:
        throw new Error(`Unknown type: ${type}`);
    }
  });

  return ['{', ...lines, '}'].join('\n');
};

export default formatStylish;
