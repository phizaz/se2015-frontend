// webpack development config
var _ = require('lodash');
var webpack = require('webpack');
var path = require('path');

var webpackBaseConfig = _.cloneDeep(require('./webpack.base.config'));

var webpackDevelopmentConfig = _.extend(webpackBaseConfig, {
  watch: true,
  // this is a faster but not as good sourcemap
  devtool: '#eval-cheap-module-source-map',

  resolve: {
    modulesDirectories: ['node_modules', 'bower_components'],
  },

  plugins: [
    // this will make it requirable but not include in the bundle
    new webpack.optimize.CommonsChunkPlugin("vendor", "vendor.bundle.js"),
    // makes bower (and normal) packages requirable
    new webpack.ResolverPlugin(
      [
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("package.json", ["main"]),
        new webpack.ResolverPlugin.DirectoryDescriptionFilePlugin("bower.json", ["main"])
      ]),
    // serve jQuery to every modules (from the commonchunkplugin)
    new webpack.ProvidePlugin(
      {
          $: "jquery",
          jQuery: "jquery",
          "window.jQuery": "jquery"
      }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    port: 3000,
    // hot module replacement mode (default: true)
    hot: true,

    proxy: {
      '/api*': {
        target: 'http://homstead.app',
        secure: false,
      },
    },

    // publicPath defines a path storing bundle.js
    publicPath: webpackBaseConfig.output.publicPath,

    quiet: false,
    // suppress boring information
    noInfo: true,
    stats: { colors: true },

  },

});

/**
 * For Webpack's Hot Module Replacement
 * add an entry point to the webpack configuration:
 * 'webpack/hot/dev-server'
 */
webpackDevelopmentConfig.entry.app.unshift('webpack-dev-server/client?http://localhost:' + webpackDevelopmentConfig.devServer.port, 'webpack/hot/dev-server');

webpackDevelopmentConfig.module.loaders = webpackDevelopmentConfig.module.loaders.concat(
  [

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

  ]);

module.exports = webpackDevelopmentConfig;
