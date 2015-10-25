// webpack development config
var _ = require('lodash');

var webpackBaseConfig = _.cloneDeep(require('./webpack.base.config'));

var webpackDevelopmentConfig = _.extend(webpackBaseConfig, {
  watch: true,
  // this is a faster but not as good sourcemap
  devtool: '#eval-cheap-module-source-map',
});

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
