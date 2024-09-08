const webpack = require('webpack')
const { resolve } = require('path')

module.exports = {
  name: '@simple/react-org-chart-ts',
  devtool: 'source-map',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    devtoolLineToLine: true,
    sourceMapFilename: './index.js.map',
    pathinfo: true,
    path: resolve(__dirname, 'dist'),
    library: '@simple/react-org-chart-ts',
    libraryTarget: 'commonjs2',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.js', '.jsx'],
  },
  externals: {
    d3: {
      commonjs: 'd3',
      commonjs2: 'd3',
      amd: 'd3',
      root: '_',
    },
    react: {
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
      root: '_',
    },
  },
}
