const path = require('path')

const ROOT = path.resolve(__dirname, 'src')
const DESTINATION = path.resolve(__dirname, 'dist')

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  target: 'node',
  context: ROOT,
  entry: {
    main: 'main.ts'
  },
  output: {
    filename: 'main.js',
    path: DESTINATION,
    library: 'antiflux'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [ROOT, 'node_modules']
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        use: 'source-map-loader'
      },
      {
        use: 'ts-loader',
        exclude: [/node_modules/],
        test: /\.ts?$/
      }
    ]
  }
}
