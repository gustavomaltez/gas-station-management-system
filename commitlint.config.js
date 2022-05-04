module.exports = {
  extends: ['@commitlint/config-conventional'],
  plugins: ['workspace-scopes'],
  rules: {
    'scope-enum': [2, 'always', ['workspace']],
  },
};
