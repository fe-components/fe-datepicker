// import path from 'path'
import webpack from 'webpack'
import paths from './paths'

export default {
/*  devtool: 'cheap-module-eval-source-map',
  entry: {
    'index': [
      'webpack-dev-server/client?http://0.0.0.0:3000',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      path.join(paths.src, 'index.js')
    ]
  },
  output: {
    path: paths.dist,
    filename: '[name].js'
  },*/
  // target: 'node-webkit',
  devServer: {
    quiet: true,
    contentBase: paths.dist,
    hot: true,
    port: 3000,
    // lazy: true,
    noInfo: true,
    inline: true,
    publicPath: '',
    stats: {
      cached: true,
      colors: true
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
    new webpack.ProvidePlugin({
      'Promise': 'exports?global.Promise!es6-promise',
      // import fetch
      'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
    }),
    // new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  stats: {
    colors: true
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
      include: paths.src_path
    }, {
      test: /\.css$/,
      loader: 'style!css',
      include: paths.node_modules
    }, {
      test: /\.styl$/,
      loader: 'style!css?modules!stylus',
      include: paths.src_path
    }, {
      test: /\.jsx?$/,
      loader: 'babel',
      // only handle js file in src
      include: paths.src_path
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loader: 'url'
    }],
    noParse: [
      // 'react/dist/react.js',
      // 'react-dom/dist/react-dom.js'
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.coffee'],
    alias: {
    }
  }
}
