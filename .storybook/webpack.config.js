const webpack = require('webpack')
const path = require('path')
const root = __dirname
const paths = {
  src: path.join(root, '../src'),
  dist: path.join(root, '../dist')
}

module.exports = {
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/^\.\/layout$/, 'custom-layout'),
    new webpack.NormalModuleReplacementPlugin(/^\.\/controls$/, 'custom-controls')
  ],
  resolve: {
    alias: {
      'custom-layout': path.resolve('.storybook/layout.js'),
      'custom-controls': path.resolve('.storybook/controls.js')
    }
  },
  module: {
    loaders: [{
      test: /\.html$/,
      loader: 'file?name=[name].[ext]'
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: 'style!css?modules',
      include: paths.src
    }, {
      test: /\.css$/,
      loader: 'style!css',
      include: paths.node_modules
    }, {
      test: /\.styl$/,
      loader: 'style!css?modules!stylus',
      include: paths.src
    }, {
      test: /\.jsx?$/,
      loader: 'babel',
      // only handle js file in src
      include: paths.src
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loader: 'url'
    }],
    noParse: [
      // 'react/dist/react.js',
      // 'react-dom/dist/react-dom.js'
    ]
  }
}
