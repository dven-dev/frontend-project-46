import yaml from 'js-yaml'

const parsers = {
  json: JSON.parse,
  yml: yaml.load,
  yaml: yaml.load,
}

export default (data, format) => {
  const parse = parsers[format]
  if (!parse) {
    throw new Error(`Unknown format: ${format}`)
  }
  return parse(data)
}
