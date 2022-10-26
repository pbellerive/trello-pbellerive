module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  globals: {
  },
  rules: {
    'no-plusplus': ['error', {
      allowForLoopAfterthoughts: true,
    }],
    'indent': ['error', 2, { SwitchCase: 1 }],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'no-shadow': 'off',
    'max-len': ['error', { code: 140 }],
    'max-classes-per-file': 'off',
    'func-names': 'off',
    'lines-between-class-members': [
      'error',
      'always',
      {
        exceptAfterSingleLine: true
      }
    ],
    'comma-dangle': ['error', 'only-multiline'],
    'semi': 'off',
    '@typescript-eslint/semi': ['error', 'always'],
    'no-extra-semi': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-extra-semi': ['error']
  }
};
