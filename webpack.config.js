var webpack = require('webpack');

module.exports = {
  entry: './web/main.js',
  output: {
    path: './npm',
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
  plugins: [
    //new webpack.optimize.CommonsChunkPlugin("code-image-obfuscator.chunk.js")//,
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
  ]
};