module.exports = {
  extends: ['../../.eslintrc.cjs', '../../.eslintrc.react.cjs'],
  ignorePatterns: ['!**/*'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      parserOptions: {
        project: ['packages/clairview-emails/tsconfig.{json,*.json}'],
      },
      rules: {
        '@nx/dependency-checks': 'error',
      },
    },
  ],
};
