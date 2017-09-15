module.exports = {
  extends: [
    'airbnb',
    'plugin:flowtype/recommended',
    'plugin:react/recommended',
    'prettier',
    'prettier/flowtype',
    'prettier/react',
    'cleanjs',
  ],
  parser: 'babel-eslint',
  plugins: ['flowtype', 'fp', 'prettier', 'react', 'jest'],
  env: {
    jest: true,
  },
  rules: {
    'arrow-parens': 0, // does not work with Flow generic types.
    'fp/no-mutating-assign': 2,
    'global-require': 0, // used by react-native
    'import/first': 0, // we sort by unit/atom
    'import/no-named-as-default': 0, // we export components for testing
    'import/prefer-default-export': 0, // actions can have only one action
    'jsx-a11y/href-no-hash': 0, // disabled since it's not found for some reason
    'no-confusing-arrow': 0, // this rule is confusing
    'no-duplicate-imports': 0, // handled by eslint-plugin-import
    'no-underscore-dangle': 0,
    'react/forbid-prop-types': 0, // handled by flowtype
    'react/jsx-filename-extension': 0,
    'react/require-default-props': 0, // handled by flowtype
    'react/sort-comp': [
      2,
      {
        order: [
          'type-annotations',
          'state',
          '/^static fragments',
          'static-methods',
          'lifecycle',
          '/^on.+$/',
          '/^(get|set)(?!(InitialState$|DefaultProps$|ChildContext$)).+$/',
          'everything-else',
          '/^render.+$/',
          'render',
        ],
      },
    ],
    'require-jsdoc': 'warn',
    'valid-jsdoc': 'error',
  },
};
