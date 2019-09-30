// Core
const webpack = require('webpack');
const path = require('path');
const webpackMerge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.base');

// Plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PostcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const AutoPrefixer = require('autoprefixer');

const styleLoaders = isVendor => [
  { loader: 'style-loader' },
  {
    loader: 'css-loader',
    options: {
      modules: !isVendor,
      camelCase: true,
      importLoaders: 1,
      sourceMap: true,
      localIdentName: '[local]__[hash:5]'
    }
  },
  {
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: [
        PostcssFlexbugsFixes,
        AutoPrefixer({
          flexbox: 'no-2009'
        })
      ]
    }
  },
  { loader: 'stylus-loader' }
];

// Webpack config
module.exports = webpackMerge(
  webpackBaseConfig,
  {
    mode: 'development',
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      open: true,
      port: 3000
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(__dirname, '../public/index.html'),
        title: 'React sandbox',
        favicon: path.resolve(__dirname, '../public/favicon.ico')
      }),
      new webpack.HotModuleReplacementPlugin()
    ],
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.(css|styl)$/,
              exclude: [/node_modules/],
              use: styleLoaders(false)
            },
            {
              test: /\.css$/,
              exclude: [/src/],
              use: styleLoaders(true)
            }
          ]
        }
      ]
    }
  }
);
