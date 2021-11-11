const webConfig = {
  entry: __dirname + '/src/index.js',
  target: 'web',
  output: {
    filename: './ndexClient.js',
    library: 'ndexClient',
  },

  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', options: {
        presets: ['@babel/preset-env']
      } }
    ]
  }
};


const nodeConfig = {
  entry: __dirname + '/src/index.js',
  target: 'node',
  output: {
    filename: './ndexClient.common.js',
    libraryTarget: 'commonjs'
  },


  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader', options: {
        presets: ['@babel/preset-env']
      } }
    ]
  }
};

module.exports = [webConfig, nodeConfig];
