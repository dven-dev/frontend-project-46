export default {
  testEnvironment: 'node',
  transform: {
    '^.+\\.js$': 'babel-jest'
  },
  globals: {
    'import.meta': {
      url: 'file://'
    }
  }
};



