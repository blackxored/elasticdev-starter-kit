const extendWebpackConfig = require('../webpack.config.base');

module.exports = (storybookBaseConfig, _configType) => {
  const config = extendWebpackConfig(storybookBaseConfig);

  config.module.rules.push({
    test: /\.stories\.jsx?$/,
    loaders: [require.resolve('@storybook/addon-storysource/loader')],
    enforce: 'pre',
  });

  return config;
};
