import formatStylish from './stylish.js'
import formatPlain from './plain.js'

const formatters = {
  stylish: formatStylish,
  plain: formatPlain,
  json: (diff) => JSON.stringify(diff, null, 2),
}

const format = (diff, formatType = 'stylish') => {
  const formatter = formatters[formatType]
  if (!formatter) {
    throw new Error(`Unknown format: ${formatType}`)
  }
  return formatter(diff)
}

export default format
