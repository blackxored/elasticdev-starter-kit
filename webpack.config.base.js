/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const path = require('path');

module.exports = config => {
  config.plugins.push(new webpack.ProvidePlugin({ Glamor: `glamor/react` }));
  config.resolve.alias = {
    ...(config.resolve.alias || {}),
    esk: path.resolve(__dirname, './src'),
  };

  return config;
};
