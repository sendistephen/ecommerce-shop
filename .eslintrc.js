module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
    mocha: true,
  },
  extends: ['standard', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'prettier/prettier': 'error',
  },
};
