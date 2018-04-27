import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import pkg from './package.json';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

const getBabelOptions = () => ({
  exclude: '**/node_modules/**',
  runtimeHelpers: true,
  presets: [
    [
      '@babel/env',
      {
        modules: false,
      },
    ],
  ],
});

const libraryName = 'esk';
const input = './src/index.js';
const isExternal = id => !id.startsWith('.') && !id.startsWith('/');

export default [
  {
    input,
    output: {
      name: libraryName,
      file: pkg.browser,
      format: 'umd',
      globals: {
        react: 'React',
      },
    },
    external: ['react'],
    plugins: [resolve(), babel(getBabelOptions()), commonjs(), sizeSnapshot()],
  },
  {
    input,
    output: {
      file: pkg.browser.replace('.js', '.min.js'),
      format: 'umd',
      name: libraryName,
      globals: {
        react: 'React',
      },
    },
    external: ['react'],
    plugins: [
      resolve(),
      babel(getBabelOptions()),
      commonjs(),
      replace({ 'process.env.NODE_ENV': JSON.stringify('production') }),
      sizeSnapshot(),
      uglify(),
    ],
  },
  {
    input,
    output: {
      name: libraryName,
      file: pkg.main,
      format: 'cjs',
    },
    external: isExternal,
    plugins: [resolve(), babel(getBabelOptions()), commonjs()],
  },
  {
    input,
    output: {
      file: pkg.module,
      format: 'es',
    },
    external: isExternal,
    plugins: [resolve(), babel(getBabelOptions()), sizeSnapshot()],
  },
];
