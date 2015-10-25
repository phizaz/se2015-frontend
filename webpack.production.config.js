// webpack production config
var _ = require('lodash');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var webpack = require('webpack');

var webpackBaseConfig = _.cloneDeep(require('./webpack.config'));

var webpackProductionConfig = _.extend(webpackBaseConfig, {
  // the perfect sourcemap used only for production
  devtool: '#source-map',
  plugins: [
    // annotation is working
    new ngAnnotatePlugin(),
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true })
  ]
});

webpackProductionConfig.module.loaders = [
  // babel (es6)
  {
      test: /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
  },
  // css loader
  { test: /\.css$/, loader: 'style!css?minimize!autoprefixer?browsers=last 2 versions' },
  // sass loader
  { test: /\.scss|\.sass$/, loader: 'style!css?minimize!autoprefixer?browsers=last 2 versions!sass' },
  // json loader
  { test: /\.json$/, loader: 'json' },
  // html loader
  { test: /\.html$/, loader: 'html' },
];

module.exports = webpackProductionConfig;
