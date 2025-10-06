module.exports = {
  env: {
    browser: false,
    commonjs: false,
    es2022: true,
    node: true,
    jest: true
  },
  extends: ['standard', 'prettier'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    // Customize rules as needed
    'no-console': 'warn',
    'no-unused-vars': 'error',
    'prefer-const': 'error',
    'no-var': 'error',
    'object-shorthand': 'error',
    'prefer-template': 'error',
    // Disable conflicting rules that Prettier handles
    'space-before-function-paren': 'off'
  },
  ignorePatterns: ['node_modules/', 'coverage/', 'dist/', '*.min.js']
}
