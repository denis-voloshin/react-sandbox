// Core
const path = require('path');
const webpackMerge = require('webpack-merge');
const webpackBaseConfig = require('./webpack.config.base');

// Plugins
const TerserWebpackPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const PostcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const AutoPrefixer = require('autoprefixer');
const Cssnano = require('cssnano');

const styleLoaders = isVendor => [
  {
    loader: 'css-loader',
    options: {
      modules: !isVendor,
      camelCase: true,
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
        }),
        Cssnano
      ]
    }
  },
  { loader: 'stylus-loader' }
];

// Webpack config
module.exports = webpackMerge(
  webpackBaseConfig,
  {
    mode: 'production',
    devtool: false,
    optimization: {
      minimizer: [
        new TerserWebpackPlugin({
          terserOptions: {
            output: {
              comments: false,
            },
          },
        })
      ],
      splitChunks: {
        chunks: 'all',
        maxInitialRequests: Infinity,
        minSize: 0,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            name(module) {
              const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];

              switch (packageName) {
                case 'react':
                case 'react-dom':
                case 'redux':
                case 'ramda': {
                  return packageName;
                }
                default: {
                  return 'libs';
                }
              }
            }
          }
        }
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: path.resolve(__dirname, '../public/index.html'),
        title: 'React sandbox',
        favicon: path.resolve(__dirname, '../public/favicon.ico'),
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        }
      }),
      new ExtractTextWebpackPlugin('static/css/styles.[hash:10].css')
    ],
    module: {
      rules: [
        {
          oneOf: [
            {
              test: /\.(css|styl)$/,
              exclude: [/node_modules/],
              use: ExtractTextWebpackPlugin.extract({
                fallback: { loader: 'style-loader' },
                use: styleLoaders(false)
              })
            },
            {
              test: /\.css$/,
              exclude: [/src/],
              use: ExtractTextWebpackPlugin.extract({
                fallback: { loader: 'style-loader' },
                use: styleLoaders(true)
              })
            }
          ]
        }
      ]
    }
  }
);
