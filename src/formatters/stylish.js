import _ from 'lodash'

const indentSize = 4

const getIndent = depth => ' '.repeat(depth * indentSize - 2)
const getIndentForBracket = depth => ' '.repeat(depth * indentSize)

const stringify = (value, depth) => {
  if (!_.isPlainObject(value)) {
    return String(value)
  }

  const indent = getIndent(depth + 1)
  const bracketIndent = getIndentForBracket(depth)

  const lines = Object.entries(value)
    .map(([key, val]) => `${indent}  ${key}: ${stringify(val, depth + 1)}`)
    .join('\n')

  return `{\n${lines}\n${bracketIndent}}`
}

const getStylish = (diffTree, depth = 1) => {
  const indent = getIndent(depth)

  return diffTree
    .map(({ key, type, value, oldValue, newValue, children }) => {
      switch (type) {
        case 'nested':
          return `${indent}  ${key}: {\n${getStylish(children, depth + 1)}\n${getIndentForBracket(depth)}}`
        case 'added':
          return `${indent}+ ${key}: ${stringify(value, depth)}`
        case 'deleted':
          return `${indent}- ${key}: ${stringify(value, depth)}`
        case 'changed':
          return [
            `${indent}- ${key}: ${stringify(oldValue, depth)}`,
            `${indent}+ ${key}: ${stringify(newValue, depth)}`,
          ].join('\n')
        case 'unchanged':
          return `${indent}  ${key}: ${stringify(value, depth)}`
        default:
          throw new Error(`Unknown type: ${type}`)
      }
    })
    .join('\n')
}

const formatStylish = diffTree => `{\n${getStylish(diffTree)}\n}`

export default formatStylish
