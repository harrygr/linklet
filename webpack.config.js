const path = require('path')
const webpack = require('webpack')

module.exports = {
  context: path.resolve(__dirname, './frontend'),

  entry: {
    app: './index.js',
  },
  output: {
    path: path.resolve(__dirname, './priv/static/js'),
    filename: 'pheddit.bundle.js',
  },

  module: {
    rules: [
    {
      test: /\.js$/,
      use: [{
        loader: 'babel-loader',
        options: { presets: ['stage-0', 'es2015'] }
      }],
    },
    ]
  },

  devtool: 'source-map'
};
