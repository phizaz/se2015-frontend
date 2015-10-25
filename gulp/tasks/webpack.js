var _ = require('lodash');

var gulp = require('gulp');
var webpackStream = require('webpack-stream');
var webpack = require('webpack');
var notifier = require('node-notifier');
var ngAnnotatePlugin = require('ng-annotate-webpack-plugin');

var webpackConfig = require('../../webpack.config');

gulp.task('webpack:development',
  function webpackDevelopment() {
    var webpackLoaders = [
      // babel (es6)
      {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel',
      },
      // css loader
      { test: /\.css$/, loader: 'style!css!autoprefixer?browsers=last 2 versions' },
      // sass loader
      { test: /\.scss|\.sass$/, loader: 'style!css!autoprefixer?browsers=last 2 versions!sass' },
      // json loader
      { test: /\.json$/, loader: 'json' },
      // html loader
      { test: /\.html$/, loader: 'html' },
    ];

    var developmentConfig = _.extend(webpackConfig, {
      watch: true,
      plugins: [
        new ngAnnotatePlugin()
      ]
    });
    developmentConfig.module.loaders = webpackLoaders;

    return gulp
      .src('./client/app/bootstrap.js')
      .pipe(webpackStream(developmentConfig, null, compileDone))
      .pipe(gulp.dest('./public/'));

    function compileDone(err, stats) {
      if (err) {
        console.error('err', err);
      }

      var compilationErrors = stats.compilation.errors;
      if (compilationErrors.length > 0) {
        console.log('Error!! =======================');
        compilationErrors.forEach(
          function eachError(error) {
            console.error(error.name);
            console.error(error.message);
          });
      }

      // console.info('stats', stats);

      var timeElapsed = stats.endTime - stats.startTime;
      var message = 'compilation is done.. ' + 'using: ' + timeElapsed / 1000.0 + ' s.';

      console.log('webpack:production' + message);

      notifier.notify({
        title: 'webpack:production',
        message: message
      });
    }
  });

gulp.task('webpack:production',
  function webpackProduction() {
    var webpackLoadersWithMinification = [
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

    var productionConfig = _.extend(webpackConfig, {
      plugins: [
        // annotation is working
        new ngAnnotatePlugin(),
        new webpack.optimize.UglifyJsPlugin({ sourceMap: true })
      ]
    });
    productionConfig.module.loaders = webpackLoadersWithMinification;

    return gulp
      .src('./client/app/bootstrap.js')
      .pipe(webpackStream(productionConfig))
      .pipe(gulp.dest('./public/'));
  });
