// webpack development config
var _ = require('lodash');
var webpack = require('webpack');

var webpackBaseConfig = _.cloneDeep(require('./webpack.base.config'));

var webpackDevelopmentConfig = _.extend(webpackBaseConfig, {
  watch: true,
  // this is a faster but not as good sourcemap
  devtool: '#eval-cheap-module-source-map',

  devServer: {
    port: 3000,
    // hot module replacement mode (default: true)
    hot: true,

    proxy: {
      '/server/*': {
        target: webpackBaseConfig.baseUrl + '/server',
        secure: false,
      },
    },

    // publicPath defines a path storing bundle.js
    publicPath: webpackBaseConfig.output.publicPath,

    quiet: false,
    // noInfo: true,
    stats: { colors: true },

  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
});

/**
 * For Webpack's Hot Module Replacement
 * add an entry point to the webpack configuration:
 * 'webpack/hot/dev-server'
 */
webpackDevelopmentConfig.entry.app.unshift("webpack-dev-server/client?http://localhost:" + webpackDevelopmentConfig.devServer.port, "webpack/hot/dev-server");

webpackDevelopmentConfig.module.loaders = [
  // babel (es6)
  {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
  },
  // css loader
  { test: /\.css$/, loaders: ['style', 'css', 'autoprefixer?browsers=last 2 versions'] },
  // sass loader
  { test: /\.scss$/, loaders: ['style', 'css', 'autoprefixer?browsers=last 2 versions', 'sass' ] },
  { test: /\.sass$/, loaders: ['style', 'css', 'autoprefixer?browsers=last 2 versions', 'sass?indentedSyntax'] },
  // json loader
  { test: /\.json$/, loader: 'json' },
  // html loader
  { test: /\.html$/, loader: 'html' },
];

module.exports = webpackDevelopmentConfig;
