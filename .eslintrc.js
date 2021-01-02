module.exports = {
  env: {
    browser: true,
    commonjs: true,
    node: true,
    es6: true,
    mocha: true,
  },
  parser: 'babel-eslint',
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  parserOptions: {
    ecmaVersion: 2017,
  },
  ecmaFeatures: {
    experimentalObjectRestSpread: true,
  },
  rules: {
    'prettier/prettier': 'error',
    'no-unused-vars': 'warn',
    'one-var-declaration-per-line': 0,
    'new-cap': 0,
    'no-template-curly-in-string': 0,
    'import/newline-after-import': 0,
    'no-param-reassign': 0,
    'consistent-return': 0,
    'no-console': 0,
    'no-undef': 0,
    'func-names': 0,
    'object-shorthand': 0,
    camelcase: 0,
    'comma-dangle': 0,
    'no-underscore-dangle': 0,
    curly: ['error', 'multi-line'],
    'no-shadow': [
      'error',
      {
        allow: ['req', 'res', 'err'],
      },
    ],
  },
};
