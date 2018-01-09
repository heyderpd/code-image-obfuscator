var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: __dirname+'/src/client.js',
  output: {
    path: __dirname+'/dist',
    filename: 'code-image-obfuscator.bundle.js'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: [ 'es2015' ]
        }
      }
    ]
  },
  resolve: {
    modules: ['node_modules']
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, 'node_modules')]
  },
  plugins: [
    /* new webpack.optimize.CommonsChunkPlugin("code-image-obfuscator.chunk.js"), */
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
  ]
};