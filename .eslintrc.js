module.exports = {
  'extends': 'standard',
  'plugins': [
    'import',
    'react'
  ],
  'rules': {
    'linebreak-style': 'off',
    'no-unused-vars': [2, { 'varsIgnorePattern': 'h' }],
    'react/jsx-uses-vars': 2
  },
  'parserOptions': {
    'ecmaVersion': 6,
    'ecmaFeatures': {
      'jsx': true
    }
  },
  'env': {
    'browser': true
  }
}
