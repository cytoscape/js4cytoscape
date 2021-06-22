const path = require('path');
const ConcatPlugin = require('webpack-concat-plugin');

module.exports = {
  mode: "development",
  entry: ['./src/commands.js', './src/networks.js'],
  plugins: [
    new ConcatPlugin({
      uglify: false,
      sourceMap: false,
      name: 'result',
      outputPath: '',
      fileName: 'main.js',
      filesToConcat: ['./src/commands.js', './src/networks.js'],
      attributes: {
          async: true
      }
  })]
};
