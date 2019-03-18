// Core
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

// Plugins
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PostcssFlexbugsFixes = require('postcss-flexbugs-fixes');
const AutoPrefixer = require('autoprefixer');

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
  mode: 'development',
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
  devtool: 'eval-source-map',
  devServer: {
    historyApiFallback: true,
    hot: true,
    open: true,
    port: 3000
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, '../public/index.html'),
      title: 'React sandbox',
      favicon: path.resolve(__dirname, '../public/favicon.ico')
    }),
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(env)
    }),
    new webpack.HotModuleReplacementPlugin()
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
            use: [
              { loader: 'style-loader' },
              {
                loader: 'css-loader',
                options: {
                  modules: true,
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
                      browsers: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9'
                      ],
                      flexbox: 'no-2009'
                    })
                  ]
                }
              },
              { loader: 'stylus-loader' }
            ]
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
