process.env.BABEL_ENV = 'test';

const path = require('path');

module.exports = function(wallaby) {
  return {
    files: [
      'core/**/*.js',
      'platforms/**/*.js',
      'libs/**/*.js',
      '**/*.json',
      '**/*.snap',
      'package.json',
      '!**/__tests__/*.js',
      '!**/*.test.js',
      '!platforms/server/dist/*.js',
    ],
    tests: ['**/__tests__/*.js', '**/*.test.js', '!**/node_modules/**'],
    env: {
      type: 'node',
      runner: 'node',
    },

    compilers: {
      '**/*.js': wallaby.compilers.babel(),
    },

    testFramework: 'jest',

    setup: wallaby => {
      wallaby.testFramework.configure(require('./package.json').jest);
    },
  };
};
