/* global __dirname, require, module*/

const webpack = require('webpack');
const path = require('path');
const env2 = require('yargs').argv.env; // use --env with webpack 2
const { env } = require('process');
const pkg = require('./package.json');
const isProd = env.NODE_ENV === 'production';
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const isNonNil = x => x != null;

const minify = env.MINIFY === 'true';
let libraryName = pkg.name;

let outputFile, mode;

if (env2 === 'build') {
  mode = 'production';
  outputFile = libraryName + '.min.js';
} else {
  mode = 'development';
  outputFile = libraryName + '.js';
}

const config = {
  mode: mode,
  entry: __dirname + '/src/index.js',
  devtool: isProd ? false : 'inline-source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /(\.jsx|\.js)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./node_modules'), path.resolve('./src')],
    extensions: ['.json', '.js']
  },
  plugins: [
    new webpack.EnvironmentPlugin(['NODE_ENV']),
    minify ? new UglifyJSPlugin() : null
  ].filter(isNonNil)
};

module.exports = config;
