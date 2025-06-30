const stringify = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]'
  }
  if (typeof value === 'string') {
    return `'${value}'`
  }
  return String(value)
}

const formatPlain = (diff, parentPath = '') => {
  const lines = diff
    .filter((item) => item.type !== 'unchanged')
    .flatMap((item) => {
      const { key, type } = item
      const propertyPath = parentPath ? `${parentPath}.${key}` : key

      switch (type) {
        case 'added':
          return `Property '${propertyPath}' was added with value: ${stringify(item.value)}`
        case 'deleted':
          return `Property '${propertyPath}' was removed`
        case 'changed':
          return `Property '${propertyPath}' was updated. From ${stringify(item.oldValue)} to ${stringify(item.newValue)}`
        case 'nested':
          return formatPlain(item.children, propertyPath) // рекурсивный спуск
        default:
          throw new Error(`Unknown type: ${type}`)
      }
    })

  return lines.join('\n')
}

export default formatPlain
