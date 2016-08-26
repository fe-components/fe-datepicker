import path from 'path'
import webpack from 'webpack'
import paths from './paths'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default {
  devtool: 'hidden-source-map',
  entry: {
    'index': [path.join(paths.src, 'index.js')]
  },
  output: {
    path: paths.dist,
    filename: '[name].js',
    chunkFilename: '[chunkhash].js',
    // publicPath: 'http://localhost:3000/static/'
    publicPath: ''
    // publicPath: `http://localhost:${port}/`
  },
  plugins: [
    new ExtractTextPlugin('index.css', {
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.ProvidePlugin({
      'Promise': 'exports?global.Promise!es6-promise',
      // import fetch
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        // remove `console.*`
        drop_console: true
      },
      output: {
        comments: false
      }
    })
  ],
  stats: {
    // Nice colored output
    colors: true
  },
  module: {
    loaders: [{
      // @TODO containers
      test: /\.html$/,
      loader: 'file',
      query: {
        name: '[name].[ext]'
      }
    }, {
      test: /\.json$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css?modules'),
      include: paths.src_path
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract('style', 'css'),
      include: paths.node_modules
    }, {
      test: /\.styl$/,
      // 'style!css?modules!stylus',
      loader: ExtractTextPlugin.extract('style', 'css?modules!stylus'),
      include: paths.src_path
    }, {
      test: /\.jsx?$/,
      loader: 'babel',
      // only handle js file in src
      include: paths.src_path
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        'file?hash=sha512&digest=hex&name=img/[name].[hash:8].[ext]',
        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false&progressive=true'
      ]
    }],
    noParse: [
      // 'react/dist/react.js',
      // 'react-dom/dist/react-dom.js'
    ]
  },

  resolve: {
  }
}
