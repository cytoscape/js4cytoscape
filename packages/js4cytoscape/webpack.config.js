const path = require('path');
const ConcatPlugin = require('webpack-concat-plugin');

module.exports = {
  mode: "development",
  entry: ['./src/Commands.js', './src/Networks.js', './src/CytoscapeSystem.js', './src/Collections.js', './src/CyNDEx.js', './src/js4cytoscape-utils.js', './src/Apps.js', './src/Filter.js', './src/Tools.js','./src/ndexClient.js','./src/cx2js.js','./src/NetworkViews.js'],
  plugins: [
    new ConcatPlugin({
      uglify: true,
      sourceMap: false,
      name: 'result',
      outputPath: '',
      fileName: 'main.js',
      filesToConcat: ['./src/Commands.js', './src/Networks.js', './src/CytoscapeSystem.js', './src/Collections.js', './src/CyNDEx.js', './src/js4cytoscape-utils.js', './src/Apps.js', './src/Filter.js', './src/Tools.js','./src/ndexClient.js','./src/cx2js.js','./src/NetworkViews.js'],
      attributes: {
          async: true
      }
  })]
};
