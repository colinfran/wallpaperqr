module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'unused-imports'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'universe/native'],
  rules: {
    'unused-imports/no-unused-imports-ts': 2,
  },
};
