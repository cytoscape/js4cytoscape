const path = require('path');
const ConcatPlugin = require('webpack-concat-plugin');

module.exports = {
  mode: "development",
  entry: ['./src/Commands.js', './src/Networks.js', './src/CytoscapeSystem.js', './src/Collections.js', './src/CyNDEx.js', './src/js4cytoscape-utils.js', './src/Apps.js', './src/Filter.js', './src/Tools.js','./src/NetworkViews.js','./src/Styles.js','./src/Layout.js','./src/NetworkSelection.js'],
  plugins: [
    new ConcatPlugin({
      uglify: true,
      sourceMap: false,
      name: 'result',
      outputPath: '',
      fileName: 'main.js',
      filesToConcat: ['./src/Commands.js', './src/Networks.js', './src/CytoscapeSystem.js', './src/Collections.js', './src/CyNDEx.js', './src/js4cytoscape-utils.js', './src/Apps.js', './src/Filter.js', './src/Tools.js','./src/NetworkViews.js','./src/Session.js','./src/Styles.js','./src/Layout.js','./src/NetworkSelection.js'],
      attributes: {
          async: true
      }
  })]
};
