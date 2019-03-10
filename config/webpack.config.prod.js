// Core
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

// Plugins
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const PostcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const AutoPrefixer = require('autoprefixer');
const Cssnano = require('cssnano');

// Environment
if (!fs.existsSync(path.resolve(__dirname, 'env.js'))) {
  fs.copyFileSync(path.resolve(__dirname, 'dist.env.js'), path.resolve(__dirname, 'env.js'));
}
const env = require(path.resolve(__dirname, 'env.js'));
let nodePaths = [];
if (env.hasOwnProperty('NODE_PATH')) {
  nodePaths = env.NODE_PATH instanceof Array ? [...env.NODE_PATH] : [env.NODE_PATH];
}

// Webpack config
module.exports = {
  mode: 'production',
  context: path.resolve(__dirname, '../src'),
  entry: {
    app: ['@babel/polyfill', './index.jsx']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].[hash:10].js'
  },
  resolve: {
    alias: {
      '@Actions': path.resolve(__dirname, '../src/store/actions'),
      '@Components': path.resolve(__dirname, '../src/components'),
      '@Reducers': path.resolve(__dirname, '../src/store/reducers'),
      '@Store': path.resolve(__dirname, '../src/store'),
      '@Views': path.resolve(__dirname, '../src/views'),
      '@Utils': path.resolve(__dirname, '../src/utils')
    },
    extensions: ['.js', '.jsx'],
    modules: [
      ...nodePaths.map(nodePath => path.resolve(__dirname, '../', nodePath)),
      'node_modules'
    ]
  },
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
              case 'react-dom': {
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
    new CleanWebpackPlugin(),
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
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(env)
    }),
    new ExtractTextWebpackPlugin('static/css/styles.[hash:10].css')
  ],
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(png|jpe?g|gif|bmp)$/i,
            use: [
              {
                loader: 'file-loader',
                options: {
                  outputPath: 'static/img',
                  name: '[name].[hash:10].[ext]'
                }
              }
            ]
          },
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            use: [
              {
                loader: 'babel-loader',
                options: {
                  configFile: path.resolve(__dirname, 'babel.config.js')
                }
              }
            ]
          },
          {
            test: /\.(css|styl)$/,
            use: ExtractTextWebpackPlugin.extract({
              fallback: { loader: 'style-loader' },
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
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
                        browsers: [
                          '>1%',
                          'last 4 versions',
                          'Firefox ESR',
                          'not ie < 9'
                        ],
                        flexbox: 'no-2009'
                      }),
                      Cssnano
                    ]
                  }
                },
                { loader: 'stylus-loader' }
              ]
            })
          },
          {
            exclude: [/\.jsx?$/, /\.html$/, /\.json$/, /\.styl$/],
            loader: 'file-loader',
            options: {
              name: 'static/media/[name].[hash:10].[ext]'
            }
          }
        ]
      }
    ]
  }
};
