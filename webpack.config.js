const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, 'server', 'node_modules')
        ],
        use: 'babel-loader'
      }
    ]
  },
  devServer: {
    historyApiFallback: true, //react router doesn't work without this line
    proxy: {
      '/api': {
        target: 'http://localhost:8181',
        secure: false
      }
    }
  },
  devtool: 'inline-source-map'
}