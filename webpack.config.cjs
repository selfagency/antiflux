const path = require('path')

const ROOT = path.resolve(__dirname, 'src')
const DESTINATION = path.resolve(__dirname, 'dist')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  target: 'node',
  context: ROOT,
  entry: {
    main: 'index.ts'
  },
  output: {
    filename: 'index.js',
    path: DESTINATION,
    library: {
      type: 'commonjs'
    }
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [ROOT, 'node_modules']
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        use: 'source-map-loader',
        enforce: 'pre',
        test: /\.js$/
      },
      {
        use: 'ts-loader',
        exclude: [/node_modules/],
        test: /\.ts?$/
      },
      {
        use: 'babel-loader',
        exclude: /node_modules/,
        test: /.m?js$/
      }
    ]
  }
}
