const webpack = require('webpack');
const TerserPlugin = require("terser-webpack-plugin");
const { env } = require('process');
const isProd = env.NODE_ENV === 'production';

const pkg = require('./package.json');
const camelcase = require('camelcase');

let conf = {
  devtool: isProd ? false : 'inline-source-map',

  mode: 'production',

  entry: './src/index.js',

  output: {
    filename: 'bundle.js',
    library: 'cytoscapeCx2js',
    libraryTarget: 'umd'
  },

  externals: isProd ? Object.keys( pkg.dependencies || {} ) : [],

  module: {
    rules: [
      { 
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ['@babel/preset-env']
            }
          },
        ],
      }
    ]
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            drop_console: true,
          },
        },
      }),
    ],
  }
};

module.exports = conf;
