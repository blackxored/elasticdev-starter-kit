/* eslint-disable import/no-commonjs,fp/no-mutation */
// TODO: this is too brittle, compensates for the fact that babelrc
// seems to have issues with lerna repos:
// https://github.com/callstack-io/haul/issues/231
let patched = false;

const filterOutPlugins = plugins =>
  plugins.filter(plugin => {
    const pluginName = plugin[0];
    if (
      Array.isArray(plugin) &&
      (pluginName === 'transform-define' || pluginName === 'inline-dotenv')
    ) {
      return false;
    }

    return true;
  });

module.exports = ({ platform }, defaults) => {
  if (!patched) {
    const loader = defaults.plugins[6].config.loaders[0];
    const path = require('path');
    loader.query.plugins = [
      ...filterOutPlugins(loader.query.plugins),
      ['inline-dotenv', { path: path.resolve('../../.env') }],
    ];

    patched = true;
  }

  return {
    entry: `./index.${platform}.js`,
  };
};
