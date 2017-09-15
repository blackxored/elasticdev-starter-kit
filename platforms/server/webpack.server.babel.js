/* eslint-disable better/no-new,require-jsdoc */
import webpack from 'webpack';
import path from 'path';
import nodeExternals from 'webpack-node-externals';
import StartServerPlugin from 'start-server-webpack-plugin';
import WebPackPluginGraphQLSchemaHot from 'webpack-plugin-graphql-schema-hot';
import dotenv from 'dotenv';

dotenv.load({ path: path.resolve(__dirname, '../../.env') });

function createConfig() {
  return {
    entry: ['webpack/hot/poll?1000', './index'],
    watch: true,
    target: 'node',
    node: {
      __filename: true,
      __dirname: true,
    },
    externals: [
      // TODO: ramda's getting bundled for whatever reason
      nodeExternals({
        modulesFromFile: true, // So it supports lerna's hoisted packages
        whitelist: ['webpack/hot/poll?1000', '@esk/core'],
      }),
    ],
    devtool: 'source-map',
    output: {
      path: path.join(__dirname, 'dist'),
      filename: 'server.js',
    },
    module: {
      rules: [
        {
          test: /\.js?$/,
          exclude: /node_modules/,
          use: [
            'babel-inline-import-loader',
            {
              loader: 'babel-loader',
              options: {
                // TODO: .graphqls files don't reload without this apparently.
                babelrc: false,
                presets: [['env', { modules: false }], 'stage-0', 'flow'],
                plugins: [
                  ['inline-import', { extensions: ['.graphql', '.graphqls'] }],
                  [
                    'inline-dotenv',
                    { path: path.resolve(__dirname, '../../.env') },
                  ],
                  'transform-regenerator',
                  'transform-runtime',
                  'transform-dev',
                ],
              },
            },
          ],
        },
      ],
    },
    plugins: [
      new WebPackPluginGraphQLSchemaHot({
        schemaPath: path.resolve(__dirname, './data/schema/index.js'),
        output: {
          json: path.resolve(__dirname, '../../graphql.schema.json'),
        },
        runOnStart: false, // default: false
        waitOnStart: 0, // default: 0, set 2000 if you use babel-plugin-transform-relay-hot
        waitOnRebuild: 0, // default: 0, set 2000 if you use babel-plugin-transform-relay-hot
        verbose: true, // default: false
        hideErrors: true, // default: false
        excludes: ['**/__generated__/**', '**/dist/**'], // default: null
      }),
      new StartServerPlugin('server.js'),
      new webpack.NamedModulesPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin(),
      // new webpack.DefinePlugin({
      //   'process.env': { BUILD_TARGET: JSON.stringify('server') },
      // }),
    ],
  };
}

export default createConfig();
