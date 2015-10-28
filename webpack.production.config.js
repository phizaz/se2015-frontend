// webpack production config
var _ = require('lodash');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');
var webpack = require('webpack');

var webpackBaseConfig = _.cloneDeep(require('./webpack.base.config'));

var webpackProductionConfig = _.extend(webpackBaseConfig, {
  // the perfect sourcemap used only for production
  devtool: '#source-map',
  plugins: [
    // annotation is working
    new ngAnnotatePlugin(),
    new webpack.optimize.UglifyJsPlugin({ sourceMap: true })
  ]
});

webpackProductionConfig.module.loaders = webpackProductionConfig.module.loaders.concat(
  [
    // babel (es6)
    {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
    },
    // css loader
    { test: /\.css$/, loaders: ['style', 'css?minimize', 'autoprefixer?browsers=last 2 versions'] },
    // sass loader
    { test: /\.scss$/, loaders: ['style', 'css?minimize', 'autoprefixer?browsers=last 2 versions', 'sass'] },
    { test: /\.sass$/, loaders: ['style', 'css?minimize', 'autoprefixer?browsers=last 2 versions', 'sass?indentedSyntax'] },
  ]);

module.exports = webpackProductionConfig;
