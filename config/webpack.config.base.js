// Core
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

// Plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');

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
  context: path.resolve(__dirname, '../src'),
  entry: {
    app: ['@babel/polyfill', './index.jsx']
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'static/js/[name].[hash:10].js',
    publicPath: '/'
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
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(env)
    }),
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
            exclude: [/\.(png|jpe?g|gif|bmp)$/i, /\.jsx?$/, /\.(css|styl)$/, /\.html$/, /\.json$/],
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
