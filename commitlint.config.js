/* eslint-disable import/no-extraneous-dependencies */
const { flatten, keys, mapObjIndexed } = require('ramda');
const { patterns } = require('./.commitlint-patterns.json');

module.exports = {
  extends: ['@commitlint/config-conventional'],
  settings: {
    scope: {
      enumerables: mapObjIndexed(
        val => ({
          description: val,
        }),
        patterns.components,
      ),
    },
  },
  rules: {
    'scope-enum': () => {
      const scopes = flatten([
        patterns.system,
        patterns.packages,
        keys(patterns.components),
      ]);

      return [2, 'always', scopes.concat(['system'])];
    },
  },
};


