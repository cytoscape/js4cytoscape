const path = require('path');
const ConcatPlugin = require('webpack-concat-plugin');

module.exports = {
  mode: "development",
  entry: ['./src/commands.js', './src/networks.js', './src/CytoscapeSystem.js'],
  plugins: [
    new ConcatPlugin({
      uglify: true,
      sourceMap: false,
      name: 'result',
      outputPath: '',
      fileName: 'main.js',
      filesToConcat: ['./src/commands.js', './src/networks.js', './src/CytoscapeSystem.js'],
      attributes: {
          async: true
      }
  })]
};
